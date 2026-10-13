# AISC Getting Started Workshop

An introduction to the development tools and workflows used across the workshops offered by the **AI Service Centre Berlin Brandenburg**. 

## Who this is for

People who can use a computer but are new to:

- Code editors and version control
- The terminal / command line
- Python environments and package management
- Containers (Docker)
- Running AI models locally

No prior programming experience is assumed.

## Agenda

| # | Section | Guide | Notes |
|---|---|---|---|
| 1 | Visual Studio Code | [`guides/01_vscode.md`](guides/01_vscode.md) | code editor, the `~/aisc/` workshop folder |
| 2 | WSL | [`guides/02_wsl.md`](guides/02_wsl.md) | Windows users only — others skip |
| 3 | Git & GitHub | [`guides/03_git_github.md`](guides/03_git_github.md) | basics of version control |
| 4 | UV | [`guides/04_uv.md`](guides/04_uv.md) | Python package manager, installs Python 3.11 |
| 5 | Python | [`guides/05_python.md`](guides/05_python.md) | language overview, system vs project Python |
| 6 | Jupyter | [`guides/06_jupyter.md`](guides/06_jupyter.md) | notebooks in VS Code |
| 7 | Ollama | [`guides/07_ollama.md`](guides/07_ollama.md) | run AI models locally |
| 8 | Docker | [`guides/08_docker.md`](guides/08_docker.md) | packaging services for deployment |
| 9 | Chatbot demo | [`guides/09_chatbot_demo.md`](guides/09_chatbot_demo.md) | what you can build with all of this |

Each guide opens with a line that says what it installs, what it creates on your disk and which earlier sections it needs.

## Repository layout

```
03_workshop/
├── README.md          you are here
├── guides/            per-tool guides (one per agenda item)
├── notebooks/         Jupyter notebooks for replay at home
├── slides/            workshop slides (English and German)
└── _archive/          deprecated pre-May 2026 setup guides
```

The chatbot example application lives at the repo root in `01_frontend/`, `02_backend/`, and `docker-compose.yml`. Section 9 walks through running it.

## After the workshop

- The notebooks in [`notebooks/`](notebooks/) cover the same material and may be useful for revisiting any section. If you finish early during the workshop, start with them (see the end of guide 9).
- Each guide ends with a "Going further" pointer to deeper documentation.
- Try cloning a project of your own and using everything you installed today.

## Need help?

Contact **kisz@hpi.de** or open a github issue.
