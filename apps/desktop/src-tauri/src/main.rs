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

  Command::new_sidecar("dolt")
    .or(Err(String::from("Can't find dolt binary")))?
    .args( &["sql-server"])
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
