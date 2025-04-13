/* global chrome */
import React, { useState, useEffect, useRef } from 'react';
import './popup.css';

// Default structure for Plant of the Day (loading state)
const defaultPlantOfDay = {
  _id: 'plantOfDay', // Use a fixed ID for state management/modal logic
  title: 'Plant of the day',
  name: 'Loading...',
  image: '/images/plantofDay.png', // Keep a default image while loading
  description: 'Fetching today\'s plant...',
  details: {
      light: 'N/A',
      water: 'N/A',
      humidity: 'N/A',
      temperature: 'N/A',
  }
};

// Default structure for suggested plants
const defaultSuggestedPlants = [
  {
    id: 'suggestion-1',
    title: 'Our Suggestion',
    name: 'Loading...',
    image: '/images/suggested-plant.png',
    description: 'Fetching suggestions based on your location.',
    details: { light: 'N/A', water: 'N/A', humidity: 'N/A', temperature: 'N/A' }
  },
  {
    id: 'suggestion-2',
    title: 'Our Suggestion',
    name: 'Loading...',
    image: '/images/suggested-plant.png',
    description: '',
    details: { light: 'N/A', water: 'N/A', humidity: 'N/A', temperature: 'N/A' }
  },
  {
    id: 'suggestion-3',
    title: 'Our Suggestion',
    name: 'Loading...',
    image: '/images/suggested-plant.png',
    description: '',
    details: { light: 'N/A', water: 'N/A', humidity: 'N/A', temperature: 'N/A' }
  },
];

// Helper function to generate the local image path (used for both PotD and suggestions)
const getLocalImagePath = (plantName) => {
  if (!plantName || plantName === 'Loading...' || plantName === 'Error') {
      // Return default image if name is invalid or loading/error state
      // Use a generic one for suggestions, specific one for PotD card initial load
      return plantName === 'Loading...' && plantName === defaultPlantOfDay.name
             ? '/images/plantofDay.png'
             : '/images/suggested-plant.png';
  }

  // Handle special cases first
  if (plantName === 'Tulsi') return '/images/plants/Tulsi.png';
  if (plantName === 'Pothos') return '/images/plants/Pothos.png';

  // Default conversion: lowercase, replace spaces with underscores
  const filename = plantName.toLowerCase().replace(/\s+/g, '_') + '.png';
  return `/images/plants/${filename}`;
};


