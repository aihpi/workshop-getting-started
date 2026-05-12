# Visual Studio Code

> **Section 1 / 8** · **~15 min** · *applies to: all participants*

## What is VSCode?

Visual Studio Code (VSCode) is a free, open-source code editor (IDE) from Microsoft. It has a large ecosystem of extensions that turn it into a full development environment for almost any language.

## What is an IDE?

**IDE** stands for *Integrated Development Environment* — a single application that bundles together everything a developer needs day-to-day: a code editor, a terminal, version control, debugging tools, language-specific helpers, and a way to install more functionality through extensions.

The "integrated" part is the point. You *could* write code in Notepad, run commands in a separate terminal, manage Git in a third app, and debug by adding `print()` statements — but in an IDE all of those tools live in one window and know about each other. Your editor highlights the same line your debugger paused on; your version-control panel shows the file you just changed; your terminal opens in the project's folder by default.

## Why do we use it?

There are several alternatives:

- **JetBrains IDEs** (PyCharm, IntelliJ): more powerful out of the box, especially for large codebases — but heavier and partly paid.
- **Cursor**: a fork of VSCode that bundles AI assistants by default.
- **Vim / Emacs**: very powerful but a steep learning curve.

We pick VSCode because it's free, runs everywhere, has the largest extension ecosystem, integrates cleanly with WSL / Docker / Jupyter / Python out of the box, and is the most common starting point for new developers.

## Install

Download from the official site: **<https://code.visualstudio.com/>**

<details>
<summary><strong>macOS</strong></summary>

Download the `.zip`, drag `Visual Studio Code` into `Applications`, and launch it. To enable the `code` shell command, open VSCode → `Cmd+Shift+P` → "Shell Command: Install 'code' command in PATH".
</details>

<details>
<summary><strong>Linux / WSL</strong></summary>

Use the `.deb` (Debian/Ubuntu) or `.rpm` (Fedora) package linked from the download page, or your distribution's package manager.

If you're on **WSL**, install VSCode on the Windows side (not inside Linux) — the Remote-WSL extension will bridge the two. See section 2.
</details>

<details>
<summary><strong>Windows</strong></summary>

Run the installer from the link above. You'll connect VSCode to WSL in section 2.
</details>

### Verify

```bash
code --version
```

Should print three lines: VSCode version, commit hash, and architecture.

## Your workshop folder

Throughout the rest of this workshop, we'll keep everything in a single folder called `aisc/`. You can place it anywhere you like — your home directory, your `Documents` folder, a project directory you already use. The examples in these guides write `~/aisc/`; feel free to substitute your own path.

The folder will end up with two subfolders:

```
aisc/
├── playground/                  ← scratch space we grow through §3, §5, §6
└── workshop-getting-started/    ← cloned in §8, contains the chatbot demo
```

`playground/` is where you'll try out git, UV, and Ollama. `workshop-getting-started/` is this repository — you'll clone it in §8 when we run the chatbot example.

## Try it

### macOS / Linux

1. Open a terminal and create your workshop folder:

   ```bash
   mkdir -p ~/aisc/playground
   cd ~/aisc/playground
   ```

2. Open it in VSCode:

   ```bash
   code .
   ```

   VSCode reopens with `playground` as the workspace. **Keep this window open** — every subsequent section operates inside this folder, and the integrated terminal will already be in the right place.

3. Try the basics: create a new file `hello.txt` in the file tree, type something, save.

> Info: Auto-Save is deactivated in VSCode by default. We recommend to turn it on. 

### Windows

VSCode runs on the Windows side, but your workshop folder will live inside WSL — both get set up in §2. For now, just confirm VSCode launches:

1. Open VSCode from the Start menu and check that the welcome screen appears.
2. In PowerShell (or Command Prompt), confirm the `code` command works:

   ```powershell
   code --version
   ```

That's it for §1 on Windows. The full workspace exercise comes in §2 once WSL is up.

## Outlook

If you enjoy VSCode, several AI-powered variants and add-ons are worth knowing about:

- **GitHub Copilot** — VSCode extension, autocompletes code as you type.
- **Claude Code**, **Codex** — terminal-based AI coding agents you can run alongside any editor.

## Going further

- [VSCode official documentation](https://code.visualstudio.com/docs)
- [Tips and tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [Keyboard shortcuts cheat sheet](https://code.visualstudio.com/docs/reference/keybindings)
