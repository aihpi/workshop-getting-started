# Jupyter notebooks

> **Section 6 / 9** · **~10 min** · *applies to: all participants*
>
> **Installs:** `jupyter` into the playground's `.venv/`, the VS Code Jupyter extension · **Creates:** `hello.ipynb` inside the playground · **Needs:** §4

Notebooks are how most AI code gets explored before it becomes a script. We'll use one in §7 to talk to a language model, and the workshop's own notebooks in [`../notebooks/`](../notebooks/) are written this way too.

## What is it?

A **Jupyter notebook** (`.ipynb` file) is a document that mixes Markdown explanations and runnable Python cells, with the output of each cell saved inline. You run cells one at a time, in any order, and the variables stay alive between them.

A notebook needs two things: a **kernel**, which is the Python process that runs the cells (we use the playground's `.venv/`), and a **front end** to edit and display it (we use VSCode).

## Why do we use it?

Notebooks are popular because:

- You can see code and its output side-by-side.
- You can re-run cells in any order while exploring, without re-running everything.
- They serve as both *runnable code* and *executable documentation*.

The alternative, a plain `.py` script, is better once the code is settled: easier to version, test and run on a server. We'll do exactly that transition in §7: explore in the shell, prototype in cells, package as a file.

## Install

Jupyter is a Python package, so it goes into the playground's environment with UV, like `requests` in §4:

```bash
cd ~/aisc/playground
uv add jupyter
```

`uv add` records `jupyter` in `pyproject.toml` and `uv.lock` and installs it, together with its kernel, into `.venv/`.

Then install the Microsoft **Jupyter** extension in VSCode (Extensions panel → search "Jupyter"). VSCode usually offers to do this on its own the first time you open a `.ipynb` file.

### Verify

```bash
uv run jupyter --version
```

Prints the versions of the Jupyter components that were installed.

## Try it

1. In VSCode, create a new file `hello.ipynb` in the playground (`File → New File → Jupyter Notebook`, or just name the file `hello.ipynb`).
2. VSCode asks which kernel to use. Pick the Python in `.venv/` (it shows up as `.venv (Python 3.11.x)`). If it isn't listed, click "Select Kernel" at the top right and choose "Python Environments".
3. Type into the first cell and run it with `Shift+Enter`:

   ```python
   name = "workshop"
   print(f"Hello, {name}!")
   ```

4. Add a second cell and run it. It can use `name` from the first cell, because the kernel keeps variables alive:

   ```python
   import requests
   print(name, requests.__version__)
   ```

5. Change the first cell, re-run only that one, and re-run the second. That out-of-order loop is the whole point of notebooks.

## VSCode integration

- The kernel picker at the top right of a notebook does the same job as the interpreter picker in §5: it decides which Python runs the cells. Always pick the project's `.venv/`.
- The "Variables" button in the notebook toolbar shows every variable the kernel currently holds.
- `Run All` at the top restarts a clean run from the first cell, which is the quickest way to check that a notebook still works from scratch.

## Going further

- [Project Jupyter](https://jupyter.org/), about notebooks
- [Jupyter notebooks in VSCode](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)
