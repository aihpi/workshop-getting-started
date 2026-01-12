<div style="background-color: #ffffff; color: #000000; padding: 10px;">
<div style="display: flex; justify-content: space-between; align-items: center; background-color: #ffffff; color: #000000; padding: 10px;">
    <img src="00_aisc/img/logo_aisc_150dpi.png" height="80" style="margin-right: auto;" alt="Logo of the AI Service Centre Berlin Brandenburg.">
    <img src="00_aisc/img/logo_bmftr_de.png" height="150" style="margin-left: auto;" alt="Logo of the German Federal Ministry of Research, Technology and Space: Gefördert vom Bundesministerium für Forschung, Technologie und Raumfahrt.">
</div>
<h1> Linux Setup Guide
</div>

This guide will help you set up a complete development environment on Linux (Ubuntu/Debian-based distributions). We'll install all the necessary tools for Python development, AI model integration, and containerisation.

## Prerequisites

- Ubuntu 20.04+ or similar Debian-based distribution
- Administrator access (sudo privileges)
- Stable internet connection
- At least 25 GB of free disk space (for AI models: ~1.3 GB for Ollama's llama3.2:1b, ~8 GB for vLLM's Qwen3-4B, plus Docker images and dependencies)
- **Optional**: NVIDIA GPU with CUDA support for GPU-accelerated vLLM inference (CPU mode available as fallback)

---

## Step 1: Update System and Install Visual Studio Code

Let's start by updating the system and installing VS Code.

### Update System

```bash
sudo apt update
```

### Install Visual Studio Code

```bash
# Install dependencies
sudo apt install -y wget gpg

# Check if Microsoft GPG key already exists
if [ ! -f /etc/apt/trusted.gpg.d/packages.microsoft.gpg ]; then
    # Add Microsoft GPG key and repository
    wget -qO- https://packages.microsoft.com/keys/microsoft.asc | gpg --dearmor > packages.microsoft.gpg
    sudo install -o root -g root -m 644 packages.microsoft.gpg /etc/apt/trusted.gpg.d/
    rm packages.microsoft.gpg
fi

# Add repository if it doesn't exist
if [ ! -f /etc/apt/sources.list.d/vscode.list ]; then
    sudo sh -c 'echo "deb [arch=amd64,arm64,armhf signed-by=/etc/apt/trusted.gpg.d/packages.microsoft.gpg] https://packages.microsoft.com/repos/code stable main" > /etc/apt/sources.list.d/vscode.list'
fi

# Install VS Code
sudo apt update
sudo apt install -y code
```

### Verification

```bash
code --version
```

Should show VS Code version information.

---

## Step 2: Set Up GitHub Account and Git

### Create GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click "Sign up" and create your account
3. Verify your email address

### Install Git (if not already installed)

```bash
sudo apt install -y git
```

### Configure Git

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Set Up SSH Keys for GitHub (Recommended)

For secure authentication with GitHub, setting up SSH keys is recommended:

```bash
# Generate SSH key (press Enter for default location, optionally set a passphrase)
ssh-keygen -t ed25519 -C "your.email@example.com"

# Start SSH agent and add your key
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519

# Display your public key to copy to GitHub
cat ~/.ssh/id_ed25519.pub
```

Copy the output and add it to your GitHub account:
1. Go to GitHub.com → Settings → SSH and GPG keys
2. Click "New SSH key"
3. Paste your public key

