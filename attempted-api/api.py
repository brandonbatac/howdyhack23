import requests

response = requests.get(
    url="https://api.predicthq.com/v1/events/",
    headers={
      "Authorization": "Bearer $DMBvbxVAI4kYrjuug5QNd28Sle_YnsWWqBiL48rt",
      "Accept": "application/json"
    },
    params={
      "country": "US",
      "category": "school-holidays"
    }
)

print(response.json())