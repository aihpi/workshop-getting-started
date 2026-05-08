# Ollama — local LLMs

> **Section 6 / 8** · **~20 min** · *applies to: all participants*

Ollama lets you run large language models on your own machine.

## What is it?

Ollama is a local **model serving** tool: it downloads a language model to your laptop and exposes it through a simple HTTP API and a command-line interface. Think of it as a tiny self-hosted alternative to the OpenAI or Anthropic APIs, running on your own hardware.

It packages models in a Docker-like format ("model files"), uses GPU acceleration where available, and supports streaming responses.

<details>
<summary><strong>What does "model serving" mean?</strong></summary>

A model file (`.gguf`, `.safetensors`, …) is just data — billions of weights sitting on disk. To turn it into something you can talk to, you need a runtime that loads those weights into memory, tokenises your input into the numeric IDs the model understands, runs each forward pass through the neural network, samples a next token, and decodes everything back into text. Kept alive in a long-running process so you don't re-load the model from disk on every request, that loop is what people call **model serving**.

The runtime has to manage a lot:

- File format and quantisation (turning 16-bit weights into 4-bit so a 7B model fits on a laptop).
- Hardware acceleration (Metal on Apple Silicon, CUDA on NVIDIA, AVX on CPUs).
- KV cache so the model doesn't recompute the same prefix on every new token.
- Chat templates, stop sequences, sampling parameters.

You *could* assemble all of this yourself with PyTorch and Hugging Face's `transformers` library — many people do — but it's complex code and slow on CPU. **Ollama bundles all of it**: `llama.cpp` (a fast C++ engine for quantised models) wrapped in a daemon, a model registry (`ollama pull llama3.2:1b` instead of hunting GGUF files by hand), and a REST API on `localhost:11434` for any program to call.

A useful analogy: a model file is to a serving tool what an HTML file is to a web server. The HTML does nothing on its own; nginx or Apache loads it and answers HTTP requests. Same pattern here — Ollama (or vLLM, or llama.cpp directly) is the "web server" for your model file.

</details>

## Why do we use it?

When you want to use a language model in your code, you have several options. Each column is a different answer to "where does the model actually run when my code asks it for a response?":

| Axis | Cloud API | HF `transformers` | vLLM | Ollama |
|---|---|---|---|---|
| Model runs on | Provider's servers | Wherever you run Python | Your GPU server | Your laptop |
| Hardware needed | None (just internet) | Anything (slow on CPU) | NVIDIA GPU | Anything |
| Available models | Provider's catalog | Anything on HF Hub | Anything that fits in VRAM | Anything in Ollama library |
| Pay per request | Yes | No | No (pay for hardware) | No |
| Privacy | Your data → provider | Local | Local | Local |
| Setup effort | Low | High | High | Low |
| Best for | Production, frontier quality | Research, fine-tuning | High-concurrency hosting | Personal / workshop |

<details>
<summary><strong>More on each option</strong></summary>

### Cloud API (OpenAI, Anthropic, Google, …)

You don't run a model yourself. You make an HTTPS request to a service that runs the model on its own hardware and returns the response:

```python
client.chat.completions.create(model="gpt-5", messages=[...])
```

The provider charges **per token** (roughly per word) — typically a few dollars per million tokens.

- **Pros**: zero local setup; access to the biggest, best models. Frontier models (GPT-5, Claude 4.6 Opus, Gemini 2.5 Pro) are too big to run on consumer hardware — only available this way.
- **Cons**: bills scale with usage; your prompts go to a third party (privacy concern for sensitive data); needs an account and API key; depends on internet.

**When to pick it**: production apps where top-quality output justifies the per-token cost and sending data to the provider is acceptable.

### Hugging Face `transformers` directly