For detailed instructions, visit: [https://docs.github.com/en/authentication/connecting-to-github-with-ssh](https://docs.github.com/en/authentication/connecting-to-github-with-ssh)

### Verification

```bash
git --version
```

Should show Git version information.

---

## Step 3: Install Python 3.11

We'll install Python 3.11 alongside your existing Python installation, without replacing your system Python.

### Installation

```bash
# Add the deadsnakes PPA for Python 3.11
sudo apt install -y software-properties-common
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update

# Install Python 3.11 and related packages
sudo apt install -y python3.11 python3.11-venv python3.11-dev

# Create a convenient alias for Python 3.11 (optional)
echo 'alias python311="python3.11"' >> ~/.bashrc
source ~/.bashrc
```

**Note**: This installation keeps your existing Python versions intact. Python 3.11 will be available as `python3.11`, while your system Python remains as `python3`.

### Verification

```bash
python3.11 --version
python3 --version  # This should show your original Python version
```

The first command should show `Python 3.11.x`, and the second shows your original system Python version.

### Reverting to Original Python (if needed)

Your original Python installation remains unchanged. You can always use:
- `python3` for your original system Python
- `python3.11` for the newly installed Python 3.11

To remove Python 3.11 if needed:
```bash
sudo apt remove python3.11 python3.11-venv python3.11-pip python3.11-dev
```

---

## Step 4: Clone This Repository

### Clone the Repository

```bash
# Navigate to your home directory
cd ~

# Create an aisc workspace directory
mkdir aisc
cd aisc

# Clone the repository
git clone https://github.com/aihpi/workshop-getting-started.git
cd workshop-getting-started
```

### Open in VS Code

```bash
# Open the project in VS Code
code .
```

### Verification

VS Code should open with the project loaded.

---

## Step 5: Install UV Package Manager

UV is a fast Python package manager that we'll use for environment management.

### Installation

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

Restart your terminal or run:

```bash
source $HOME/.cargo/env
```

### Verification

```bash
uv --version
```

Should show UV version information.

---

## Step 6: Install Jupyter

We'll install Jupyter using UV to manage our notebook environment.

### Create Project Environment

## Install UV Python Environment Manager

In your project directory (`~/aisc/workshop-getting-started`):

```bash
# Create a virtual environment with Python 3.11
uv venv --python python3.11 .venv

# Activate the environment
source .venv/bin/activate

# Install Jupyter and project dependencies
cd 03_workshop
uv sync
```

### Verification

```bash
jupyter --version
```

Should show Jupyter version information.

### Test Jupyter in VS Code

1. In VS Code, open `03_workshop/00_overview.ipynb`
2. VS Code might prompt to install the Python extension - click "Install"
3. Select the Python interpreter from your virtual environment (should show `.venv` in the path)
4. Try running a cell in the notebook

---

## Step 7: Install Docker Desktop

For Linux, we'll install Docker Engine and Docker Compose.

### Install Docker Engine

```bash
# Remove old versions
sudo apt remove -y docker docker-engine docker.io containerd runc

# Install dependencies
sudo apt update
sudo apt install -y ca-certificates curl gnupg lsb-release

# Add Docker's official GPG key (only if not already present)
sudo mkdir -p /etc/apt/keyrings
if [ ! -f /etc/apt/keyrings/docker.gpg ]; then
    curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
fi

# Set up the repository (only if not already present)
if [ ! -f /etc/apt/sources.list.d/docker.list ]; then
    echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
fi

# Install Docker Engine
sudo apt update
sudo apt install -y docker-ce docker-ce-cli containerd.io docker-compose-plugin
```

### Configure Docker (Optional but Recommended)

Add your user to the docker group to run Docker without sudo:

```bash
sudo usermod -aG docker $USER
```

**Important**: Log out and log back in for this change to take effect, or run:

```bash
newgrp docker
```

### Start Docker Service

```bash
sudo systemctl start docker
sudo systemctl enable docker
```

### Verification

```bash
docker --version
docker compose version  # Note: it's "docker compose" not "docker-compose" in newer versions
```

Test Docker:

```bash
docker run hello-world
```

---

## Step 8: Install Ollama

Ollama provides local AI model hosting capabilities.

### Installation

```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### Start Ollama Service

```bash
# Start Ollama in the background
ollama serve &

# Wait a moment for the service to start
sleep 5

# Pull the llama3.2:1b model (small model for testing)
ollama pull llama3.2:1b
```

**Note**: The `ollama serve &` command starts Ollama as a background process in your current terminal. The `&` at the end runs it in the background, but it will occupy this terminal session. For subsequent commands, you may want to:
- Open a new terminal window/tab, OR
- Use `Ctrl+C` to stop the background process when you're done, OR
- Use `nohup ollama serve &` to run it completely detached from the terminal

### Verification

```bash
ollama list
```

Should show the `llama3.2:1b` model in the list.

Test the model:

```bash
ollama run llama3.2:1b "Hello, how are you?"
```

You should get a response from the AI model.

---

## Step 9: Install vLLM

vLLM is a high-performance inference engine for large language models. We'll install it for serving the Qwen3-4B model.

### Check for GPU Support

First, let's check if you have an NVIDIA GPU available:

```bash
# Check for NVIDIA GPU
nvidia-smi
```

If this command shows GPU information, you can use GPU-accelerated vLLM. If not, we'll install CPU-only mode.

### Installation (GPU Mode)

If you have an NVIDIA GPU with CUDA support:

```bash
# Ensure you're in the project directory with the virtual environment activated
cd ~/aisc/workshop-getting-started/03_workshop
source ../.venv/bin/activate

# Install vLLM with GPU support
uv pip install vllm
```

### Installation (CPU Mode - Experimental)

If you don't have a GPU or want to run in CPU-only mode:

```bash
# Ensure you're in the project directory with the virtual environment activated
cd ~/aisc/workshop-getting-started/03_workshop
source ../.venv/bin/activate

# Install vLLM in CPU-only mode (experimental)
VLLM_TARGET_DEVICE=cpu uv pip install vllm
```

> **Note**: CPU mode is experimental and significantly slower than GPU mode. It's suitable for testing and development but not recommended for production use.

### Download and Serve the Qwen3-4B Model

Start the vLLM server with the Qwen3-4B-Instruct model:

```bash
# Start vLLM server (this will download the model on first run, ~8 GB)
vllm serve Qwen/Qwen3-4B-Instruct-2507 --port 8080 &

# Wait for the server to start and model to load
sleep 30
```

> **Important**: The first time you run this, vLLM will download the Qwen3-4B-Instruct-2507 model from Hugging Face (~8 GB). This may take 10-30 minutes depending on your internet connection.

### Verification

Test the vLLM server:

```bash
curl http://localhost:8080/v1/models
```

You should see the Qwen model listed. Test a simple completion:

```bash
curl http://localhost:8080/v1/completions \
  -H "Content-Type: application/json" \
  -d '{
    "model": "Qwen/Qwen3-4B-Instruct-2507",
    "prompt": "Hello, how are you?",
    "max_tokens": 50
  }'
