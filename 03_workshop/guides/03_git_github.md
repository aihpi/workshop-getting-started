# Git & GitHub

> **Section 3 / 8** · **~15 min** · *applies to: all participants*

## What is it?

**Git** is a version control system: it records snapshots of your project over time, lets you go back to any earlier state, and lets multiple people work on the same code without overwriting each other.

**GitHub** is the most popular *hosting service* for Git repositories. You upload your local Git history to GitHub, and other people can read it, copy it, suggest changes, and discuss them.

You can use Git without GitHub (it's just a tool on your machine). You cannot use GitHub without Git.

## Why do we use it?

Git solves three problems:

1. **History.** "What did this file look like two weeks ago, before I broke it?"
2. **Branching.** "Let me try a risky change without losing the working version."
3. **Collaboration.** "How do two people edit the same code without overwriting each other?"

Alternatives exist (Mercurial, Subversion, "copy the folder and add `_backup`"), but Git is the de-facto standard — most open source code, most workshops, most companies. Worth learning.

## Install

Official site: **<https://git-scm.com/downloads>**

<details>
<summary><strong>macOS</strong></summary>

macOS doesn't ship Git by default, but the first time you run a developer command-line tool it offers to install Apple's **Command Line Tools** — Git is included. Just try:

```bash
git --version
```

If a version prints, you're done. If a system dialog appears asking to install the developer tools, accept it and re-run the command.

**Optional — fresher Git via Homebrew.** Apple's bundled Git can lag the upstream release by a year or more. For everything in this workshop the bundled version is fine, but if you're on a very old macOS or want the latest security/feature fixes, you can install Homebrew (see section 4 for the one-liner) and then:

```bash
brew install git
```

The Homebrew binary takes precedence on `PATH`, so subsequent `git` calls will use it.
</details>

<details>
<summary><strong>Linux / WSL</strong></summary>

```bash
sudo apt update
sudo apt install git
```
</details>

<details>
<summary><strong>Windows (native)</strong></summary>

If you're on WSL, follow the Linux instructions inside WSL. Otherwise download "Git for Windows" from the link above.
</details>

### Configure

Tell Git who you are — your name and email show up in every commit.

First, check whether Git already knows you (you might have configured this before for another project):

```bash
git config --global user.name       # prints your configured name, or nothing if unset
git config --global user.email      # prints your configured email
```

If both print sensible values, skip ahead. Otherwise, set them:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

> **About `--global`**: `--global` writes the setting to `~/.gitconfig`, so every future repo on this machine inherits this identity. To override it for one specific repo (e.g. a work project that needs a different email), `cd` into that repo and run the same command without `--global` — it then writes only to that repo's `.git/config`.

### Verify

```bash
git --version
```

## Try it

You should already be inside `~/aisc/playground/` from §1 (or §2 if you're on Windows) — that's the workshop folder we set up. Open the integrated terminal in your VSCode window (`Terminal → New Terminal` or `` Ctrl+` ``); it'll open right there with `hello.txt` already in the file tree.

Initialise Git and commit the file we already have:

```bash
git init                          # turn this folder into a Git repo (creates a hidden .git/)
git status                        # what does Git see? -> hello.txt is "untracked"
git add hello.txt                 # stage hello.txt for the next commit
git status                        # hello.txt is now "staged"
git commit -m "First commit"      # record the staged change as a new commit
git log                           # show the commit history (one entry now)
```

`git log` prints a single commit with your name, email, and the message you typed. That's a Git history.

Now try the everyday loop: change a file, see what changed, stage it, commit it. Edit `hello.txt` in VSCode (add a second line, save), then in the terminal:

```bash
git status                        # hello.txt is now "modified, not staged"
git diff                          # see the line-by-line changes
git add hello.txt                 # stage the change
git commit -m "Update hello.txt"  # commit it
git log --oneline                 # compact history -> two commits now
```

We'll come back to `~/aisc/playground/` in §5 when we layer Python tooling on top of this same folder, and again in §6 for Ollama. The full workshop repository (`workshop-getting-started/`) gets cloned in §8 when we run the chatbot demo.

## VSCode integration

Click the **Source Control** icon in VSCode (third icon down on the left sidebar). You'll see your single commit listed there, plus buttons to stage and commit any new changes without typing the commands. Try editing `hello.txt`, saving, and watching the change appear in the Source Control panel as an unstaged modification.

## Common Git commands

A small set of commands covers most everyday Git use. Treat this as a reference card — for real fluency, work through the tutorials linked below.

| Command | What it does |
|---|---|
| `git status` | What has changed since the last commit? What's staged, modified, or untracked? |
| `git diff` | Show unstaged changes line by line. |
| `git diff --staged` | Show what's been staged but not yet committed. |
| `git add <file>` | Stage a specific file for the next commit. |
| `git add .` | Stage every change in the current folder. |
| `git commit -m "msg"` | Record staged changes as a new commit. |
| `git log` | Full commit history. |
| `git log --oneline` | One commit per line — easier to scan. |
| `git branch` | List local branches. |
| `git switch <branch>` | Switch to an existing branch (older form: `git checkout <branch>`). |
| `git switch -c <branch>` | Create a new branch and switch to it. |
| `git clone <url>` | Download a remote repository to a new folder. |
| `git pull` | Fetch updates from a remote and merge them into your branch. |
| `git push` | Send your local commits to a remote. |
| `git remote -v` | List the remotes this repo knows about. |

## Branches, issues, and pull requests *(brief)*

You don't need these for the workshop, but it's worth knowing they exist:

- **Branches** — parallel versions of your code, used to develop a feature without disturbing the main line.
- **Issues** — a place on GitHub to track bugs or planned work.
- **Pull requests** — a proposal to merge one branch into another, with a discussion thread attached.

## GitHub account *(optional, do at home)*

You don't need a GitHub account for the workshop, but if you'd like to push your work online or contribute to open source, sign up at **<https://github.com/signup>**. After that, set up authentification (SSH keys) following [GitHub's official guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

## Going further

- [**Learn Git Branching**](https://learngitbranching.js.org/) — interactive visualisations of branching, merging, and rebasing. The fastest way to build intuition for Git's model.
- [**Pro Git book**](https://git-scm.com/book/en/v2) — the canonical free book. Chapters 1–3 cover ~95% of day-to-day Git.
- [**GitHub docs**](https://docs.github.com/) — GitHub-specific topics: pull requests, issues, Actions.
