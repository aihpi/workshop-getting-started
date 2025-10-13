<div style="background-color: #ffffff; color: #000000; padding: 10px;">
<img src="00_aisc\img\logo_aisc_bmftr.jpg">
<h1>AI for Everybody - Getting Started
</div>

This repository provides a comprehensive getting started guide for people new to development workflows. Learn how to set up your development environment, work with Python virtual environments, Docker containers, and AI tools like Ollama - all from scratch!

## Workshop Context

This repository introduces the essential development tools and workflows used in workshops offered by the **AI Service Centre Berlin Brandenburg**. Workshop participants should complete the installation process before attending workshops. The installation can be completed within one hour. Because the installation process involves downloading multiple GB of software, slow internet connections can lead to longer installation times.

**Need assistance?** If you encounter any issues during installation, please contact us at **kisz@hpi.de** for technical support.

## What You'll Learn

- **Development Environment Setup**: Install and configure VS Code, Git, and Python
- **Python Environment Management**: Master UV for creating and managing virtual environments
- **Jupyter Notebooks**: Learn to use Jupyter for interactive development
- **Docker Containers**: Build and run applications in containerised environments
- **AI/LLM Integration**: Set up and use Ollama for local language model development
- **Real-world Application**: Build a simple chatbot that uses local AI models

## Who This Guide Is For

This guide is designed for people who have basic computer skills but may be new to:
- Command line/terminal usage
- Programming environments and package management
- Docker and containerisation
- AI/ML development workflows

## Getting Started

Choose your operating system to begin the setup process:

### Setup Guides by Operating System

- **[Windows Setup Guide](windows-setup.md)** - Complete setup including WSL installation
- **[macOS Setup Guide](macos-setup.md)** - Native macOS development environment
- **[Linux Setup Guide](linux-setup.md)** - For Ubuntu/Debian-based distributions

### Quick Overview

1. **Install VS Code** - Your development environment
2. **Set up GitHub** - Version control and repository access
3. **Clone this repository** - Get the learning materials
4. **Install Python 3.11** - Programming language (WSL for Windows users)
5. **Install UV** - Python environment management
6. **Install Jupyter** - Interactive notebook environment
7. **Install Docker Desktop** - Containerisation platform
8. **Install Ollama** - Local AI model server
9. **Run the example application** - Test your complete setup

## Learning Path

After completing the setup, follow these hands-on tutorials in order:

1. **[Overview](03_workshop/00_overview.ipynb)** - Understanding the learning structure
2. **[UV Environment Management](03_workshop/01_uv_environment_management.ipynb)** - Master Python virtual environments
3. **[Jupyter Basics](03_workshop/02_jupyter_basics.ipynb)** - Interactive development with notebooks
4. **[Ollama and LLM Prompting](03_workshop/03_ollama_and_llm_prompting.ipynb)** - AI model integration

## Example Application

This repository includes a complete chatbot application that demonstrates all the technologies you'll learn:

- **Frontend**: React-based chat interface (`01_frontend/`)
- **Backend**: FastAPI server with Ollama integration (`02_backend/`)
- **Deployment**: Docker Compose setup for easy deployment

### Running the Application

After completing the setup guide for your operating system:

```bash
# Start the complete application stack
docker-compose up -d

# Access the chatbot
# Frontend: http://localhost:3000
# Backend API: http://localhost:8000
```

## Verification

Each setup step includes verification commands to ensure everything is working correctly. The final verification is running the example chatbot application.

## Repository Structure

```
workshop-getting-started/
├── README.md                # This file
├── windows-setup.md         # Windows setup guide
├── macos-setup.md           # macOS setup guide  
├── linux-setup.md           # Linux setup guide
├── docker-compose.yml       # Application deployment
├── 00_aisc/                 # AISC branding assets
├── 01_frontend/             # React chatbot frontend
├── 02_backend/              # FastAPI backend
└── 03_workshop/             # Learning notebooks
```


## References

- [AI Service Center Berlin Brandenburg](https://hpi.de/kisz)

## Author
- [Hanno Müller](https://github.com/hanno-mueller-HPI)

## License

This project is licensed under the MIT License - see the LICENSE file for details.


---

## Acknowledgements
<img src="00_aisc/img/logo_bmftr_de.png" alt="drawing" style="width:170px;"/>

The [AI Service Centre Berlin Brandenburg](http://hpi.de/kisz) is funded by the [Federal Ministry of Research, Technology and Space](https://www.bmbf.de/) under the funding code 01IS22092.