const Popup = () => {
  const [modalPlantId, setModalPlantId] = useState(null);
  const [dynamicSuggestedPlants, setDynamicSuggestedPlants] = useState(defaultSuggestedPlants);
  const [currentSuggestionIndex, setCurrentSuggestionIndex] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [location, setLocation] = useState(null); // Stores { latitude, longitude }
  const [locationError, setLocationError] = useState(null);
  const [locationName, setLocationName] = useState('Getting location...'); // For display
  const [aqi, setAqi] = useState({ value: null, level: null, loading: true });
  const [plantOfDay, setPlantOfDay] = useState(defaultPlantOfDay); // State for Plant of the Day

  const settingsRef = useRef(null);
  const settingsBtnRef = useRef(null);

  // --- API Keys and URLs ---
  const WAQI_API_KEY = 'fecadddfdc3b77b717a2465085c2316e403d5c99'; // WAQI API Key
  const OWM_API_KEY = "a00174d020ab1cec2d561cbffadd4c96"; // OpenWeatherMap API Key
  const ML_API_URL = "https://fastapi-voting-based-model-api-for-plant.onrender.com/predict";
  // Use different URLs for development and production builds
  const BACKEND_BASE_URL = process.env.NODE_ENV === 'production'
    ? 'https://my-plamt-api.onrender.com' // Use the actual deployed Render URL (Base)
    : 'http://localhost:3001'; // Development URL (Base)
  const PLANT_DETAILS_API_URL = `${BACKEND_BASE_URL}/api/plant-details`;
  const RANDOM_PLANT_API_URL = `${BACKEND_BASE_URL}/api/random-plant`;


  // --- Helper Functions ---
  const getAqiColor = (level) => {
    switch (level) {
      case 'Unhealthy for Sensitive Groups': return '#F9A825';
      // Add other cases if needed
      default: return '#333';
    }
  };

  const calculateIndiaAqi = (pm25, pm10) => {
    const getAqiSubindex = (pollutant, breakpoints) => {
      for (const bp of breakpoints) {
        if (bp.low <= pollutant && pollutant <= bp.high) {
          return Math.round(((bp.aqi_high - bp.aqi_low) / (bp.high - bp.low)) * (pollutant - bp.low) + bp.aqi_low);
        }
      }
      return 0;
    };
    const pm25_bp = [ { low: 0, high: 30, aqi_low: 0, aqi_high: 50 }, { low: 31, high: 60, aqi_low: 51, aqi_high: 100 }, { low: 61, high: 90, aqi_low: 101, aqi_high: 200 }, { low: 91, high: 120, aqi_low: 201, aqi_high: 300 }, { low: 121, high: 250, aqi_low: 301, aqi_high: 400 }, { low: 251, high: 500, aqi_low: 401, aqi_high: 500 }, ];
    const pm10_bp = [ { low: 0, high: 50, aqi_low: 0, aqi_high: 50 }, { low: 51, high: 100, aqi_low: 51, aqi_high: 100 }, { low: 101, high: 250, aqi_low: 101, aqi_high: 200 }, { low: 251, high: 350, aqi_low: 201, aqi_high: 300 }, { low: 351, high: 430, aqi_low: 301, aqi_high: 400 }, { low: 431, high: 500, aqi_low: 401, aqi_high: 500 }, ];
    const pm25_aqi = getAqiSubindex(pm25, pm25_bp);
    const pm10_aqi = getAqiSubindex(pm10, pm10_bp);
    return Math.max(pm25_aqi, pm10_aqi);
  };

  const getRandomFloat = (min, max, decimals = 2) => {
    const str = (Math.random() * (max - min) + min).toFixed(decimals);
    return parseFloat(str);
  };

  // --- Data Fetching Functions ---

  const getAQI = async (latitude, longitude) => {
    setAqi({ ...aqi, loading: true });
    // Add caching logic here if desired for AQI
    try {
      const response = await fetch(`https://api.waqi.info/feed/geo:${latitude};${longitude}/?token=${WAQI_API_KEY}`);
      if (!response.ok) throw new Error(`WAQI API error: ${response.status}`);
      const data = await response.json();
      if (data.status === 'ok') {
        const aqiValue = data.data.aqi;
        let level;
        if (aqiValue <= 50) level = 'Good';
        else if (aqiValue <= 100) level = 'Moderate';
        else if (aqiValue <= 150) level = 'Unhealthy for Sensitive Groups';
        else if (aqiValue <= 200) level = 'Unhealthy';
        else if (aqiValue <= 300) level = 'Very Unhealthy';
        else level = 'Hazardous';
        const newAqiData = { value: aqiValue, level: level };
        setAqi({ ...newAqiData, loading: false });
        // Cache AQI data
        try {
          chrome.storage.local.set({ [`aqiData_${latitude}_${longitude}`]: newAqiData, aqiCacheTimestamp: Date.now() });
        } catch (e) { console.error("Error caching AQI data:", e); }
      } else {
        throw new Error('WAQI API returned status not ok');
      }
    } catch (error) {
      console.error('Error getting AQI:', error);
      setAqi({ value: null, level: null, loading: false });
    }
  };

  const getLocationName = async (latitude, longitude) => {
    console.log("Attempting to fetch location name for display...");
    setLocationError(null);
    // Add caching logic here if desired for location name
    try {
      const url = `https://api.openweathermap.org/geo/1.0/reverse?lat=${latitude}&lon=${longitude}&limit=1&appid=${OWM_API_KEY}`;
      const response = await fetch(url);
      if (!response.ok) {
        const errorText = await response.text().catch(() => `Status ${response.status}`);
        throw new Error(`Failed to fetch location details from OWM: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      if (data && data.length > 0) {
        const locationData = data[0];
        const cityName = locationData.name || '';
        const stateName = locationData.state || '';
        const countryName = locationData.country || '';
        let displayLocationName = cityName;
        if (stateName && stateName !== cityName) displayLocationName += `, ${stateName}`;
        else if (countryName && !stateName) displayLocationName += `, ${countryName}`;
        if (!displayLocationName) {
            displayLocationName = 'Location name unavailable';
            setLocationError(displayLocationName);
        } else {
            setLocationError(null);
        }
        setLocationName(displayLocationName);
        // Cache the fetched display name
        try {
          chrome.storage.local.set({
            [`locationName_${latitude}_${longitude}`]: displayLocationName,
            locationNameCacheTimestamp: Date.now()
          });
           console.log('Location name cached');
        } catch (e) { console.error("Error caching location name data:", e); }
      } else {
        throw new Error("OWM Reverse Geocoding returned no results.");
      }
    } catch (error) {
      console.error('Error in getLocationName (OWM):', error);
      const errorMessage = error.message.includes('OWM') ? error.message : 'Unable to get location name';
      setLocationError(errorMessage);
      setLocationName('Location unavailable');
    }
  };

  // Fetches detailed plant suggestions, checking cache first
  const getPlantSuggestions = async (latitude, longitude) => {
    console.log(`Attempting to get plant suggestions for coords: ${latitude}, ${longitude}`);
    const CACHE_DURATION_SUGGESTIONS = 15 * 60 * 1000; // 15 minutes
    const cacheKey = `plantSuggestions_details_${latitude}_${longitude}`;
    const timestampKey = 'suggestionsCacheTimestamp'; // Use a single timestamp key for simplicity

    // 1. Check Cache First
    try {
      chrome.storage.local.get([cacheKey, timestampKey], (result) => {
        if (chrome.runtime.lastError) {
          console.error("Error reading suggestions cache:", chrome.runtime.lastError);
          fetchAndProcessSuggestions(latitude, longitude, cacheKey, timestampKey); // Fetch if cache read fails
          return;
        }

        const now = Date.now();
        const cachedData = result[cacheKey];
        const timestamp = result[timestampKey];

        if (cachedData && timestamp && (now - timestamp < CACHE_DURATION_SUGGESTIONS)) {
          console.log("Using cached detailed plant suggestions:", cachedData);
          setDynamicSuggestedPlants(cachedData); // Use cached detailed data
        } else {
          console.log("Detailed plant suggestions cache invalid/missing, fetching fresh suggestions...");
          fetchAndProcessSuggestions(latitude, longitude, cacheKey, timestampKey); // Fetch fresh data
        }
      });
    } catch (storageError) {
      console.error("Synchronous error setting up suggestions cache read:", storageError);
      fetchAndProcessSuggestions(latitude, longitude, cacheKey, timestampKey); // Fallback to fetching
    }
  };

  // Handles the full flow: ML API -> Backend API -> Update State & Cache
  const fetchAndProcessSuggestions = async (latitude, longitude, cacheKey, timestampKey) => {
    console.log(`Fetching fresh suggestions flow for coords: ${latitude}, ${longitude}`);
    setDynamicSuggestedPlants(defaultSuggestedPlants); // Reset to loading state while fetching

    if (latitude === null || longitude === null || latitude === undefined || longitude === undefined) {
      console.log("Invalid coordinates, cannot fetch suggestions.");
      setDynamicSuggestedPlants(defaultSuggestedPlants.map(p => ({ ...p, name: "No Location", description: "Could not get coordinates." })));
      return;
    }

    let plantNamesToFetch = [];

    try {
      // Step 1 & 2: Get Air Pollution Data & Process
      // ... (Air pollution fetch and processing logic remains the same) ...
      const airUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${OWM_API_KEY}`;
      const airResponse = await fetch(airUrl);
      if (!airResponse.ok) throw new Error(`Air Pollution API error: ${airResponse.status}`);
      const airData = await airResponse.json();
      if (!airData?.list?.[0]?.components) throw new Error("No air pollution data returned.");
      const components = airData.list[0].components;
      const pm2_5 = components.pm2_5 ?? 0;
      const pm10 = components.pm10 ?? 0;
      const no = components.no ?? getRandomFloat(5, 50);
      const no2 = components.no2 ?? 0;
      const nox = no + no2;
      const nh3 = components.nh3 ?? 0;
      const co = getRandomFloat(1.0, 5.0);
      const so2 = components.so2 ?? 0;
      const o3 = components.o3 ?? 0;
      const benzene = getRandomFloat(1.0, 5.0);
      const toluene = getRandomFloat(5.0, 20.0);
      const xylene = getRandomFloat(1.0, 10.0);
      const aqiValue = calculateIndiaAqi(pm2_5, pm10);
      const airQualityData = { "PM2_5": pm2_5, "PM10": pm10, "NO": no, "NO2": no2, "NOx": nox, "NH3": nh3, "CO": co, "SO2": so2, "O3": o3, "Benzene": benzene, "Toluene": toluene, "Xylene": xylene, "AQI": aqiValue };


      // Step 3: Call ML API
      console.log("Sending data to ML prediction API...");
      const mlResponse = await fetch(ML_API_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(airQualityData) });
      if (!mlResponse.ok) {
        const errorText = await mlResponse.text();
        throw new Error(`ML API request failed: ${mlResponse.status} - ${errorText}`);
      }
      const mlData = await mlResponse.json();
      console.log("Parsed ML API Response (mlData):", mlData);

      // Step 4: Extract Plant Names
      const recommendedPlantNamesRaw = mlData.recommendations || mlData.top_3_plants;
      if (!recommendedPlantNamesRaw || !Array.isArray(recommendedPlantNamesRaw) || recommendedPlantNamesRaw.length === 0) {
        throw new Error("ML API returned no valid plant suggestions.");
      }
      plantNamesToFetch = recommendedPlantNamesRaw.map(p => p.plant).filter(name => name);
      if (plantNamesToFetch.length === 0) {
        throw new Error("ML API returned recommendations but no valid plant names found.");
      }

      // Step 5: Fetch Full Details from Backend Server
      console.log("Fetching details for plants from backend:", plantNamesToFetch);
      const backendResponse = await fetch(PLANT_DETAILS_API_URL, { // Use constant
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ plantNames: plantNamesToFetch })
      });
      if (!backendResponse.ok) {
        const errorText = await backendResponse.text();
        throw new Error(`Backend API error: ${backendResponse.status} - ${errorText}`);
      }
      const detailedPlantsData = await backendResponse.json(); // Array of full plant objects from DB
      console.log("Received detailed plant data from backend:", detailedPlantsData);

      // Step 6: Map DB data to Frontend State Structure, constructing local image paths
      const detailedSuggestions = plantNamesToFetch.map((name, index) => {
        const details = detailedPlantsData.find(p => p.plant_name === name);

        if (details) {
          const imagePath = getLocalImagePath(details.plant_name);
          // console.log(`Constructed image path for ${details.plant_name}: ${imagePath}`);
          return {
            id: `suggestion-${index + 1}`,
            title: 'Our Suggestion',
            name: details.plant_name,
            image: imagePath, // Use the constructed local path
            description: details.description || 'Details not available.',
            details: {
              light: details.light_requirement || 'N/A',
              water: details.watering_frequency || 'N/A',
              humidity: details.humidity || 'N/A',
              temperature: details.temperature_range || 'N/A'
            }
          };
        } else {
          const imagePath = getLocalImagePath(name);
          // console.log(`Constructed fallback image path for ${name}: ${imagePath}`);
          return {
            ...defaultSuggestedPlants[index],
             id: `suggestion-${index + 1}`,
             name: name,
             description: 'Details not found in database.',
             image: imagePath,
             details: { light: 'N/A', water: 'N/A', humidity: 'N/A', temperature: 'N/A' }
           };
        }
      });

      // Ensure 3 suggestions
      while (detailedSuggestions.length < 3 && detailedSuggestions.length < defaultSuggestedPlants.length) {
           detailedSuggestions.push({
              ...defaultSuggestedPlants[detailedSuggestions.length],
              id: `suggestion-${detailedSuggestions.length + 1}`,
              name: 'More Options',
              description: 'Explore other plants.',
              image: '/images/suggested-plant.png', // Default image for padding
              details: { light: 'N/A', water: 'N/A', humidity: 'N/A', temperature: 'N/A' }
           });
      }
      const finalDetailedSuggestions = detailedSuggestions.slice(0, 3);

      // Step 7: Update State and Cache
      console.log("Setting dynamic suggested plants with detailed data (local paths):", finalDetailedSuggestions);
      setDynamicSuggestedPlants(finalDetailedSuggestions);
      // Caching the data with local paths is fine.
      try {
        chrome.storage.local.set({
          [cacheKey]: finalDetailedSuggestions, // Cache the detailed data
          [timestampKey]: Date.now()
        }, () => {
          if (chrome.runtime.lastError) {
            console.error("Error saving detailed suggestions to cache:", chrome.runtime.lastError);
          } else {
            console.log("Detailed plant suggestions saved to cache for key:", cacheKey);
          }
        });
      } catch (e) {
        console.error("Error initiating detailed suggestions cache save:", e);
      }

    } catch (error) {
      console.error('Error in fetchAndProcessSuggestions flow:', error);
      let errorDescription = `Failed to get suggestions: ${error.message}`;
      if (error.message.includes("Backend API error")) {
          errorDescription = "Could not connect to the detail server. Please ensure it's running.";
      } else if (error.message.includes("ML API")) {
          errorDescription = "Could not get recommendations from the prediction service.";
      }
      if (plantNamesToFetch.length > 0) {
          const fallbackSuggestions = plantNamesToFetch.map((name, index) => ({
             ...defaultSuggestedPlants[index],
             id: `suggestion-${index + 1}`,
             name: name,
             description: errorDescription
          }));
          while (fallbackSuggestions.length < 3 && fallbackSuggestions.length < defaultSuggestedPlants.length) {
              fallbackSuggestions.push({ ...defaultSuggestedPlants[fallbackSuggestions.length], id: `suggestion-${fallbackSuggestions.length + 1}`, name: 'More Options', description: 'Explore other plants.' });
          }
          setDynamicSuggestedPlants(fallbackSuggestions.slice(0, 3));
      } else {
          setDynamicSuggestedPlants(defaultSuggestedPlants.map(p => ({ ...p, name: "Error", description: errorDescription })));
      }
    }
  };

  // Fetches the random plant of the day
  const fetchPlantOfDay = async () => {
    console.log("Fetching Plant of the Day...");
    try {
      const response = await fetch(RANDOM_PLANT_API_URL); // Use constant
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Random plant API error: ${response.status} - ${errorText}`);
      }
      const data = await response.json();
      const imagePath = getLocalImagePath(data.plant_name);
      console.log(`Fetched Plant of the Day: ${data.plant_name}, Image path: ${imagePath}`);

      setPlantOfDay({
        _id: 'plantOfDay', // Keep fixed ID
        title: 'Plant of the day',
        name: data.plant_name || 'Unknown Plant',
        image: imagePath,
        description: data.description || 'No description available.',
        details: {
          light: data.light_requirement || 'N/A',
          water: data.watering_frequency || 'N/A',
          humidity: data.humidity || 'N/A',
          temperature: data.temperature_range || 'N/A'
        }
      });
    } catch (error) {
      console.error('Error fetching Plant of the Day:', error);
      // Keep default loading state or set an error state
      setPlantOfDay({
        ...defaultPlantOfDay,
        name: "Error",
        description: "Could not fetch Plant of the Day."
      });
    }
  };


  // --- Location Error Handler ---
  const handleLocationError = (error) => {
    console.error("Error getting location:", error);
    let errorMessage = error.message || "Unknown location error";
    if (error.code) {
      switch (error.code) {
        case error.PERMISSION_DENIED: errorMessage = "Location permission denied"; break;
        case error.POSITION_UNAVAILABLE: errorMessage = "Location information is unavailable"; break;
        case error.TIMEOUT: errorMessage = "Location request timed out"; break;
      }
    }
    setLocationError(errorMessage);
    setLocationName('Location unavailable');
    setAqi({ value: null, level: null, loading: false });
    setDynamicSuggestedPlants(defaultSuggestedPlants.map(p => ({ ...p, name: "Location Error", description: "Cannot get suggestions without location." })));
  };

  // --- Initial Data Load ---
  useEffect(() => {
    const CACHE_DURATION_LOCATION = 60 * 60 * 1000; // 1 hour for location name cache

    const loadData = () => {
      // Fetch Plant of the Day on initial load
      fetchPlantOfDay();

      if (!("geolocation" in navigator)) {
        handleLocationError(new Error("Geolocation is not supported"));
        return;
      }

      console.log("Attempting to get geolocation...");
      navigator.geolocation.getCurrentPosition(
        (position) => { // Geolocation Success
          const { latitude, longitude } = position.coords;
          console.log("Geolocation successful:", latitude, longitude);
          setLocation({ latitude, longitude });
          setLocationError(null);

          // Fetch location-based data (AQI and Suggestions)
          getPlantSuggestions(latitude, longitude);
          getAQI(latitude, longitude);

          // Check cache *only* for display name (Location Name Caching)
          const locationNameCacheKey = `locationName_${latitude}_${longitude}`;
          const locationTimestampKey = 'locationNameCacheTimestamp';
          try {
            chrome.storage.local.get([locationNameCacheKey, locationTimestampKey], (result) => {
              if (chrome.runtime.lastError) {
                console.error("Error reading location name cache:", chrome.runtime.lastError);
                getLocationName(latitude, longitude); // Fallback if storage read fails
                return;
              }

              const now = Date.now();
              const cachedName = result[locationNameCacheKey];
              const timestamp = result[locationTimestampKey];

              if (cachedName && timestamp && (now - timestamp < CACHE_DURATION_LOCATION)) {
                console.log("Using cached location name:", cachedName);
                setLocationName(cachedName);
              } else {
                console.log("Location name cache invalid/missing, fetching fresh name...");
                getLocationName(latitude, longitude); // Fetch display name using OWM
              }
            });
          } catch (storageError) {
             console.error("Synchronous error setting up location name cache read:", storageError);
             getLocationName(latitude, longitude); // Fallback to fetching name
          }
        },
        (geoError) => { // Geolocation Failed
          handleLocationError(geoError);
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Use maximumAge: 0 to force fresh location
      );
    };

    loadData();
  }, []); // Empty dependency array: runs once on mount

  // --- Settings Dropdown Logic ---
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showSettings && settingsRef.current && !settingsRef.current.contains(e.target) && settingsBtnRef.current && !settingsBtnRef.current.contains(e.target)) {
        setShowSettings(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSettings]);

  // --- Suggestion Carousel Logic ---
  useEffect(() => {
    // Only start interval if suggestions are loaded and valid
    if (dynamicSuggestedPlants.length > 0 && dynamicSuggestedPlants[0].name !== 'Loading...' && !dynamicSuggestedPlants[0].name.includes('Error') && !dynamicSuggestedPlants[0].name.includes('No ')) {
      const intervalId = setInterval(() => {
        setCurrentSuggestionIndex((prevIndex) => (prevIndex + 1) % dynamicSuggestedPlants.length);
      }, 5000); // Change suggestion every 5 seconds
      return () => clearInterval(intervalId);
    }
  }, [dynamicSuggestedPlants]); // Re-run if suggestions change

  // --- Event Handlers ---
  const openModal = (plantId) => setModalPlantId(plantId);
  const closeModal = () => setModalPlantId(null);

  // --- Render Logic ---
  // Find the data for the currently open modal
  const currentModalData = modalPlantId
    ? modalPlantId === 'plantOfDay'
      ? { ...plantOfDay, title: 'Plant of the day' } // Use fetched plantOfDay state
      : dynamicSuggestedPlants.find(p => p.id === modalPlantId) // Find suggestion by ID
    : null;

  // Determine the currently displayed suggestion in the carousel
  const safeSuggestionIndex = dynamicSuggestedPlants.length > 0 ? currentSuggestionIndex % dynamicSuggestedPlants.length : 0;
  const currentSuggestion = dynamicSuggestedPlants.length > 0 ? dynamicSuggestedPlants[safeSuggestionIndex] : defaultSuggestedPlants[0]; // Fallback to default loading state

  // Log the state just before rendering to check image URLs
  // console.log("Rendering dynamicSuggestedPlants state:", JSON.stringify(dynamicSuggestedPlants, null, 2));
  // console.log("Rendering plantOfDay state:", JSON.stringify(plantOfDay, null, 2));


  return (
    <div className={`popup-container ${modalPlantId ? 'modal-active' : ''}`}>
      {/* Header */}
      <header className="popup-header">
        <img src="/images/Logo.png" alt="PureUp Logo" className="logo" />
        <button ref={settingsBtnRef} className="settings-button" onClick={() => setShowSettings(!showSettings)} aria-label="Settings">
          <img src="/images/Settings.png" alt="Settings" />
        </button>
      </header>

      {/* Main Content Area */}
      <main className="popup-main">
        {/* AQI Card */}
        <section className="card aqi-card">
          <div className="aqi-main">
            <div className="icon-placeholder cloud-icon">☁️</div>
            <div className="aqi-value" style={{ color: getAqiColor(aqi.level) }}>
              {aqi.loading ? '...' : aqi.value ?? 'N/A'}
            </div>
          </div>
          <div className="aqi-level">
            {aqi.loading ? 'Loading...' : aqi.level ?? 'Unknown'}
          </div>
          <div className="location">
            <span className="icon-placeholder pin-icon">📍</span>
            <span className="location-text">
              {locationError ? locationError : locationName}
            </span>
          </div>
        </section>

        {/* Plant of the Day Card */}
        <section className="card plant-card">
           <div className="arrow-icon up-arrow" onClick={() => openModal('plantOfDay')} aria-label="Show plant details"></div>
           <h2 className="plant-card-title">
             <span className="title-part-1">Plant</span>
             <span className="title-part-2">of the</span>
             <span className="title-part-3">day</span>
           </h2>
           {/* Use dynamic image from plantOfDay state */}
           <img src={plantOfDay.image} alt={plantOfDay.name} className="plant-image-small" />
        </section>
      </main>

      {/* Suggestion Area */}
      <footer className="popup-footer">
        <section className="card suggestion-card">
          <div className="suggestion-header">
            <div className="icon-placeholder suggestion-icon">💡</div>
            {/* Display title from the current suggestion */}
            <h2 className="suggestion-title">{currentSuggestion.title}</h2>
            {/* Only show arrow if suggestion is loaded, valid, and not just a placeholder */}
            {currentSuggestion && currentSuggestion.name !== 'Loading...' && !currentSuggestion.name.includes('Error') && !currentSuggestion.name.includes('No ') && currentSuggestion.id !== 'suggestion-placeholder' && (
                 <div className="arrow-icon right-arrow" onClick={() => openModal(currentSuggestion.id)} aria-label="Show suggestion details"></div>
            )}
          </div>
          {/* Carousel Content */}
          <div className="suggestion-content-wrapper">
            {dynamicSuggestedPlants.map((plant, index) => (
              <div key={plant.id || `plant-${index}`} className={`suggestion-content-item ${index === safeSuggestionIndex ? 'active' : ''}`}>
                {/* Use plant.image which now comes from the DB or fallback */}
                <img src={plant.image} alt={plant.name} className="plant-image-large" />
                <div className="suggestion-text">
                  <h3>{plant.name}</h3>
                  {/* Use plant.description which now comes from the DB */}
                  <p>{plant.description}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Carousel Indicators */}
           <div className="suggestion-indicators">
            {dynamicSuggestedPlants.map((_, index) => (
              <span key={`dot-${index}`} className={`indicator-dot ${index === safeSuggestionIndex ? 'active' : ''}`}></span>
            ))}
          </div>
        </section>
      </footer>

      {/* Settings Dialog */}
      {showSettings && (
        <div ref={settingsRef} className="settings-dialog">
           <h3>Settings</h3>
            <div className="settings-option"> <label> <input type="checkbox" defaultChecked /> Show weather </label> </div>
            <div className="settings-option"> <label> <input type="checkbox" defaultChecked /> Show plant suggestions </label> </div>
            <div className="settings-option"> <label>Temperature Unit:</label> <select defaultValue="celsius"> <option value="celsius">Celsius</option> <option value="fahrenheit">Fahrenheit</option> </select> </div>
        </div>
      )}

      {/* Modal: Displays details for Plant of the Day OR a selected suggestion */}
      {modalPlantId && currentModalData && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <div className="modal-container" role="dialog" aria-modal="true" aria-labelledby="modal-title">
            <button className="modal-close-button" onClick={closeModal} aria-label="Close modal">
              <span className="icon-placeholder close-icon">✕</span>
            </button>
            <h2 id="modal-title" className="modal-title">{currentModalData.title}</h2>
            {/* Use image from currentModalData */}
            <img src={currentModalData.image} alt={currentModalData.name} className="modal-plant-image" />
            <h3 className="modal-plant-name">{currentModalData.name}</h3>
            {/* Use description from currentModalData */}
            <p className="modal-plant-description">{currentModalData.description}</p>
            {/* Display details if they exist */}
            {currentModalData.details && (
              <div className="modal-detail-cards">
                <div className="detail-card"> <h4 className="detail-title">Light</h4> <p className="detail-text">{currentModalData.details.light}</p> </div>
                <div className="detail-card"> <h4 className="detail-title">Water</h4> <p className="detail-text">{currentModalData.details.water}</p> </div>
                <div className="detail-card"> <h4 className="detail-title">Humidity</h4> <p className="detail-text">{currentModalData.details.humidity}</p> </div>
                <div className="detail-card"> <h4 className="detail-title">Temperature</h4> <p className="detail-text">{currentModalData.details.temperature}</p> </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Popup;
