
document.addEventListener('DOMContentLoaded', function () {
    // Replace 'YOUR_API_KEY' with your actual PredictHQ API key
    const apiKey = 'DMBvbxVAI4kYrjuug5QNd28Sle_YnsWWqBiL48rt';
  
    // Define the API endpoint URL
    const apiUrl = 'https://api.predicthq.com/v1/events/';
  
    // Define the query parameters for the API request
    const queryParams = {
      start: '2023-09-01', // Example: Start date
      end: '2023-09-30', // Example: End date
    };
  
    // Get references to the button and results div
    const fetchDataButton = document.getElementById('fetchDataButton');
    const resultsDiv = document.getElementById('results');
  
    // Function to fetch data from the PredictHQ API
    function fetchData() {
      // Convert the query parameters to a URL-encoded string
      const queryString = new URLSearchParams(queryParams).toString();
  
      // Create the full API URL with query parameters
      const fullApiUrl = `${apiUrl}?${queryString}`;
  
      // Define headers for the API request
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
      };
  
      // Make the API request using the fetch API
      fetch(fullApiUrl, { headers })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          // Process the API response data here
          displayEventData(data.results);
        })
        .catch(error => {
          console.error('Error:', error);
          resultsDiv.textContent = 'Error fetching data';
        });
    }
  
    // Function to display event data
    function displayEventData(events) {
      // Clear any previous results
      resultsDiv.innerHTML = '';
  
      if (events && events.length > 0) {
        const eventList = document.createElement('ul');
  
        // Loop through each event in the results
        events.forEach(event => {
          // Extract the desired data fields
          const eventName = event.title;
          const eventDate = event.start ? new Date(event.start).toLocaleDateString() : 'Date not specified';
          const eventStreetAddress = event.location ? event.location : 'Address not specified';
          const eventCategory = event.category ? event.category : 'Category not specified';
  
          // Create list items to display event details
          const listItem = document.createElement('li');
          listItem.innerHTML = `
            <strong>Title:</strong> ${eventName}<br>
            <strong>Date:</strong> ${eventDate}<br>
            <strong>Street Address:</strong> ${eventStreetAddress[0]}, ${eventStreetAddress[1]}<br>
            <strong>Category:</strong> ${eventCategory}<br>
            <strong> \n </strong><br>
          `;
  
          // Append the list item to the event list
          eventList.appendChild(listItem);
        });
  
        // Append the event list to the results div
        resultsDiv.appendChild(eventList);
      } else {
        resultsDiv.textContent = 'No events found.';
      }
    }
  
    // Add a click event listener to the button
    fetchDataButton.addEventListener('click', fetchData);
  });
  