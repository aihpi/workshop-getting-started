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
- At least 10 GB of free disk space (for AI models: ~1.3 GB for Ollama's llama3.2:1b, plus Docker images and dependencies)

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
sudo apt remove python3.11 python3.11-venv python3.11-dev
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

Restart your terminal.

### Verification

```bash
uv --version
```

Should show UV version information.

---

## Step 6: Install Jupyter

We'll install Jupyter using UV to manage our notebook environment.

### Create Project Environment

In your project directory (`~/aisc/workshop-getting-started`):

```bash
cd ~/aisc/workshop-getting-started

# Create a virtual environment with Python 3.11
uv venv --python python3.11 .venv

# Activate the environment
source .venv/bin/activate

# Install Jupyter and project dependencies
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
   - **If VS Code does not find the interpreter automatically:**
     1. Press `Ctrl+Shift+P` to open the command palette
     2. Type "Python: Select Interpreter" and select it
     3. Click "Enter interpreter path..."
     4. Paste the following path and press Enter: `.venv/bin/python`
     5. Reload the VS Code window (`Ctrl+Shift+P` → "Developer: Reload Window")
4. Try running a cell in the notebook - if prompted, select "Python Environments" and choose the `.venv` interpreter

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

## Step 9: Test the Complete Setup

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

For more help, check the individual notebook tutorials or consult the documentation links in each section.
