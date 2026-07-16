# WSL — Windows Subsystem for Linux

> **Section 2 / 8** · **~15 min** · *applies to: Windows users only*

If you're on macOS or Linux, **skip this section**. Your operating system already gives you everything WSL provides on Windows.

## What is it?

WSL ("Windows Subsystem for Linux") is a Windows feature that lets you run a complete Linux distribution alongside Windows itself, sharing files but with its own shell, package manager, and command-line tools.

In practice: open a terminal and you're in Ubuntu (or another Linux distribution).

## Why do we use it?

Most modern developer tooling — the Python ecosystem, container tools, AI/ML libraries — is built and tested on Linux first. On Windows directly you often hit subtle compatibility issues: case-sensitive paths, missing shell utilities, line endings, package versions. These problems eat hours.

You have a few options as a Windows user:

- **Use Windows directly** with PowerShell — fine for some tools (VSCode, Docker Desktop), broken for others.
- **Dual-boot Linux** — full Linux experience, but disruptive.
- **Run a virtual machine** — heavy, slow file sharing.
- **WSL** — best of both worlds: a real Linux environment, integrated with Windows, with native file access and good performance.

We use WSL because it gives Windows users the same experience macOS and Linux users have, without leaving Windows.

### PowerShell vs. the WSL shell

These look similar but are *not the same*. Once WSL is installed, run **all workshop commands inside the WSL shell**, not PowerShell. PowerShell is Windows; WSL is Linux. Tools you install in one are not available in the other.

## Install

Official documentation: **<https://learn.microsoft.com/en-us/windows/wsl/install>**

**Requirements:** Windows 10 version 2004 (build 19041) or higher, or Windows 11. Hardware virtualization must be enabled in your BIOS — usually on by default on modern laptops; if `wsl --install` fails to start, this is the first thing to check.

In an **administrator** PowerShell window:

```powershell
wsl --install -d Ubuntu
```

This installs WSL and Ubuntu by default. **Reboot**, then launch "Ubuntu" from the Start menu — it'll ask you to create a Linux username and password (these are *separate* from your Windows credentials).

### Verify

In a new WSL terminal:

```bash
uname -a
```

Should print a line containing `Linux` and `WSL2`.

## Try it

1. Launch your WSL shell (the "Ubuntu" Start-menu entry).
2. Run a few Linux commands to confirm: `pwd`, `ls`, `whoami`.
3. Update the package list: `sudo apt update`.
4. Create the workshop folder we introduced in §1, where everything in the workshop will live:

   ```bash
   mkdir -p ~/aisc/playground
   ```

   > **Important — keep `aisc/` inside WSL.** Don't put it on `/mnt/c/…` (e.g. `/mnt/c/Users/<you>/Documents/aisc/`). Cross-filesystem access from WSL to Windows files is much slower (5–20× for workloads with many small files, like `uv sync` writing into `.venv/`), and Linux-style permissions and symlinks don't behave the same on NTFS. `~/aisc/` lives natively on WSL's ext4 filesystem — that's where it should stay.

## VSCode integration

Open VSCode and install the **WSL** extension *by Microsoft* (sometimes labelled "Remote - WSL"). Then, from your WSL terminal:

```bash
cd ~/aisc/playground
code .
```

VSCode will reopen with the bottom-left status bar showing `WSL: Ubuntu` and `playground/` as the workspace. Try creating a new file `hello.txt` in the file tree, type something, save — that confirms the WSL ↔ VSCode bridge is working. **Keep this VSCode window open**: every subsequent section operates inside this folder, and from now on, everything you do in the workshop should happen inside WSL via VSCode.

## Going further

- [WSL documentation](https://learn.microsoft.com/en-us/windows/wsl/)
- [VSCode + WSL guide](https://code.visualstudio.com/docs/remote/wsl)
- [Working with files across Windows and WSL](https://learn.microsoft.com/en-us/windows/wsl/filesystems)
