# Python

> **Section 4 / 8** · **~15 min** · *applies to: all participants*

The programming language we'll use for everything else — data work, AI models, the chatbot backend.

## What is it?

Python is a high-level, general-purpose programming language created by Guido van Rossum in 1991. It's an *interpreted* language: you don't compile it ahead of time, you just run the source file. The syntax is designed to be readable, and the standard library is rich.

In rough historical context: C (1972) → C++ (1985) → Python (1991) → Java and JavaScript (1995). Python originally competed with Perl and Ruby for "scripting" work; today it dominates data science, machine learning, scientific computing, and a large slice of backend web development.

## Why do we use it?

Trade-offs:

- **Pro** — easy to read, batteries-included standard library, vast ecosystem (especially for AI/ML: NumPy, PyTorch, transformers, …), interactive REPL, great for prototyping.
- **Con** — slower than compiled languages (C, Rust, Go); the type system is optional and dynamic; managing versions and dependencies has historically been messy (which is why we'll install UV next).

For AI work specifically, Python is the de-facto standard. Almost every model, every framework, every research paper ships Python code. So we use Python.

## Install

We'll use **Python 3.11**. The official downloads page is **<https://www.python.org/downloads/>**, but we recommend installing via your package manager:

<details>
<summary><strong>macOS</strong></summary>

```bash
brew install python@3.11
```

This installs alongside any system Python; access it as `python3.11`.
</details>

<details>
<summary><strong>Linux / WSL (Ubuntu/Debian)</strong></summary>

```bash
sudo apt update
sudo apt install python3.11 python3.11-venv
```
</details>

<details>
<summary><strong>Windows (native)</strong></summary>

If you're on WSL, follow the Linux instructions inside WSL. Otherwise download from python.org and check "Add Python to PATH" during install.
</details>

> **Note:** in section 5 we'll install UV, which can also install Python versions for you. Doing it directly here gives you a working `python3.11` command before learning UV.

### Verify

```bash
python3.11 --version
```

Should print `Python 3.11.x`.

## Try it

Start the interactive REPL:

```bash
python3.11
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

That's Python in 30 seconds.

## Jupyter notebooks

Throughout the workshop we use **Jupyter notebooks** (`.ipynb` files): documents that mix Markdown explanations and runnable Python cells, with the output of each cell saved inline.

Notebooks are popular in data science and teaching because:

- You can see code and its output side-by-side.
- You can re-run cells in any order while exploring.
- They serve as both *runnable code* and *executable documentation*.

We'll install Jupyter via UV in the next section, then open notebooks directly in VSCode.

## VSCode integration

The Microsoft **Python** extension (you installed it in section 1) gives you:

- Syntax highlighting and autocompletion.
- An *interpreter picker* — bottom-right of the VSCode status bar — for choosing which Python a project uses.
- Built-in `.ipynb` support — open a notebook and it Just Works.

## Going further

- [Official Python tutorial](https://docs.python.org/3/tutorial/)
- [Real Python](https://realpython.com/) — high-quality articles
- [Project Jupyter](https://jupyter.org/) — about notebooks
