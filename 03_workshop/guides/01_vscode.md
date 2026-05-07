# Visual Studio Code

> **Section 1 / 8** · **~15 min** · *applies to: all participants*

This is the editor you'll use for everything else in the workshop. We start here so you have somewhere to keep your work as we install the rest of the stack.

## What is it?

Visual Studio Code (VSCode) is a free, open-source code editor from Microsoft. It runs on Windows, macOS, and Linux, and has a large ecosystem of extensions that turn it into a full development environment for almost any language.

Think of it as a smarter text editor: it understands code, helps you navigate large projects, runs your programs, lets you talk to Git, and connects to remote machines or containers — all from one window.

## Why do we use it?

A plain text editor (Notepad, TextEdit) can edit code, but it doesn't *understand* code — no autocompletion, no error highlighting, no integration with the tools we'll install later (Git, Python, Jupyter).

There are several alternatives:

- **JetBrains IDEs** (PyCharm, IntelliJ): more powerful out of the box, especially for large codebases — but heavier and partly paid.
- **Cursor**: a fork of VSCode that bundles AI assistants by default. Pleasant if you want AI coding from day one, and the interface is essentially VSCode.
- **Vim / Emacs**: very powerful but a steep learning curve, not workshop material.

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

## Try it

1. Open VSCode.
2. `File → Open Folder…` and pick (or create) any folder. This is now your **workspace**.
3. Create a new file `hello.txt`, type something, save.
4. Open the **Extensions** panel (left sidebar, four-square icon). Search for "Python" and install the official Microsoft extension — we'll need it later.

You've now used the three things you'll do in VSCode every day: open a folder, edit a file, install an extension.

## Outlook

If you enjoy VSCode, several AI-powered variants and add-ons are worth knowing about:

- **GitHub Copilot** — VSCode extension, autocompletes code as you type.
- **Cursor** — a VSCode fork with built-in AI chat and editing.
- **Claude Code**, **Codex** — terminal-based AI coding agents you can run alongside any editor.

These all build on the same VSCode foundations you've just installed.

## Going further

- [VSCode official documentation](https://code.visualstudio.com/docs)
- [Tips and tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [Keyboard shortcuts cheat sheet](https://code.visualstudio.com/docs/reference/keybindings)
