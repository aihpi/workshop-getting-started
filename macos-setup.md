<div style="background-color: #ffffff; color: #000000; padding: 10px;">
<div style="display: flex; justify-content: space-between; align-items: center; background-color: #ffffff; color: #000000; padding: 10px;">
    <img src="00_aisc/img/logo_aisc_150dpi.png" height="80" style="margin-right: auto;" alt="Logo of the AI Service Centre Berlin Brandenburg.">
    <img src="00_aisc/img/logo_bmftr_de.png" height="150" style="margin-left: auto;" alt="Logo of the German Federal Ministry of Research, Technology and Space: Gefördert vom Bundesministerium für Forschung, Technologie und Raumfahrt.">
</div>
<h1> macOS Setup Guide
</div>

This guide will help you set up a complete development environment on macOS. We'll install all the necessary tools for Python development, AI model integration, and containerisation.

## Prerequisites

- macOS 10.15 (Catalina) or later
- Administrator access to your computer
- Stable internet connection

---

## Step 1: Install Visual Studio Code

Visual Studio Code is our recommended code editor with excellent support for Python, Jupyter notebooks, and development workflows.

### Installation

1. Go to [https://code.visualstudio.com/](https://code.visualstudio.com/)
2. Click "Download for Mac"
3. Open the downloaded `.zip` file
4. Drag `Visual Studio Code` to your `Applications` folder
5. Launch VS Code from Applications

### Verification

Open Terminal (`Cmd + Space`, type "Terminal", press Enter) and run:

```bash
code --version
```

If the command is not found, open VS Code, press `Cmd + Shift + P`, type "Shell Command: Install 'code' command in PATH", and select it.

---

## Step 2: Install Homebrew (Package Manager)

Homebrew is the missing package manager for macOS that we'll use to install development tools.

### Installation

Open Terminal and run:

```bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

Follow the on-screen instructions. You may need to add Homebrew to your PATH:

```bash
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> ~/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

### Verification

```bash
brew --version
```

Should show Homebrew version information.

---

## Step 3: Set Up GitHub Account and Git

### Create GitHub Account

1. Go to [https://github.com](https://github.com)
2. Click "Sign up" and create your account
3. Verify your email address

### Install Git

```bash
brew install git
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

## Step 4: Install Python 3.11

We'll install Python 3.11 alongside your existing Python installation using Homebrew.

### Installation

```bash
# Install Python 3.11 (this will not interfere with system Python)
brew install python@3.11
```

**Note**: Homebrew installs Python 3.11 alongside your system Python without replacing it. Your system Python remains accessible as `python3`, while the new installation is available as `python3.11`.

### Verification

```bash
python3.11 --version  # Should show Python 3.11.x
python3 --version     # Shows your system Python version
```

### Using Python 3.11

To use Python 3.11 specifically:
- Use `python3.11` command directly
- Or create an alias: `alias python311="python3.11"`
- UV will automatically find and use Python 3.11 when specified

### Reverting (if needed)

To remove Python 3.11 if no longer needed:
```bash
brew uninstall python@3.11
```

Your system Python will remain unaffected.

---

## Step 5: Clone This Repository

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

## Step 6: Install UV Package Manager

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

## Step 7: Install Jupyter

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

## Step 8: Install Docker Desktop

Docker Desktop provides containerisation capabilities for macOS.

### Installation

1. Go to [https://www.docker.com/products/docker-desktop/](https://www.docker.com/products/docker-desktop/)
2. Download Docker Desktop for Mac (choose the version for your chip: Intel or Apple Silicon)
3. Open the downloaded `.dmg` file
4. Drag Docker to your Applications folder
5. Launch Docker Desktop from Applications
6. Follow the setup wizard

### Verification

In Terminal:

```bash
docker --version
docker compose version
```

Both should show version information.

---

## Step 9: Install Ollama


Let's verify everything works together by running the example chatbot application.

### Run the Application

In your project directory:

```bash
# Make sure you're in the project root
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

```bash
ollama run llama3.2:1b "Hello, how are you?"
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

You've successfully set up a complete development environment on macOS! You now have:

- ✅ Visual Studio Code
- ✅ Homebrew package manager
- ✅ GitHub account and Git configuration
- ✅ Python 3.11 with UV package management
- ✅ Jupyter notebook environment
- ✅ Docker Desktop
- ✅ Ollama AI model server
- ✅ A working chatbot application

## Next Steps

Continue with the learning notebooks in the `03_workshop` directory:

1. Start with [00_overview.ipynb](03_workshop/00_overview.ipynb)
2. Progress through the numbered notebooks
3. Experiment with the example chatbot application
4. Try cloning and working with other repositories

## Troubleshooting

### Common Issues

**Homebrew installation fails**: Ensure you have Xcode Command Line Tools installed: `xcode-select --install`

**Python command not found**: Make sure you've added Python to your PATH and restarted your terminal.

**Docker commands fail**: Make sure Docker Desktop is running.

**Ollama model download is slow**: The initial model download can take time depending on your internet connection.

**VS Code can't find Python interpreter**: Ensure you've activated your virtual environment and selected the correct interpreter in VS Code.

**Permission denied errors**: You might need to use `sudo` for some installations, but try without it first.

**Backend shows "Disconnected" in frontend**: Wait 1-2 minutes for Ollama to fully start and download the model. Check progress with `docker compose logs ollama`.

For more help, check the individual notebook tutorials or consult the documentation links in each section.
