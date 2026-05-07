# AISC Getting Started Workshop

A hands-on introduction to the development tools and workflows used across the workshops offered by the **AI Service Centre Berlin Brandenburg**. Over roughly 2–3 hours, you'll set up a complete local development environment from scratch — and, more importantly, *understand what you're installing and why*.

## Who this is for

People who can use a computer but are new to:

- Code editors and version control
- The terminal / command line
- Python environments and package management
- Containers (Docker)
- Running AI models locally

No prior programming experience is assumed.

## How the workshop runs

This is an **interactive, teacher-led workshop**, not a script you execute on your own. The instructor walks through each tool live, explains *what it is, why it exists, and which alternatives are out there*, then you install and try it together. Stop and ask questions at any point — that is the point.

**There is no pre-work.** You will install everything live during the session. Setting things up *together* is part of what the workshop teaches.

## Agenda

| # | Section | Guide | Notes |
|---|---|---|---|
| 1 | Visual Studio Code | [`guides/01_vscode.md`](guides/01_vscode.md) | code editor + extensions |
| 2 | WSL | [`guides/02_wsl.md`](guides/02_wsl.md) | Windows users only — others skip |
| 3 | Git & GitHub | [`guides/03_git_github.md`](guides/03_git_github.md) | basics of version control |
| 4 | Python | [`guides/04_python.md`](guides/04_python.md) | language overview, Jupyter notebooks |
| 5 | UV | [`guides/05_uv.md`](guides/05_uv.md) | modern Python package manager |
| 6 | Ollama | [`guides/06_ollama.md`](guides/06_ollama.md) | run AI models locally |
| 7 | Docker | [`guides/07_docker.md`](guides/07_docker.md) | packaging services for deployment |
| 8 | Chatbot demo | [`guides/08_chatbot_demo.md`](guides/08_chatbot_demo.md) | what you can build with all of this |

Each guide is short and follows the same shape — what / why / install / verify / try it / going further. They are designed to be useful both *during* the live session and *after*, when you want to revisit a tool on your own.

## Repository layout

```
03_workshop/
├── README.md          you are here
├── guides/            per-tool guides (one per agenda item)
├── notebooks/         Jupyter notebooks for replay at home
├── slides/            workshop slides (English and German)
└── _archive/          deprecated pre-May 2026 setup guides
```

The chatbot example application lives at the repo root in `01_frontend/`, `02_backend/`, and `docker-compose.yml`. Section 8 walks through running it.

## After the workshop

- The notebooks in [`notebooks/`](notebooks/) cover the same material at your own pace — useful for revisiting any section.
- Each guide ends with a "Going further" pointer to deeper documentation.
- Try cloning a project of your own and using everything you installed today.

## Need help?

Contact **kisz@hpi.de**.
