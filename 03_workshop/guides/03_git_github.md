# Git & GitHub

> **Section 3 / 8** · **~15 min** · *applies to: all participants*

Git tracks every change you make to your code. GitHub is a website that stores your Git repositories online and lets you share them with other people. Two different things that work together.

## What is it?

**Git** is a version control system: it records snapshots of your project over time, lets you go back to any earlier state, and lets multiple people work on the same code without overwriting each other.

**GitHub** is the most popular *hosting service* for Git repositories. You upload your local Git history to GitHub, and other people can read it, copy it, suggest changes, and discuss them.

You can use Git without GitHub (it's just a tool on your machine). You cannot use GitHub without Git.

## Why do we use it?

Git solves three problems:

1. **History.** "What did this file look like two weeks ago, before I broke it?"
2. **Branching.** "Let me try a risky change without losing the working version."
3. **Collaboration.** "How do two people edit the same code without overwriting each other?"

Alternatives exist (Mercurial, Subversion, "copy the folder and add `_backup`"), but Git is the de-facto standard — most open source code, most workshops, most companies. Worth learning once.

## Install

Official site: **<https://git-scm.com/downloads>**

<details>
<summary><strong>macOS</strong></summary>

```bash
brew install git
```

(Or accept Apple's prompt the first time you run `git` — it offers to install the Command Line Tools.)
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

Tell Git who you are — your name and email show up in every commit:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Verify

```bash
git --version
```

## Try it

In an empty folder:

```bash
git init
echo "hello" > hello.txt
git add hello.txt
git commit -m "First commit"
git log
```

`git log` shows a single commit with your name, your email, and the message you typed. That's a Git history.

## VSCode integration

Open the same folder in VSCode and click the **Source Control** icon (third icon down on the left sidebar). You'll see the same commit history, plus buttons to stage and commit changes without typing the commands.

## Branches, issues, and pull requests *(brief)*

You don't need these for the workshop, but it's worth knowing they exist:

- **Branches** — parallel versions of your code, used to develop a feature without disturbing the main line.
- **Issues** — a place on GitHub to track bugs or planned work.
- **Pull requests** — a proposal to merge one branch into another, with a discussion thread attached.

These are how teams use GitHub day-to-day.

## GitHub account *(optional, do at home)*

You don't need a GitHub account for the workshop, but if you'd like to push your work online or contribute to open source, sign up at **<https://github.com/signup>**. After that, set up SSH keys following [GitHub's official guide](https://docs.github.com/en/authentication/connecting-to-github-with-ssh).

## Going further

- [Pro Git book (free)](https://git-scm.com/book/en/v2)
- [Interactive Git tutorial](https://learngitbranching.js.org/)
- [GitHub docs](https://docs.github.com/)
