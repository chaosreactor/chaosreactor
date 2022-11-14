use std::path::Path;
use tauri::api::path::data_dir;
use tauri::api::process::Command;

#[cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]
// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn launch_dolt() -> Result<(), String> {
    println!("Launching Dolt");

    // Build the option to use the data directory as the dolt directory.
    let dolt_data_path = "--data-dir ".to_owned()
        + &data_dir()
            .unwrap()
            .join("dolt")
            .into_os_string()
            .into_string()
            .unwrap();

    println!("Dolt dir: {}", dolt_dir);

    Command::new_sidecar("dolt")
        .or(Err(String::from("Can't find dolt binary")))?
        .args(&["sql-server", &dolt_dir])
        .spawn()
        .map_err(|err| format!("Error launching dolt {:?}", err))?;

    Ok(())
}

fn main() {
    launch_dolt().unwrap();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
