# VSCode

This is a guide to getting started developing Voxable with VSCode.

## Terminals

We use the [VSCode Terminal](https://code.visualstudio.com/docs/editor/integrated-terminal) to run commands in the terminal. The [Terminal Manager Extension](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-terminals) is used to manage multiple terminals, allowing you to run multiple commands at the same time.

### Launching all commands

Call up the command palette with `Ctrl+Shift+P` and type `Terminal Manager: Run` to run all commands necessary for development in their own terminal tabs.

### Launching a single command

Launch `Terminal Manager: Run Single` from the command palette to create a new terminal. 

:::tip

You can also use the `+` button in the terminal tab bar to launch one-off terminal tabs.

:::

### Editing default commands

The default commands are defined in the `.vscode/terminals.json` file. You can edit this file to add or remove commands. Call up the command palette with `Ctrl+Shift+P` and type `Terminals: Edit Configuration` to edit the file.

#### Default configuration

```json
{
  "autorun": false,
  "terminals": [
    {
      "name": "Single",
      "description": "This is a description",
      "focus": true,
      "command": "echo \"Hello World\""
    },
    {
      "name": "Multi",
      "commands": [
        "echo \"Did you know?\"",
        "echo \"You can execute multiple commands\""
      ]
    },
    {
      "name": "Single - No execution",
      "execute": false,
      "command": "Press enter to run me"
    },
    {
      "name": "Multi - No execution",
      "execute": false,
      "commands": [
        "echo \"Only the last command won't be executed\"",
        "Press enter to run me"
      ]
    },
    {
      "name": "Persistent",
      "focus": true,
      "onlySingle": true,
      "persistent": "demo_persistent",
      "command": "echo \"I'm persistent! Try to reload the window and re-execute this command\""
    },
    {
      "name": "Variable Substitution",
      "description": "Many special strings can be substituted dynamically",
      "command": "echo \"workspaceFolder: [workspaceFolder]\\nworkspaceFolderBasename: [workspaceFolderBasename]\\nfile: [file]\\nrelativeFile: [relativeFile]\\nfileBasename: [fileBasename]\\nfileBasenameNoExtension: [fileBasenameNoExtension]\\nfileDirname: [fileDirname]\\nfileExtname: [fileExtname]\\ncwd: [cwd]\\nlineNumber: [lineNumber]\""
    },
    {
      "name": "Only Single",
      "open": true,
      "onlySingle": true,
      "command": "echo \"I will not run with the others\""
    }
  ]
}
```