```

To stop the vLLM server:

```bash
pkill -f "vllm serve"
```

---

## Step 10: Install Qdrant

Qdrant is a vector database for similarity search and AI applications like RAG (Retrieval-Augmented Generation).

### Download Qdrant Binary

We'll install Qdrant from the official GitHub releases:

```bash
# Create a directory for Qdrant
mkdir -p ~/qdrant
cd ~/qdrant

# Download the latest Qdrant release (check https://github.com/qdrant/qdrant/releases for the latest version)
wget https://github.com/qdrant/qdrant/releases/download/v1.13.2/qdrant-x86_64-unknown-linux-musl.tar.gz

# Extract the archive
tar -xzf qdrant-x86_64-unknown-linux-musl.tar.gz

# Make it executable
chmod +x qdrant
```

### Start Qdrant Server

```bash
# Start Qdrant server
cd ~/qdrant
./qdrant &

# Wait for the server to start
sleep 5
```

Qdrant will start on port 6333 (REST API) and 6334 (gRPC).

### Install Qdrant Python Client

```bash
# Ensure you're in the project directory with the virtual environment activated
cd ~/aisc/workshop-getting-started/03_workshop
source ../.venv/bin/activate

# Install Qdrant client
uv pip install qdrant-client
```

### Verification

Test the Qdrant server:

```bash
curl http://localhost:6333/collections
```

You should see an empty collections list: `{"result":{"collections":[]},"status":"ok","time":...}`

To stop the Qdrant server:

```bash
pkill -f qdrant
```

---

## Step 11: Test the Complete Setup

Let's verify everything works together by running the example chatbot application.

### Run the Application

In your project directory:

```bash
# Make sure you're in the project root
cd ~/aisc/workshop-getting-started

