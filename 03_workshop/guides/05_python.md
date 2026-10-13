# Python

> **Section 5 / 9** · **~10 min** · *applies to: all participants*
>
> **Installs:** nothing (Python 3.11 arrived with UV in §4); optionally the VS Code Python extension · **Creates:** nothing · **Needs:** §4

The programming language we'll use for most tasks: data work, AI models, the chatbot backend.

## What is it?

Python is a high-level, general-purpose programming language created by Guido van Rossum in 1991. It's an *interpreted* language: you don't compile it ahead of time, you just run the source file. The syntax is designed to be readable, and the standard library is rich.

In rough historical context: C (1972) → C++ (1985) → Python (1991) → Java and JavaScript (1995). Today it dominates data science, machine learning, scientific computing, and a large slice of backend web development.

## Why do we use it?

Trade-offs:

- **Pro**: easy to read, batteries-included standard library, vast ecosystem (especially for AI/ML: NumPy, PyTorch, transformers, …), interactive Read–Eval–Print Loop (REPL), great for prototyping.
- **Con**: slower than compiled languages (C, Rust, Go); the type system is optional and dynamic; managing versions and dependencies has historically been messy (which is why we installed UV first, in §4).

For AI work specifically, Python is the de-facto standard. Almost every model, every framework, every research paper ships Python code. So we use Python.

## Which Python do you have?

Probably two by now:

- **The system Python.** macOS ships `python3` with the Command Line Tools you accepted in §3 (typically 3.9). Ubuntu, and therefore WSL, ships `python3` as part of the base system (3.10 on 22.04, 3.12 on 24.04). It's *load-bearing*, because `apt` and several distro utilities depend on it, so we **don't touch it**.
- **The project Python.** UV downloaded Python 3.11 in §4 and keeps it in its own cache. It is invisible to the system, and it is the one every `uv run` in the playground uses.

Compare the two:

```bash
cd ~/aisc/playground
python3 --version             # the system Python, whatever version your OS ships
uv run python --version       # the project Python: 3.11
```

Installing 3.11 system-wide instead would be a real footgun: it would shadow your system `python3` in confusing ways, and on Linux it risks breaking `apt`. UV sidesteps all of that with one Python per project.

## Try it

Start the interactive REPL inside the playground's environment:

```bash
uv run python
```

Try a few things:

```python
>>> 2 + 2
4
>>> name = "workshop"
>>> print(f"Hello, {name}!")
Hello, workshop!
>>> import requests
>>> requests.__version__
'2.32.5'    # whatever version UV installed for you
>>> exit()
```

The `import requests` line works because §4 added that library to the playground's `.venv/`. Try the same import in the system `python3` and it will fail with `ModuleNotFoundError`. That is the isolation UV gives you.

## VSCode integration

Install the Microsoft **Python** extension in VSCode (Extensions panel → search "Python"). It gives you:

- Syntax highlighting and autocompletion.
- An *interpreter picker* (bottom-right of the VSCode status bar) for choosing which Python a project uses. Pick the one in `.venv/` so the editor sees the same packages as `uv run`.

## Going further

- [Official Python tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/), high-quality articles