[Hugging Face](https://huggingface.co) hosts the largest catalog of open-weight models — think "GitHub for AI models," with hundreds of thousands of pretrained models to download. Their Python library, `transformers`, loads any of them directly into your code:

```python
from transformers import AutoModelForCausalLM, AutoTokenizer
model = AutoModelForCausalLM.from_pretrained("meta-llama/Llama-3.2-1B")
tokenizer = AutoTokenizer.from_pretrained("meta-llama/Llama-3.2-1B")
```

This is the lowest-level, most flexible way to use open-weight models. You're loading the actual neural network into PyTorch and writing the inference loop yourself.

- **Pros**: maximum control — fine-tune on your own data, modify internals, attach custom samplers, run experiments. This is what AI researchers use day to day.
- **Cons**: you write tokenisation, sampling, KV cache, batching yourself; slow on CPU (no `llama.cpp`-style optimisation); manages GPU memory naively.

**When to pick it**: research, fine-tuning, custom architectures, anything that touches the model's internals.

### vLLM

A GPU-based serving server, originally from UC Berkeley (the PagedAttention paper) and now widely used in production. You point it at an open-weight model, it loads the model into GPU VRAM, and serves many concurrent users by batching their requests together.

- **Pros**: very high throughput — a single GPU can answer dozens of requests in parallel through smart batching; OpenAI-compatible REST API by default (so client code doesn't change between OpenAI and vLLM); used by inference providers (Together.ai, Anyscale, …) and many internal company deployments.
- **Cons**: realistically requires an NVIDIA GPU; heavier setup than Ollama (CUDA, package install, model loading, GPU memory tuning); designed around many concurrent users, not laptop use.

**When to pick it**: hosting an LLM service for many concurrent users on your own (or rented) GPU hardware.

### Ollama

A local serving tool for individuals, built on top of `llama.cpp`. `ollama pull` and `ollama run` give you a fast C++ inference engine optimised for quantised models on consumer hardware, exposed via a REST API on `localhost:11434`.

- **Pros**: simple install; model registry replaces "hunt for the right GGUF file on Hugging Face"; quantisation packs e.g. a 1B model into ~1.3 GB so it fits in laptop RAM; works on Apple Silicon, Intel CPU, AMD GPU, NVIDIA GPU; same REST API regardless of which model is loaded.
- **Cons**: limited by your hardware (you can't run a 70B model on an 8 GB laptop); slower than vLLM on a real GPU; designed for one user, no batched concurrency; quality of small open-weight models is lower than frontier cloud models.

**When to pick it**: personal projects, prototyping, workshops, anything where you want an LLM running on your own machine.

### How they relate to each other

vLLM and Ollama sit at the *same layer* in the stack (model serving, REST API). They aren't alternatives to HF `transformers` — both are built on top of, or alongside, underlying inference engines (Ollama wraps `llama.cpp`; vLLM is its own Python+CUDA engine; HF `transformers` is a more general framework that doesn't ship a serving daemon at all). And none of these four are alternatives to LangChain — that sits *one layer up*, calling whichever of these you've picked.

```
LangChain / LlamaIndex    (orchestration)
        ↓
Cloud API  /  vLLM  /  Ollama  /  HF transformers   (this row)
        ↓
  llama.cpp / PyTorch / CUDA kernels   (inference engines)
        ↓
        Model weights on disk
```

</details>

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

We'll use Ollama in three increasingly substantial ways: first as a pure terminal tool, then from a Jupyter notebook in your playground, and finally as a small standalone Python script. Each stage builds on the previous one — together they form the loop you'll repeat for any LLM project: explore in the shell, prototype in cells, package as a file.

### Stage 1 — In the terminal

We'll use a small model, `llama3.2:1b` (~1.3 GB), so it works on most laptops. The first download takes a few minutes:

```bash
ollama pull llama3.2:1b
```

The Ollama CLI gives you a small set of subcommands to manage and use models — think "Docker for LLMs":

```bash
ollama list                  # which models do I have on disk?
ollama show llama3.2:1b      # parameter count, context window, defaults
ollama ps                    # which models are loaded in RAM right now?
ollama rm <model>            # delete a model from disk (when cleaning up)
```

Now chat with the model interactively:

```bash
ollama run llama3.2:1b
```

Try a few prompts at the `>>>` prompt — for example:

```
>>> What is the capital of France?
>>> Translate "good morning" into Italian.
>>> Are you familiar with the AI Service Center Berlin Brandenburg?
>>> What is your cutoff date?
>>> What model are you?
>>> /bye
```

`/bye` (or Ctrl+D) ends the session.

### Stage 2 — From a Jupyter notebook

The terminal is fine for ad-hoc questions, but to actually *build* something you'll call Ollama from your own code. We'll do that from a notebook in the playground we've been growing in §3 and §5.

Add Jupyter and `requests` to the playground's environment:

```bash
cd ~/aisc/playground
uv add jupyter requests
```

Create a new notebook (`File → New File → ollama_demo.ipynb` in VSCode). When VSCode asks which kernel to use, pick the one in `.venv/`.

**Cell 1 — your first call.** Send a single message and print the reply. No abstraction, just a literal HTTP POST:

```python
import requests

response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama3.2:1b",
        "messages": [{"role": "user", "content": "What is the capital of France?"}],
        "stream": False,
    },
)
print(response.json()["message"]["content"])
```

That's the whole API. Ollama exposes a REST endpoint on port `11434`; you POST a list of messages, you get back the model's reply. The same `messages` shape (`role` + `content`) is used by OpenAI, vLLM, Anthropic, and almost every other LLM API in 2026 — what you learn here transfers.

**Cell 2 — wrap it in a function with memory.** A list of past messages, kept outside the function, becomes the model's conversation history:

```python
history = [{"role": "system", "content": "You are a helpful assistant."}]

def chat(prompt: str) -> str:
    history.append({"role": "user", "content": prompt})
    response = requests.post(
        "http://localhost:11434/api/chat",
        json={"model": "llama3.2:1b", "messages": history, "stream": False},
    )
    reply = response.json()["message"]["content"]
    history.append({"role": "assistant", "content": reply})
    return reply

print(chat("Hi, my name is David."))
print(chat("What's my name?"))
```

The second call should return your name — the model is seeing the prior turn. Most chatbots' "memory" is just this: a list you keep adding to. The first message (the `system` one) sets the persona; change it to "You are a pirate." and re-run the cell to see the difference.

### Stage 3 — As a standalone script

Notebooks are great for exploring; scripts are what you ship. Open `~/aisc/playground/main.py` (created by `uv init` in §5) and replace its contents with a minimal Ollama call:

```python
# main.py — minimal Ollama chatbot
import requests

response = requests.post(
    "http://localhost:11434/api/chat",
    json={
        "model": "llama3.2:1b",
        "messages": [{"role": "user", "content": "What is the capital of France?"}],
        "stream": False,
    },
)
print(response.json()["message"]["content"])
```

Run it from the terminal:

```bash
uv run python main.py
```

You've now done the full loop: explored the model in the CLI, prototyped in cells, packaged the result as a script. The chatbot in §8 is the same idea — same `messages` shape, same `requests` call — wrapped in a FastAPI server with a React frontend in front of it.

## Outlook

You've now run an AI model on your own machine and called it from Python. Building a chatbot is mostly: this loop, plus a UI. **The chatbot in section 8 is one example of what comes next.**

Bigger models (`llama3.2:3b`, `qwen2.5:7b`, …) are pulled the same way — just slower and bigger. Browse the catalogue at **<https://ollama.com/library>**.

If you ever need to serve a model to many concurrent users (e.g., an internal company chatbot on a GPU server), the same model can be deployed via **vLLM** using its OpenAI-compatible API. 

Once you have a model serving locally and a basic application calling it (like the chatbot in section 8), frameworks like **LangChain** and **LlamaIndex** help with the orchestration *above* Ollama — prompt templates, chaining multiple LLM calls, retrieval-augmented generation (RAG) against a vector database, and agents that can call tools. The model still has to be served somewhere (Ollama, vLLM, or a cloud API); these frameworks just save you from rewriting orchestration glue for every project. The workshop's chatbot uses direct HTTP calls instead, to keep the pipeline visible — but LangChain or LlamaIndex are worth reaching for once you outgrow that.

## Going further

- [Ollama on GitHub](https://github.com/ollama/ollama)
- [Model library](https://ollama.com/library)
- [Ollama API reference](https://github.com/ollama/ollama/blob/main/docs/api.md)
