# Fixing red TypeScript/JSX errors in VS Code

These errors happen when VS Code cannot find the project's installed Next.js,
React, TypeScript, and React type packages, or when only the `app` folder is
opened instead of the project root.

## Windows setup

1. Extract the complete ZIP.
2. In VS Code choose **File > Open Folder** and open the folder that contains
   `package.json` (not the `app` folder).
3. Open the VS Code terminal and run:

```powershell
npm.cmd ci
npm.cmd run dev
```

4. Open http://localhost:3000

If red lines remain after installation, press `Ctrl+Shift+P`, run
**TypeScript: Restart TS Server**, and then run **Developer: Reload Window**.

## Clean reinstall

```powershell
Remove-Item -Recurse -Force node_modules, .next -ErrorAction SilentlyContinue
npm.cmd ci
npm.cmd run dev
```

Do not run the source from inside the Node.js interactive console. Run the
commands in the VS Code PowerShell or Command Prompt terminal.
