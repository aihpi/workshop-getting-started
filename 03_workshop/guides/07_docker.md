# Docker — containers

> **Section 7 / 8** · **~15 min** · *applies to: all participants*

Docker lets you bundle an application together with its dependencies into a single, portable artefact called a **container**. We'll use it in the next section to run the chatbot demo with one command.

## What is it?

A **container** is a lightweight, isolated environment that contains everything an application needs: the code, the runtime (Python, Node.js, …), system libraries, configuration. Two containers running on the same machine can use different Python versions, different system packages, even different Linux distributions, without colliding.

**Docker** is the most common tool for building, sharing, and running containers.

Two key concepts:

- **Image** — a frozen blueprint, built once, that can be run anywhere Docker is installed.
- **Container** — a running instance of an image. You can have many containers from the same image.

## Why do we use it?

The classic problem: "it works on my machine." Software depends on a specific OS, library versions, environment variables, and so on. Containers package all of that *with* the code, so the same image runs the same way on your laptop, a colleague's laptop, a CI server, and a production cluster.

Alternatives:

- **Run things directly on the host** — fine for one tool, painful when you want different versions of the same tool for different projects.
- **Virtual machines** — also isolate, but are heavier (full OS per VM) and slower to start.
- **Docker** — lightweight isolation that starts in seconds.

For this workshop, Docker is *not* strictly required to use any of the tools we've installed. We use it in section 8 to run the chatbot end-to-end (frontend + backend + Ollama) with a single command, instead of starting three services by hand.

## Install

We use **Docker Desktop**, which bundles the Docker Engine, CLI, and a small management UI: **<https://www.docker.com/products/docker-desktop/>**

<details>
<summary><strong>macOS</strong></summary>

Download the `.dmg` (choose Intel or Apple Silicon) and drag Docker into Applications. Launch it once to finish setup.
</details>

<details>
<summary><strong>Windows + WSL</strong></summary>

Download the Windows installer. During install, leave "Use WSL 2 instead of Hyper-V" enabled. After install, in *Docker Desktop → Settings → Resources → WSL Integration*, enable integration with your Ubuntu distribution.
</details>

<details>
<summary><strong>Linux</strong></summary>

You can install Docker Desktop, or just the open-source Docker Engine following the [official Linux instructions](https://docs.docker.com/engine/install/).
</details>

### Verify

```bash
docker --version
docker compose version
docker run hello-world
```

The third command pulls a tiny test image and runs it; you should see a "Hello from Docker!" message.

## Try it

Run a temporary Ubuntu container interactively:

```bash
docker run -it --rm ubuntu bash
```

You're now inside a fresh Ubuntu shell. Run `cat /etc/os-release` to confirm. Type `exit` to leave; the container disappears (`--rm`) and your machine is unchanged.

That's containers in one command: a clean Linux environment, started in seconds, gone the moment you're done.

## Compose: multi-service setups

`docker-compose.yml` describes several containers that work together. For the chatbot demo, that's the frontend, the backend, and Ollama. From the repo root:

```bash
docker compose up
```

…starts everything with one command. We'll do this in section 8.

## Outlook

Once you're comfortable with single containers, the next steps are:

- **Dockerfiles** — recipes for building your own images.
- **Container registries** (Docker Hub, GitHub Container Registry) — sharing images.
- **Kubernetes** — orchestrating many containers across many machines, the standard for production deployment.

## Going further

- [Docker getting started guide](https://docs.docker.com/get-started/)
- [Docker Compose reference](https://docs.docker.com/compose/)
- [Awesome Docker — curated resources](https://github.com/veggiemonk/awesome-docker)
