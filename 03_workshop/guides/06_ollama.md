# Ollama — local LLMs

> **Section 6 / 8** · **~15 min** · *applies to: all participants*

Ollama lets you run large language models on your own machine — no API key, no cloud, no per-request costs.

## What is it?

Ollama is a local **model serving** tool: it downloads a language model to your laptop and exposes it through a simple HTTP API and a command-line interface. Think of it as a tiny self-hosted alternative to the OpenAI or Anthropic APIs, running on your own hardware.

It packages models in a Docker-like format ("model files"), uses GPU acceleration where available, and supports streaming responses.

## Why do we use it?

When you want to use a language model in your code, you have several options:

| Option | Pros | Cons |
|---|---|---|
| **Cloud API** (OpenAI, Anthropic, …) | Best quality, no local setup | Costs money, sends your data, needs an account |
| **Hugging Face transformers** directly | Maximum control | You manage tokenizers, batching, GPU memory yourself |
| **Ollama** | One-line install, one-line `run`, REST API for free | Limited to models that fit on your hardware |

For a getting-started workshop Ollama is ideal: no payment, no account, no quotas, fully offline once the model is downloaded, and the same REST API works regardless of which model you load.

## Install

Official site: **<https://ollama.com/download>**

<details>
<summary><strong>macOS</strong></summary>

Download and run the macOS installer from the link above. (You can also `brew install ollama`, but the GUI installer adds a status-bar icon.)
</details>

<details>
<summary><strong>Linux / WSL</strong></summary>

```bash
curl -fsSL https://ollama.com/install.sh | sh
```
</details>

<details>
<summary><strong>Windows (native)</strong></summary>

Either install the Windows version from the link above, or use the Linux installer inside WSL.
</details>

### Verify

```bash
ollama --version
```

## Try it

We'll use a small model — `llama3.2:1b`, about 1.3 GB — so it works on most laptops. First-time download takes a few minutes:

```bash
ollama pull llama3.2:1b
ollama run llama3.2:1b
```

You'll get a chat prompt. Try:

```
>>> What is the capital of France?
```

Type `/bye` to exit.

### From code

The same model is reachable over HTTP at `http://localhost:11434`. From Python:

```python
import requests

r = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama3.2:1b",
        "messages": [{"role": "user", "content": "Say hi in one word."}],
        "stream": False,
    },
)
print(r.json()["message"]["content"])
```

This is exactly how the chatbot backend in section 8 talks to Ollama.

## Outlook

You've now run an AI model on your own machine and called it from Python. Building a chatbot, a search engine, or a code assistant is mostly: this loop, plus a UI. **The chatbot in section 8 is one example of what comes next.**

Bigger models (`llama3.2:3b`, `qwen2.5:7b`, …) are pulled the same way — just slower and bigger. Browse the catalogue at **<https://ollama.com/library>**.

## Going further

- [Ollama on GitHub](https://github.com/ollama/ollama)
- [Model library](https://ollama.com/library)
- [Ollama API reference](https://github.com/ollama/ollama/blob/main/docs/api.md)
