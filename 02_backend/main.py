"""
AISC Getting Started - Chatbot Backend API

A simple FastAPI backend that integrates with Ollama to provide
a chat interface for interacting with local language models.
"""

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import httpx
import os
from typing import List, Optional
import asyncio

# Initialize FastAPI app
app = FastAPI(
    title="AISC Chatbot API",
    description="A simple chatbot backend using Ollama for local LLM inference",
    version="1.0.0"
)

# CORS middleware to allow frontend connections
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configuration
OLLAMA_URL = os.getenv("OLLAMA_URL", "http://localhost:11435")
DEFAULT_MODEL = "llama3.2:1b"

# Pydantic models for request/response
class ChatMessage(BaseModel):
    role: str  # "user" or "assistant"
    content: str

class ChatRequest(BaseModel):
    message: str
    conversation_history: List[ChatMessage] = []

class ChatResponse(BaseModel):
    response: str
    model: str
    conversation_history: List[ChatMessage]

# Health check endpoint
@app.get("/")
async def root():
    """Root endpoint - API status check"""
    return {"message": "AISC Chatbot API is running!"}

@app.get("/health")
async def health_check():
    """Health check endpoint to verify API and Ollama connectivity"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{OLLAMA_URL}/api/tags")
            if response.status_code == 200:
                models = response.json().get("models", [])
                available_models = [model["name"] for model in models]
                return {
                    "status": "healthy",
                    "ollama_connected": True,
                    "available_models": available_models,
                    "default_model": DEFAULT_MODEL
                }
            else:
                return {
                    "status": "unhealthy",
                    "ollama_connected": False,
                    "error": f"Ollama responded with status {response.status_code}"
                }
    except Exception as e:
        return {
            "status": "unhealthy",
            "ollama_connected": False,
            "error": str(e)
        }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """
    Chat endpoint that sends messages to Ollama and returns responses
    """
    try:
        # Build the conversation context
        messages = [
            {
                "role": "system",
                "content": "You are Llama 3.2 1B, a language model by Meta, running locally via Ollama."
            }
        ]

        # Add conversation history
        for msg in request.conversation_history:
            messages.append({
                "role": msg.role,
                "content": msg.content
            })
        
        # Add the new user message
        messages.append({
            "role": "user",
            "content": request.message
        })
        
        # Prepare the request to Ollama
        ollama_request = {
            "model": DEFAULT_MODEL,
            "messages": messages,
            "stream": False
        }
        
        # Send request to Ollama
        async with httpx.AsyncClient(timeout=60.0) as client:
            response = await client.post(
                f"{OLLAMA_URL}/api/chat",
                json=ollama_request
            )
            
            if response.status_code != 200:
                raise HTTPException(
                    status_code=500, 
                    detail=f"Ollama API error: {response.status_code} - {response.text}"
                )
            
            ollama_response = response.json()
            assistant_message = ollama_response["message"]["content"]
            
            # Update conversation history
            updated_history = request.conversation_history.copy()
            updated_history.append(ChatMessage(role="user", content=request.message))
            updated_history.append(ChatMessage(role="assistant", content=assistant_message))
            
            return ChatResponse(
                response=assistant_message,
                model=DEFAULT_MODEL,
                conversation_history=updated_history
            )
            
    except httpx.TimeoutException:
        raise HTTPException(
            status_code=504,
            detail="Request to Ollama timed out. The model might be loading or busy."
        )
    except httpx.RequestError as e:
        raise HTTPException(
            status_code=503,
            detail=f"Could not connect to Ollama: {str(e)}"
        )
    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"Internal server error: {str(e)}"
        )

@app.get("/models")
async def get_available_models():
    """Get list of available models from Ollama"""
    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(f"{OLLAMA_URL}/api/tags")
            if response.status_code == 200:
                models = response.json().get("models", [])
                return {
                    "models": [model["name"] for model in models],
                    "default": DEFAULT_MODEL
                }
            else:
                raise HTTPException(
                    status_code=response.status_code,
                    detail="Failed to fetch models from Ollama"
                )
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Could not connect to Ollama: {str(e)}"
        )

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
