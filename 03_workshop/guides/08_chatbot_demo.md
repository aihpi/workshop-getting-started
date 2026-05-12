# Chatbot demo

> **Section 8 / 8** · **~15 min** · *applies to: all participants*

The cherry on top: a small chatbot app that ties together everything you've installed. You'll run it end-to-end with a single command and see a React frontend talking to a FastAPI backend talking to Ollama.

## What is it?

The repository ships with three components:

- **[`01_frontend/`](../../01_frontend/)** — a React web UI for chatting.
- **[`02_backend/`](../../02_backend/)** — a FastAPI server that takes chat messages, forwards them to Ollama, and returns the model's reply.
- **[`docker-compose.yml`](../../docker-compose.yml)** — wires those two services together with the Ollama service from section 6.

Together they form a minimal chat application running entirely on your laptop.

## Why are we showing this?

It's an *example*, not a learning goal. The point is to see what becomes possible once you have an editor, a Python environment, a model, and a way to package services. You don't need to understand the React or FastAPI code in depth — the structure is what matters.

If you want to build something similar later, this repository is a working starting point.

## Run it

The chatbot lives in this repository, which we haven't cloned yet — until now we've worked in `~/aisc/playground/`. Clone the repo into your `aisc/` workspace, sync its environment, and start the stack:

```bash
cd ~/aisc
git clone https://github.com/aihpi/workshop-getting-started.git
cd workshop-getting-started
uv sync
./run.sh
```

What just happened:

- `git clone` downloaded the chatbot repository alongside `playground/` in your workspace,  inside the `aisc`parent folder. Then enter it with `cd workshop-getting-started`. 
- `uv sync` rebuilt the project's Python environment from its `pyproject.toml` and `uv.lock` — exactly the same `.venv/` the original author had. This is the command you'll run for every UV-based project you ever clone.
- `./run.sh` starts the chatbot stack. The first run downloads the `llama3.2:1b` Ollama model (~1.3 GB) and launches the frontend, backend, and a Dockerised Ollama service together. Subsequent runs skip the download and start in seconds.

Once you see "All services ready!":

- Frontend: <http://localhost:3000>
- Backend API docs: <http://localhost:8000/docs>

### Verify

Open the frontend in your browser. Wait for the "Backend Connected" indicator, then send a message — you should get a reply from the local model. Open the backend API docs to see the available endpoints.

## Try it

A few small experiments while everything's running:

1. **Watch the request roundtrip.** Open your browser's developer tools → Network tab, send a message, and find the request to `/chat`. You're seeing the same HTTP traffic the React frontend uses.
2. **Skip the frontend.** From the API docs page, expand `POST /chat`, click "Try it out", and send a message directly. Same backend, no React.
3. **Change the model.** Edit `02_backend/main.py`, change `DEFAULT_MODEL` to another model you've pulled with Ollama, restart the stack, send a new message. (You may need `ollama pull <model>` first.)

## Stop it

In the terminal running `./run.sh`, press `Ctrl+C`. Or, in another terminal:

```bash
docker compose down
```

## Outlook

This codebase is small enough to read in an evening. Some directions to explore from here:

- Replace the Ollama backend with a cloud API (OpenAI, Anthropic) and compare quality, latency, and cost.
- Add conversation persistence (a database) so chats survive restarts.
- Replace the React frontend with a CLI, a Slack bot, a desktop app — the backend doesn't care.
- Try a larger Ollama model (`llama3.2:3b`, `qwen2.5:7b`, …) and feel the speed/quality trade-off.

That's it for the workshop. You now have everything you need to start building.

## Going further

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [React documentation](https://react.dev/)
- [Ollama API reference](https://docs.ollama.com/api/introduction)
