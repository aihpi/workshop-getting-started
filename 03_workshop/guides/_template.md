<!--
==============================================================================
Guide template for the AISC Getting Started Workshop.

Each per-tool guide under guides/ follows the shape below so participants get
a consistent reading experience and instructors can pace the workshop evenly.

Sections:
  - "What is it?", "Why do we use it?", "Install", "Verify", "Try it" are
    REQUIRED for every tool.
  - "VSCode integration", "Outlook", "Going further" are OPTIONAL — include
    them when they fit (e.g. VSCode integration for Git/Python/Jupyter,
    Outlook for VSCode coding agents or Ollama "what you can build").

Tone:
  - Short. Each guide should be readable in 5 minutes outside the workshop.
  - Explain *why*, not just *how*. The "why" is the point of the rework.
  - Link to official docs for installation steps rather than duplicating
    them; only include commands inline when they are short and stable.

Delete this comment block when you copy the template.
==============================================================================
-->

# [Tool Name]

> **Section X / 8** · **~15 min** · *applies to: all participants | Windows users only | …*

[One-sentence hook: what this section is about and why it matters.]

## What is it?

[One or two short paragraphs in plain language. No jargon that hasn't been
introduced yet. Aim for "explain to someone who has never heard the name."]

## Why do we use it?

[The point of the rework: explain the *problem this tool solves* and the
trade-offs vs. alternatives. Examples:
  - VSCode vs. Cursor vs. JetBrains vs. plain text editor
  - UV vs. pip vs. conda vs. poetry
  - Docker vs. running things directly on the host
End with one or two sentences on *why we picked this particular tool* for
the workshop.]

## Install

The official installation page is the source of truth — follow it for the
latest instructions: **[link to official docs]**.

Short OS-specific commands below for live workshop use:

<details>
<summary><strong>macOS</strong></summary>

```bash
# install command(s)
```
</details>

<details>
<summary><strong>Linux / WSL</strong></summary>

```bash
# install command(s)
```
</details>

<details>
<summary><strong>Windows (native)</strong></summary>

[Either: short instructions, or "Use WSL — see section 2."]
</details>

### Verify

```bash
some-command --version
```

You should see something like `…`.

## Try it

[A 2–5 minute hands-on exercise. Concrete, small, and with a clearly
observable outcome. The instructor demonstrates first, then participants
repeat. Examples:
  - Git: `git init` a folder, make a commit, look at `git log`.
  - UV: `uv venv`, `uv add requests`, look at the lock file.
  - Ollama: `ollama run llama3.2:1b`, ask it a question.]

## VSCode integration *(optional — include if relevant)*

[How this tool shows up inside VSCode — e.g. the Source Control panel for
Git, the Python interpreter picker, the Jupyter kernel selector. Just enough
to point participants at the right place; full deep-dive belongs in
"Going further".]

## Outlook *(optional — include if relevant)*

[Forward pointers that don't fit elsewhere. Examples:
  - VSCode → Cursor, GitHub Copilot, Claude Code, Codex.
  - Ollama → "you can build a chatbot like the one in section 8."
  - Docker → Kubernetes, cloud deployment.
Keep it short — one paragraph or a bullet list. Goal is "what could I
explore next," not "complete reference."]

## Going further

- [Official documentation](#)
- [Tutorial / blog post worth reading](#)
- [Related tool you might want next](#)