# Start all services and download the AI model (first-time setup only)
./run.sh
```

**Important**: The first time you run this setup, the script will automatically download the AI model (`llama3.2:1b`, approximately 1.3GB). This is a one-time process that may take 5-15 minutes depending on your internet connection. The script will show progress as it downloads.

### Verification

1. Wait for the model download to complete (you'll see "All services ready!" message)
2. Open your web browser
3. Go to `http://localhost:3000` - you should see the chatbot frontend
4. Wait for the "Backend Connected" status
5. Try sending a message to test the complete setup (e.g., "What's the capital of France?")
6. Go to `http://localhost:8000/docs` - you should see the API documentation

**Note**: If you see "Backend Disconnected" or chat errors, ensure the model download completed successfully. You can check available models with `docker compose exec workshop-ollama ollama list`.

### Stop the Application

Press `Ctrl+C` in the terminal running `./run.sh`, or in a new terminal run:

```bash
docker compose down
```

---

## Congratulations!

You've successfully set up a complete development environment on Linux! You now have:

- ✅ Visual Studio Code
- ✅ GitHub account and Git configuration
- ✅ Python 3.11 with UV package management
- ✅ Jupyter notebook environment
- ✅ Docker Engine and Compose
- ✅ Ollama AI model server
- ✅ vLLM inference engine with Qwen3-4B model
- ✅ Qdrant vector database
- ✅ A working chatbot application

## Next Steps

Continue with the learning notebooks in the `03_workshop` directory:

1. Start with [00_overview.ipynb](03_workshop/00_overview.ipynb)
2. Progress through the numbered notebooks
3. Experiment with the example chatbot application
4. Try cloning and working with other [repositories](https://github.com/aihpi)

## Troubleshooting

### Common Issues

**Permission denied when running Docker**: Make sure you've added your user to the docker group and logged out/in again.

**Python 3.11 installation fails**: Ensure you've added the deadsnakes PPA correctly and updated your package list.

**VS Code won't start**: Try running `sudo apt install --fix-broken` to fix any broken packages.

**Ollama model download is slow**: The initial model download can take time depending on your internet connection.

**VS Code can't find Python interpreter**: Ensure you've activated your virtual environment and selected the correct interpreter in VS Code.

**Docker compose command not found**: Use `docker compose` (with space) instead of `docker-compose` for newer Docker installations.

**Backend shows "Disconnected" in frontend**: Wait for the Ollama model download to complete. On first startup, this can take 5-15 minutes. Check progress with `docker compose logs -f ollama`.

**Model download is slow or fails**: The llama3.2:1b model is approximately 1.3GB. Ensure you have a stable internet connection and sufficient disk space. If the download fails, restart with `docker compose down && docker compose up -d`.

**Chat returns "Sorry, I encountered an error"**: This usually means the AI model is not yet downloaded or loaded. Wait for the model download to complete and try again.

**vLLM installation fails**: Ensure you have Python 3.10+ and sufficient disk space (~8 GB for the model). For GPU mode, verify CUDA is properly installed with `nvidia-smi`.

**vLLM runs out of memory**: The Qwen3-4B model requires significant RAM/VRAM. Try reducing `--max-model-len` or use a smaller model.

**Qdrant won't start**: Check if port 6333 is already in use: `lsof -i :6333`. Kill any conflicting process or use a different port with `--port`.

For more help, check the individual notebook tutorials or consult the documentation links in each section.
