import requests
import random
import json
from pprint import pprint

def calculate_india_aqi(pm25, pm10):
    """Calculate Indian AQI based on PM2.5 and PM10 values"""
    def get_aqi_subindex(pollutant, breakpoints):
        for bp in breakpoints:
            if bp['low'] <= pollutant <= bp['high']:
                return round(((bp['aqi_high'] - bp['aqi_low']) / (bp['high'] - bp['low'])) *
                             (pollutant - bp['low']) + bp['aqi_low'])
        return 0

    pm25_bp = [
        {"low": 0, "high": 30, "aqi_low": 0, "aqi_high": 50},
        {"low": 31, "high": 60, "aqi_low": 51, "aqi_high": 100},
        {"low": 61, "high": 90, "aqi_low": 101, "aqi_high": 200},
        {"low": 91, "high": 120, "aqi_low": 201, "aqi_high": 300},
        {"low": 121, "high": 250, "aqi_low": 301, "aqi_high": 400},
        {"low": 251, "high": 500, "aqi_low": 401, "aqi_high": 500},
    ]
    pm10_bp = [
        {"low": 0, "high": 50, "aqi_low": 0, "aqi_high": 50},
        {"low": 51, "high": 100, "aqi_low": 51, "aqi_high": 100},
        {"low": 101, "high": 250, "aqi_low": 101, "aqi_high": 200},
        {"low": 251, "high": 350, "aqi_low": 201, "aqi_high": 300},
        {"low": 351, "high": 430, "aqi_low": 301, "aqi_high": 400},
        {"low": 431, "high": 500, "aqi_low": 401, "aqi_high": 500},
    ]

    pm25_aqi = get_aqi_subindex(pm25, pm25_bp)
    pm10_aqi = get_aqi_subindex(pm10, pm10_bp)
    return max(pm25_aqi, pm10_aqi)

def get_city_air_quality(city_name, api_key="a00174d020ab1cec2d561cbffadd4c96"):
    """Get air quality data for a city"""
    print(f"Fetching air quality data for {city_name}...")

    # Step 1: Convert city name to coordinates
    geo_url = f"http://api.openweathermap.org/geo/1.0/direct?q={city_name}&limit=1&appid={api_key}"
    geo_res = requests.get(geo_url).json()

    if not geo_res:
        print(f"City '{city_name}' not found.")
        return None

    lat, lon = geo_res[0]['lat'], geo_res[0]['lon']
    print(f"Coordinates: {lat}, {lon}")

    # Step 2: Get air quality data
    url = f"http://api.openweathermap.org/data/2.5/air_pollution?lat={lat}&lon={lon}&appid={api_key}"
    response = requests.get(url)

    if response.status_code != 200:
        print(f"Failed to fetch air quality data: {response.status_code}")
        return None

    # Step 3: Process data
    data = response.json()["list"][0]
    comp = data["components"]

    pm2_5 = round(comp.get("pm2_5", 0), 2)
    pm10 = round(comp.get("pm10", 0), 2)
    # Simplified NO calculation - comp.get handles the default random value if 'no' is missing
    no = round(comp.get("no", random.uniform(5, 50)), 2)
    no2 = round(comp.get("no2", 0), 2)
    nox = round(no + no2, 2)
    nh3 = round(comp.get("nh3", 0), 2)
    # CO is always random in both files
    co = round(random.uniform(1.0, 5.0), 2)
    so2 = round(comp.get("so2", 0), 2)
    o3 = round(comp.get("o3", 0), 2)
    # Benzene, Toluene, Xylene are always random in both files
    benzene = round(random.uniform(1.0, 5.0), 2)
    toluene = round(random.uniform(5.0, 20.0), 2)
    xylene = round(random.uniform(1.0, 10.0), 2)
    aqi = calculate_india_aqi(pm2_5, pm10)

    # Create data object in format expected by the prediction API
    air_quality_data = {
        "PM2_5": pm2_5,
        "PM10": pm10,
        "NO": no,
        "NO2": no2,
        "NOx": nox,
        "NH3": nh3,
        "CO": co,
        "SO2": so2,
        "O3": o3,
        "Benzene": benzene,
        "Toluene": toluene,
        "Xylene": xylene,
        "AQI": aqi
    }

    return air_quality_data

def get_plant_recommendations(air_quality_data):
    """Get plant recommendations based on air quality data"""
    print("Sending data to prediction API...")

    # Prediction API endpoint
    url = "https://fastapi-voting-based-model-api-for-plant.onrender.com/predict"

    try:
        # Send air quality data to prediction API
        response = requests.post(url, json=air_quality_data)

        if response.status_code == 200:
            return response.json()
        else:
            print(f"Error: Received status code {response.status_code}")
            print(f"Response: {response.text}")
            return None
    except Exception as e:
        print(f"API request failed: {str(e)}")
        return None

def main(city_name):
    """Main function to get plant recommendations for a city"""
    # Step 1: Get air quality data
    air_quality_data = get_city_air_quality(city_name)
    if not air_quality_data:
        return

    print("\nAir Quality Parameters:")
    pprint(air_quality_data)

    # Step 2: Get plant recommendations
    recommendations = get_plant_recommendations(air_quality_data)
    if not recommendations:
        return

    # Step 3: Display results
    print(f"\n🌱 Recommended Plants for {city_name}")
    print("-" * 40)

    top3 = recommendations.get("recommendations", [])
    for i, plant in enumerate(top3, 1):
        print(f"{i}. {plant['plant']} (Confidence: {plant['confidence']*100:.1f}%)")

    # Optional: Display all predictions
    print("\nAll Plant Predictions (sorted by confidence):")
    all_preds = recommendations.get("all_predictions", [])
    sorted_preds = sorted(all_preds, key=lambda x: x["confidence"], reverse=True)
    for plant in sorted_preds:
        print(f"- {plant['plant']}: {plant['confidence']*100:.1f}%")

# Run the script
if __name__ == "__main__":
    # Get city name from user input
    input_city = input("Enter the city name: ")
    if input_city:
        print(f"🌍 Getting plant recommendations for {input_city}")
        print("-" * 50)
        main(input_city)
        print("\nScript completed successfully!")
    else:
        print("No city name entered. Exiting.")
