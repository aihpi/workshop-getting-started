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

## Try it

1. Open VSCode.
2. `File → Open Folder…` and pick (or create) any folder. This is now your **workspace**.
3. Create a new file `hello.txt`, type something, save.

> **Heads-up on the workshop folder.** Throughout the rest of this workshop we'll keep everything in a single folder called `~/aisc/`. We set it up properly in section 3 (once everyone has a shell and Git installed) — for this first exercise any folder you like will do.

## Outlook

If you enjoy VSCode, several AI-powered variants and add-ons are worth knowing about:

- **GitHub Copilot** — VSCode extension, autocompletes code as you type.
- **Claude Code**, **Codex** — terminal-based AI coding agents you can run alongside any editor.

## Going further

- [VSCode official documentation](https://code.visualstudio.com/docs)
- [Tips and tricks](https://code.visualstudio.com/docs/getstarted/tips-and-tricks)
- [Keyboard shortcuts cheat sheet](https://code.visualstudio.com/docs/reference/keybindings)
