# Python

> **Section 4 / 8** · **~15 min** · *applies to: all participants*

The programming language we'll use for most tasks: data work, AI models, the chatbot backend.

## What is it?

Python is a high-level, general-purpose programming language created by Guido van Rossum in 1991. It's an *interpreted* language: you don't compile it ahead of time, you just run the source file. The syntax is designed to be readable, and the standard library is rich.

In rough historical context: C (1972) → C++ (1985) → Python (1991) → Java and JavaScript (1995). Today it dominates data science, machine learning, scientific computing, and a large slice of backend web development.

## Why do we use it?

Trade-offs:

- **Pro** — easy to read, batteries-included standard library, vast ecosystem (especially for AI/ML: NumPy, PyTorch, transformers, …), interactive Read–Eval–Print Loop (REPL), great for prototyping.
- **Con** — slower than compiled languages (C, Rust, Go); the type system is optional and dynamic; managing versions and dependencies has historically been messy (which is why we'll install UV next).

For AI work specifically, Python is the de-facto standard. Almost every model, every framework, every research paper ships Python code. So we use Python.

## What you probably already have

- **macOS** — Once you've accepted the Command Line Tools prompt in section 3, you have `python3` (typically Python 3.9, kept around by Apple for developer tooling).
- **Linux / WSL** — Ubuntu ships Python 3 as part of the base system (`python3` is 3.10 on Ubuntu 22.04, 3.12 on 24.04). It's *load-bearing* — `apt` and several distro utilities depend on it — so we **don't replace it**.
- **Native Windows** — No Python by default. If you're following along outside WSL, install one from <https://python.org/downloads/>.

Check what you have:

```bash
python3 --version
```

For the REPL demo below, **any Python 3.x will do**. The workshop's actual project pins Python 3.11, but installing 3.11 ourselves system-wide creates a real footgun: it would shadow your system `python3` in confusing ways, and on Linux it risks breaking `apt`. **UV will set up a project-local Python 3.11 for us in section 5**, isolated from your system Python.

## Try it

Start the interactive REPL using whatever `python3` you have:

```bash
python3
```

Try a few things:

```python
>>> 2 + 2
4
>>> name = "workshop"
>>> print(f"Hello, {name}!")
Hello, workshop!
>>> exit()
```

## Jupyter notebooks

Throughout the workshop we use **Jupyter notebooks** (`.ipynb` files): documents that mix Markdown explanations and runnable Python cells, with the output of each cell saved inline.

Notebooks are popular because:

- You can see code and its output side-by-side.
- You can re-run cells in any order while exploring.
- They serve as both *runnable code* and *executable documentation*.

We'll install Jupyter via UV in the next section, then open notebooks directly in VSCode.

## VSCode integration 

You will probably be automatically asked by VSCode to do it when you try to run your first Jupyter notebook:
If you haven't already, install the Microsoft **Python** and **Jupyter** extension in VSCode (Extensions panel → search "Python"). It gives you:

- Syntax highlighting and autocompletion.
- An *interpreter picker* — bottom-right of the VSCode status bar — for choosing which Python a project uses.
- Built-in `.ipynb` support

## Going further

- [Official Python tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/) — high-quality articles
- [Project Jupyter](https://jupyter.org/) — about notebooks
