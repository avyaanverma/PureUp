document.addEventListener('DOMContentLoaded', function() {
    // Get user's location
    navigator.geolocation.getCurrentPosition(function(position) {
      const { latitude, longitude } = position.coords;
      // Fetch location details and AQI
      fetchLocationDetails(latitude, longitude);
    });
 
    // Fetch plant of the day and suggested plants
    fetchPlantData();
 
    // Add click event listener to the Monstera card
    document.querySelector('.plant-card.monstera').addEventListener('click', openMonsteraPage);

    // Add click event listeners to succulent cards
    const succulentCards = document.querySelectorAll('.suggested-plants .plant-card');
    succulentCards.forEach((card, index) => {
        card.addEventListener('click', () => openSucculentPage(index + 1));
    });
});
 
function fetchLocationDetails(latitude, longitude) {
    // Fetch location name, AQI, and condition from an API
    // Update the location, aqi, and condition elements in the DOM
}
 
function fetchPlantData() {
    // Fetch plant of the day and suggested plant data from an API
    // Update the plant-related elements in the DOM
}
 
function openMonsteraPage() {
    // Open the monstera.html file in a new tab or window
    chrome.tabs.create({ url: 'monstera.html' });
}

function openSucculentPage(number) {
    // Open the respective succulent page in a new tab or window
    chrome.tabs.create({ url: `succulent${number}.html` });
}