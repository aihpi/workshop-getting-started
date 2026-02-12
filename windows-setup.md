<div style="background-color: #ffffff; color: #000000; padding: 10px;">
<div style="display: flex; justify-content: space-between; align-items: center; background-color: #ffffff; color: #000000; padding: 10px;">
    <img src="00_aisc/img/logo_aisc_150dpi.png" height="80" style="margin-right: auto;" alt="Logo of the AI Service Centre Berlin Brandenburg.">
    <img src="00_aisc/img/logo_bmftr_de.png" height="150" style="margin-left: auto;" alt="Logo of the German Federal Ministry of Research, Technology and Space: Gefördert vom Bundesministerium für Forschung, Technologie und Raumfahrt.">
</div>
<h1> Windows Setup Guide
</div>

This guide will help you set up a complete development environment on Windows. We'll be using Windows Subsystem for Linux (WSL) to provide a Linux environment for development.

## Prerequisites

- Windows 10 version 2004 and higher (Build 19041 and higher) or Windows 11
- Administrator access to your computer
- At least 10 GB of free disk space (for AI models: ~1.3 GB for Ollama's llama3.2:1b, plus Docker images and dependencies)

---

## Step 1: Install Visual Studio Code

Visual Studio Code is our recommended code editor with excellent support for Python, Jupyter notebooks, and WSL.

### Installation

1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Click "Download for Windows"
3. Run the downloaded installer
4. During installation, make sure to check:
   - "Add to PATH"
   - "Register Code as an editor for supported file types"
   - "Add 'Open with Code' action to Windows Explorer file context menu"
   - "Add 'Open with Code' action to Windows Explorer directory context menu"

### Verification

Open Command Prompt (`Windows + R`, type `cmd`, press Enter) and run:

```cmd
code --version
```

You should see version information displayed.

---

## Step 2: Set Up GitHub Account and Git

### Create GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click "Sign up" and create your account
3. Verify your email address

### Install Git for Windows

1. Go to [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Download and run the installer
3. Use default settings (recommended)

### Verification

Open Command Prompt and run:

```cmd
git --version
```

You should see Git version information.

---

## Step 3: Install WSL and Ubuntu

Windows Subsystem for Linux provides a Linux environment directly on Windows.

### Install WSL

1. Open PowerShell as Administrator (`Windows + X`, select "Windows PowerShell (Admin)")
2. Run the following command:

```powershell
wsl --install
```

3. Restart your computer when prompted

### Install Ubuntu

After restart:

1. Open Microsoft Store
2. Search for "Ubuntu 22.04.3 LTS"
3. Click "Install"
4. Once installed, launch Ubuntu from the Start menu
5. Create a username and password when prompted (remember these!)

### Verification

In Ubuntu terminal, run:

```bash
lsb_release -a
```

You should see Ubuntu version information.

---

## Step 4: Install Python 3.11 in WSL

We'll install Python 3.11 alongside your existing Python installation, without replacing your system Python.

### Update System

In your Ubuntu terminal:

```bash
sudo apt update
```

### Install Python 3.11

```bash
# Add the deadsnakes PPA for Python 3.11
sudo apt install software-properties-common -y
sudo add-apt-repository ppa:deadsnakes/ppa -y
sudo apt update

# Install Python 3.11 and related packages
sudo apt install python3.11 python3.11-venv python3.11-dev -y

# Create a convenient alias for Python 3.11 (optional)
echo 'alias python311="python3.11"' >> ~/.bashrc
source ~/.bashrc
```

**Note**: This installation keeps your existing Python versions intact. Python 3.11 will be available as `python3.11`, while your system Python remains as `python3`.

### Verification

```bash
python3.11 --version  # Should show Python 3.11.x
python3 --version     # Shows your original system Python version
```

### Reverting to Original Python (if needed)

Your original Python installation remains unchanged. You can always use:
- `python3` for your original system Python
- `python3.11` for the newly installed Python 3.11

To remove Python 3.11 if needed:
```bash
sudo apt remove python3.11 python3.11-venv python3.11-dev
```

---

## Step 5: Clone This Repository

### Verify Git (in WSL)

In your Ubuntu terminal, check if Git is available:

```bash
git --version
```

If you see version information, Git is already installed. If you get "command not found", install it:

```bash
sudo apt install -y git
```

### Configure Git (in WSL)

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
# Install the WSL extension for VS Code (run this once)
code --install-extension ms-vscode-remote.remote-wsl

# Open the project in VS Code
code .
```

VS Code should open with the project loaded. You might see a notification about "WSL" - click "Reopen in WSL" if prompted.

### Verification

You should see the project files in VS Code, and the bottom-left corner should show "WSL: Ubuntu-22.04".

---

## Step 6: Install UV Package Manager

UV is a fast Python package manager that we'll use for environment management.

### Install UV

In your WSL terminal:

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

## Step 7: Install Jupyter

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

## Step 8: Install Docker Desktop

Docker Desktop provides containerisation capabilities for Windows with WSL integration.

### Installation

1. Go to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Download Docker Desktop for Windows
3. Run the installer
4. During installation, ensure "Use WSL 2 instead of Hyper-V" is selected
5. Restart your computer when prompted

### Configure Docker

1. Launch Docker Desktop
2. Go to Settings → General
3. Ensure "Use the WSL 2 based engine" is checked (if it fails, install docker-compose)
4. Go to Settings → Resources → WSL Integration
5. Enable integration with Ubuntu

### Verification

In your WSL terminal:

```bash
docker --version
docker compose version
```

Both should show version information.

---

## Step 9: Install Ollama


Let's verify everything works together by running the example chatbot application.

### Run the Application

In your project directory (in WSL):

```bash
# Make sure you're in the project root
# Start all services and download the AI model (first-time setup only)
./run.sh
```

**Important**: The first time you run this setup, the script will automatically download the AI model (`llama3.2:1b`, approximately 1.3GB). This is a one-time process that may take 5-15 minutes depending on your internet connection. The script will show progress as it downloads.

### Verification

1. Wait for the model download to complete (you'll see "All services ready!" message)
2. Open your web browser (in Windows)
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

You should get a response from the AI model.

---

## Step 10: Test the Complete Setup

Let's verify everything works together by running the example chatbot application.

### Run the Application

In your project directory:

```bash
# Make sure you're in the project root
cd ~/aisc/workshop-getting-started

# Start all services with Docker Compose
docker compose up -d
```

### Verification

1. Open your web browser
2. Go to `http://localhost:3000` - you should see the chatbot frontend
3. Wait for the "Backend Connected" status (it may take 1-2 minutes for Ollama to fully start)
4. Try sending a message to test the complete setup
5. Go to `http://localhost:8000/docs` - you should see the API documentation

**Note**: If you see "Backend Disconnected", wait a few minutes for the Ollama service to fully start up and download the model. You can check the logs with `docker compose logs ollama` to monitor the progress.

### Stop the Application

```bash
docker compose down
```

---

## Congratulations!

You've successfully set up a complete development environment on Windows! You now have:

- ✅ Visual Studio Code with WSL integration
- ✅ GitHub account and Git configuration
- ✅ Ubuntu Linux environment via WSL
- ✅ Python 3.11 with UV package management
- ✅ Jupyter notebook environment
- ✅ Docker Desktop with WSL integration
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

**WSL Ubuntu won't start**: Ensure virtualisation is enabled in your BIOS settings.

**Docker commands fail**: Make sure Docker Desktop is running and WSL integration is enabled.

**Ollama model download is slow**: The initial model download can take time depending on your internet connection.

**VS Code can't find Python interpreter**: Ensure you've activated your virtual environment and selected the correct interpreter in VS Code.

**Backend shows "Disconnected" in frontend**: Wait 1-2 minutes for Ollama to fully start and download the model. Check progress with `docker compose logs ollama`.

For more help, check the individual notebook tutorials or consult the documentation links in each section.
