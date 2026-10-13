# Chatbot demo

> **Section 9 / 9** · **~15 min** · *applies to: all participants*
>
> **Installs:** three Docker images (frontend, backend, Ollama) · **Creates:** `~/aisc/workshop-getting-started/` with its own `.venv/` · **Needs:** §3, §4, §7 (the model) and §8

The cherry on top: a small chatbot app that ties together everything you've installed. You'll run it end-to-end with a single command and see a React frontend talking to a FastAPI backend talking to Ollama.

## What is it?

The repository ships with three components:

- **[`01_frontend/`](../../01_frontend/)** — a React web UI for chatting.
- **[`02_backend/`](../../02_backend/)** — a FastAPI server that takes chat messages, forwards them to Ollama, and returns the model's reply.
- **[`docker-compose.yml`](../../docker-compose.yml)** — wires those two services together with their own Ollama container, which shares the model folder of the Ollama you installed in §7.

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
- `./run.sh` builds the frontend and backend images and starts them together with a Dockerised Ollama. That Ollama listens on port `11435`, so it does not collide with the native one from §7 on `11434`, and it mounts the model folder from §7 (see the tables there), so `llama3.2:1b` is **not** downloaded again. If you skipped §7, the first run downloads it now (~1.3 GB).

Once you see "All services ready!":

- Frontend: <http://localhost:3000>
- Backend API docs: <http://localhost:8000/docs>

### Verify

Open the frontend in your browser. Wait for the "Connected" indicator, then send a message — you should get a reply from the local model. Open the backend API docs to see the available endpoints.

## Try it

A few small experiments while everything's running:

1. **Watch the request roundtrip.** Open your browser's developer tools → Network tab, send a message, and find the request to `/chat`. You're seeing the same HTTP traffic the React frontend uses.
2. **Skip the frontend.** From the API docs page, expand `POST /chat`, click "Try it out", and send a message directly. Same backend, no React.
3. **Change the model.** Pull another model with your native Ollama, for example `ollama pull llama3.2:3b`. The container sees it immediately, because both share one model folder. Then edit `02_backend/main.py`, change `DEFAULT_MODEL`, restart the stack, send a new message.

## Stop it

In the terminal running `./run.sh`, press `Ctrl+C`. Or, in another terminal:

```bash
docker compose down
```

## Finished early?

The notebooks in [`03_workshop/notebooks/`](../notebooks/) of the repository you just cloned repeat the material in runnable form. Open them in VSCode from `~/aisc/workshop-getting-started/` and pick the repository's `.venv/` as the kernel (`uv sync` created it). Notebook 03 talks to your native Ollama from §7.

| Notebook | Covers |
|---|---|
| `00_overview.ipynb` | checks that the environment is complete |
| `01_uv_environment_management.ipynb` | `uv` commands, `pyproject.toml`, inspecting a venv |
| `02_jupyter_basics.ipynb` | cells, loops, writing your own functions |
| `03_ollama_and_llm_prompting.ipynb` | calling Ollama from Python, prompting |

## If `run.sh` fails

`run.sh` builds the frontend and backend images on your machine. If a build fails (npm errors, network issues, slow hardware), you can skip building and pull prebuilt images from the GitHub Container Registry instead. The images are multi-architecture, so they work on both Apple Silicon Macs and Windows/Linux.

Open [`docker-compose.yml`](../../docker-compose.yml). For the `frontend:` and `backend:` services, comment out the `build:` block (and the frontend's `volumes:` and `command:` blocks too), and add an `image:` line so the services look like this:

```yaml
  frontend:
    image: ghcr.io/aihpi/aisc-chatbot-frontend:latest
    ports:
      - "${BIND_HOST:-127.0.0.1}:3000:80"   # the prebuilt frontend serves on port 80
    environment:
      - VITE_BACKEND_URL=http://localhost:8000
    depends_on:
      - backend
    restart: unless-stopped

  backend:
    image: ghcr.io/aihpi/aisc-chatbot-backend:latest
    ports:
      - "${BIND_HOST:-127.0.0.1}:8000:8000"
    environment:
      - OLLAMA_URL=http://ollama:11434
    depends_on:
      - ollama
    restart: unless-stopped
```

Re-run `./run.sh`. Docker now pulls the ready-made frontend and backend instead of building them. Ollama is still pulled as before, and the app behaves the same at <http://localhost:3000>.

If Docker refuses to mount the model folder (Docker Desktop only shares some paths by default), set `OLLAMA_MODELS` in a `.env` file at the repository root to a folder it may share, for example `OLLAMA_MODELS=/home/you/.ollama/models`. The container then downloads the model into that folder.

## Outlook

This codebase is small enough to read in an evening. Some directions to explore from here:

- Replace the Ollama backend with a cloud API (OpenAI, Anthropic) and compare quality, latency, and cost.
- Replace the React frontend with a CLI, a Slack bot, a desktop app — the backend doesn't care.
- Try a larger Ollama model (`llama3.2:3b`, `qwen2.5:7b`, …) and feel the speed/quality trade-off.

That's it for the workshop. You now have everything you need to start building.

## Going further

- [FastAPI documentation](https://fastapi.tiangolo.com/)
- [React documentation](https://react.dev/)
- [Ollama API reference](https://docs.ollama.com/api/introduction)
