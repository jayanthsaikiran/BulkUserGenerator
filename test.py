import requests
import os

# Assume API_KEY is stored as an environment variable for security
API_KEY = os.environ.get("OPENWEATHER_API_KEY", "add000c0f319b7f9d4f86c249ecabc30")
# Example URL to get weather data for London
api_url = f"http://api.openweathermap.org/data/2.5/weather?q=London&appid={API_KEY}"

response = requests.get(api_url)

if response.status_code == 200:
    print("Success:", response.json())
else:
    print("Failed:", response.status_code)
