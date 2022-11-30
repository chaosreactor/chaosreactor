use std::path::{Path, PathBuf};
use tauri::api::path::data_dir;
use tauri::{
    api::process::{Command, CommandEvent},
    Manager,
};

extern crate keyring;

use std::error::Error;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn set_api_key(key: &str, value: &str) {
    let service = "com.chaosreactor.settings.".to_owned() + key;
    let username = whoami::username();
    let key = keyring::Entry::new(&service, &username);

    key.set_password(&value).unwrap();
}

// The directory for Chaos Reactor app data.
fn app_data_dir() -> PathBuf {
    let data_dir: &Path = &data_dir().unwrap();
    let app_dir = data_dir.join("ChaosReactor");
    if !app_dir.exists() {
        std::fs::create_dir_all(&app_dir).unwrap();
    }
    let app_dir_buf: PathBuf = app_dir.to_owned();
    app_dir_buf
}

// The directory for Chaos Reactor reactor databases.
fn app_db_dir() -> PathBuf {
    let db_dir: &Path = &app_data_dir().join("db");
    if !db_dir.exists() {
        std::fs::create_dir_all(&db_dir).unwrap();
    }
    let db_dir_buf: PathBuf = db_dir.to_owned();
    db_dir_buf
}

fn launch_dolt() -> Result<(), String> {
    println!("Launching Dolt");

    // Build the option to use the data directory as the dolt directory.
    let dolt_data_path =
        "--data-dir ".to_owned() + &app_db_dir().into_os_string().into_string().unwrap();

    println!("Dolt dir: {}", dolt_data_path);

    Command::new_sidecar("dolt")
        .or(Err(String::from("Can't find dolt binary")))?
        .args(&["sql-server", &dolt_data_path])
        .spawn()
        .map_err(|err| format!("Error launching dolt {:?}", err))?;

    Ok(())
}

// Create the initial Reactor database, if none exists.
fn init_reactor_db() -> Result<(), String> {
    println!("Initializing Reactor database");

    let db_path = app_db_dir();

    println!("DB path: {}", db_path.display());

    let db_exists = Path::new(&db_path).exists();

    if !db_exists {
        println!("Creating database");
        Command::new_sidecar("dolt")
            .or(Err(String::from("Can't find dolt binary")))?
            .current_dir(db_path.clone())
            .args(&["init"])
            .spawn()
            .map_err(|err| format!("Error initializing dolt data directory {:?}", err))?;
    }

    // Create the initial SQL database via `dolt sql`
    // If dolt is not installed globally, does this still work?0
    Command::new_sidecar("dolt")
        .or(Err(String::from("Can't find dolt binary")))?
        .current_dir(db_path.clone())
        .args(&["sql", "-q", "CREATE DATABASE IF NOT EXISTS reactor"])
        .spawn()
        .map_err(|err| format!("Error initializing reactor database {:?}", err))?;

    Ok(())
}

fn main() {
    launch_dolt().unwrap();
    init_reactor_db().unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![set_api_key])
        .setup(|app| {
            let window = app.get_window("main").unwrap();

            println!("Booting trpc server...");

            tauri::async_runtime::spawn(async move {
                let (mut rx, mut child) = Command::new_sidecar("trpc")
                    .expect("failed to setup `trpc` sidecar")
                    .spawn()
                    .expect("Failed to spawn packaged trpc server");

                let mut i = 0;
                while let Some(event) = rx.recv().await {
                    if let CommandEvent::Stdout(line) = event {
                        window
                            .emit("message", Some(format!("'{}'", line)))
                            .expect("failed to emit event");
                        i += 1;
                        if i == 4 {
                            child.write("message from trpc\n".as_bytes()).unwrap();
                            i = 0;
                        }
                    }
                }
            });

            Ok(())
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
