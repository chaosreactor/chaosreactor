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

## Debugging

We use the [VSCode Debugger](https://code.visualstudio.com/docs/editor/debugging) to debug the application. The [Debugger for Chrome Extension](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) is used to debug the application in the browser.

### Launching the debugger

Call up the command palette with `Ctrl+Shift+P` and type `Debug: Start Debugging` to launch the debugger.

### Editing the configuration

The default configuration is defined in the `.vscode/launch.json` file. You can edit this file to add or remove configurations. Call up the command palette with `Ctrl+Shift+P` and type `Debug: Open launch.json` to edit the file.

#### Default configuration

```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Launch Chrome against localhost",
      "type": "chrome",
      "request": "launch",
      "url": "http://localhost:3000",
      "webRoot": "${workspaceFolder}"
    }
  ]
}
```

## Linting

We use the [Prettier - Code formatter extension](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode) to lint the application.

### Linting on save

Call up the command palette with `Ctrl+Shift+P` and type `Format Document` to lint the application.

## GitHub Copilot

We use [GitHub Copilot](https://copilot.github.com/) to write code for us. The [GitHub Copilot extension](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot) is used to access GitHub Copilot. Their [getting started instructions](https://docs.github.com/en/copilot/getting-started-with-github-copilot/getting-started-with-github-copilot-in-visual-studio-code) offer more information on how to use the extension.

:::caution
Be sure to [**block suggestions of public code**](https://docs.github.com/en/copilot/configuring-github-copilot/configuring-github-copilot-settings-on-githubcom#enabling-or-disabling-duplication-detection) to avoid unintentionally plagiarizing code with an incompatible license.
:::
