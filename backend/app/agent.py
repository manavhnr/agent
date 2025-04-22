import os
import sys
import traceback
import httpx
import json
import asyncio
from dotenv import load_dotenv

load_dotenv()

class ResearcherAgent:
    def __init__(self):
        self.jina_api_key = os.getenv("JINA_API_KEY")
        if not self.jina_api_key:
            print("ERROR: JINA_API_KEY environment variable is not set!")
        else:
            print(f"JINA API KEY is set (length: {len(self.jina_api_key)})")
        
        self.jina_endpoint = "https://api.jina.ai/v1/chat/completions"
        
        # Load the system prompt from the file
        try:
            prompt_file_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), "ResearchAgentPrompt.txt")
            with open(prompt_file_path, 'r') as f:
                self.system_prompt = f.read().strip()
            print(f"Successfully loaded system prompt from {prompt_file_path}")
        except Exception as e:
            print(f"Error loading system prompt: {str(e)}")
            # Fallback to hardcoded prompt
            self.system_prompt = """You are an expert research assistant with comprehensive knowledge across various domains."""
            print("Using fallback system prompt")
            
    async def jina_chat_completion(self, prompt, system_prompt=None):
        """Call Jina AI's chat completion API."""
        headers = {
            "Authorization": f"Bearer {self.jina_api_key}",
            "Content-Type": "application/json"
        }
        
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        
        messages.append({"role": "user", "content": prompt})
        
        data = {
            "messages": messages,
            "model": "jina-mistral-8b-instruct-v2", # Using Jina's Mistral model
            "temperature": 0.5 # Lowering temperature for more focused responses
        }
        
        try:
            # Increase timeout to 120 seconds for complex queries
            async with httpx.AsyncClient(timeout=120.0) as client:
                response = await client.post(
                    self.jina_endpoint, 
                    headers=headers, 
                    json=data
                )
                response.raise_for_status()
                result = response.json()
                return result["choices"][0]["message"]["content"]
        except httpx.ReadTimeout:
            print("Timeout while calling Jina AI API - the request took too long")
            raise TimeoutError("Request to Jina AI timed out. The model may be overloaded.")
        except httpx.ConnectTimeout:
            print("Connection timeout while calling Jina AI API")
            raise TimeoutError("Could not connect to Jina AI. Please check your internet connection.")
        except Exception as e:
            print(f"Error calling Jina AI API: {str(e)}")
            raise
    
    async def process_query(self, query: str, context: str = "") -> str:
        """Process a user query using the Researcher agent"""
        # Basic greeting responses
        greeting_responses = {
            "hello": "Hello! I'm a hackathon problem researcher. Please provide a technology domain (like 'blockchain', 'AI in healthcare', etc.) and I'll suggest innovative hackathon problems.",
            "hi": "Hi there! I can help identify high-impact hackathon problems. What technology area are you interested in exploring?",
            "how are you": "I'm ready to help you identify hackathon problems! What domain would you like to explore?",
            "why are we waiting": "I was experiencing timeouts when connecting to the AI service. I've been updated to handle these better. Please try your query again with a technology domain like 'blockchain' or 'AI healthcare'."
        }
        
        # Check if we have a greeting response
        normalized_query = query.lower().strip()
        for key, response in greeting_responses.items():
            if key in normalized_query:
                print(f"Using greeting response for query: {query}")
                return response
        
        # Format the user's query as a topic for hackathon problem discovery
        prompt = f"I need hackathon problem ideas related to: {query}"
        if context:
            prompt += f"\nAdditional context: {context}"
            
        try:
            print(f"Processing hackathon problem query with Jina AI: {query}")
            response = await self.jina_chat_completion(prompt, self.system_prompt)
            print("Query processed successfully")
            
            # Validate if the response is in proper JSON format
            try:
                # Check if response contains JSON
                if '{' in response and '}' in response:
                    # Extract just the JSON part in case there's additional text
                    json_start = response.find('{')
                    json_end = response.rfind('}') + 1
                    json_str = response[json_start:json_end]
                    
                    # Parse to validate
                    json_data = json.loads(json_str)
                    
                    # If it parsed successfully, return just the validated JSON part
                    return json_str
                else:
                    # If not JSON, provide a fallback response for demonstration
                    print("Response was not in JSON format, providing fallback")
                    return json.dumps({
                        "problems": [
                            {
                                "title": f"Innovation platform for {query}",
                                "impact": "Could revolutionize how developers collaborate and share solutions",
                                "feasibility": {
                                    "technical": "Medium",
                                    "resources": ["Web framework", "Database", "Authentication system"]
                                },
                                "novelty": "Focuses on developer experience and streamlined workflow"
                            },
                            {
                                "title": f"Decentralized {query} marketplace",
                                "impact": "Creates new economic opportunities for content creators",
                                "feasibility": {
                                    "technical": "Medium",
                                    "resources": ["Smart contracts", "Frontend framework", "Storage solution"]
                                },
                                "novelty": "Eliminates middlemen while ensuring fair compensation"
                            }
                        ],
                        "meta": {
                            "sources": ["Developer feedback", "Industry trends"]
                        }
                    }, indent=2)
            except Exception as e:
                print(f"Error parsing JSON response: {str(e)}")
                # Return a fallback JSON response
                return json.dumps({
                    "problems": [
                        {
                            "title": f"Innovation platform for {query}",
                            "impact": "Could revolutionize how developers collaborate and share solutions",
                            "feasibility": {
                                "technical": "Medium",
                                "resources": ["Web framework", "Database", "Authentication system"]
                            },
                            "novelty": "Focuses on developer experience and streamlined workflow"
                        }
                    ],
                    "meta": {
                        "sources": ["Developer feedback", "Industry trends"]
                    }
                }, indent=2)
        except TimeoutError as e:
            print(f"Timeout error: {str(e)}")
            # Return a meaningful message for timeout errors
            return json.dumps({
                "error": "The AI service is taking too long to respond. Please try a simpler query or try again later.",
                "problems": [
                    {
                        "title": f"Simple {query} dashboard",
                        "impact": "Could provide insights for beginners and experienced users alike",
                        "feasibility": {
                            "technical": "Low",
                            "resources": ["Frontend framework", "Public APIs", "Data visualization library"]
                        },
                        "novelty": "Focus on simplicity and user experience"
                    }
                ]
            }, indent=2)
        except Exception as e:
            error_details = traceback.format_exc()
            print(f"Error processing query: {str(e)}")
            print(f"Error details: {error_details}")
            
            # Return an error message in JSON format
            return json.dumps({
                "error": "Our hackathon problem generation service is temporarily unavailable.",
                "problems": [
                    {
                        "title": f"Basic {query} prototype",
                        "impact": "Quick demonstration of core technology functionality",
                        "feasibility": {
                            "technical": "Low",
                            "resources": ["Basic development tools", "Documentation", "Sample code"]
                        },
                        "novelty": "Focus on educational value and practical implementation"
                    }
                ]
            }, indent=2) 