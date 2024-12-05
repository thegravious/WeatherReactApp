import React, { useEffect } from "react";
import "../Components/style.css";

function WeatherPage() {
  const [city, setCity] = React.useState("");
  const [weatherData, setWeatherData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const resp = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`https://wttr.in/${city}?format=j1`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch weather data");
      }
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    resp();
  };

  useEffect(() => {
    if (city) {
      resp();
    }
  }, [city]);

  return (
    <>
      {/* Hero Section */}
      <div className="hero text-center">
        <h1 className="text-4xl mb-[50px] font-bold">Weather App</h1>
        <p className="text-xl">Get real-time weather information</p>
      </div>

      <div className="flex justify-center">
        <div className="container flex justify-center items-center mt-5">
          <div className="flex flex-wrap w-full justify-center">
            <div className="w-full md:w-1/2">
              <div className="text-center flex items-center justify-center mb-3">
                <input
                  id="inp1"
                  type="text"
                  className="form-input w-1/2 p-2 text-xl border rounded-l-lg"
                  placeholder="Enter city name"
                  aria-label="City Name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <button
                  id="btn1"
                  className="bg-[#2180a8] text-white p-3 rounded-r-lg"
                  type="button"
                  onClick={handleSubmit}
                >
                  Get Weather
                </button>
              </div>
            </div>
          </div>

          {/* Weather Information Card */}
          {weatherData && (
            <div className="w-full mt-10 md:w-1/2">
              <div className="card weather-card p-4 text-center border rounded-lg shadow-lg">
                <h1 id="city" className="card-title mb-1 text-2xl font-bold">
                  {city}
                </h1>

                <p>
                  <i className="fas fa-temperature-low text-[#2180a8] text-xl"></i>
                  Temperature (C):{" "}
                  <span id="tempC" className="tempC text-[#87ceeb] font-semibold">
                    {weatherData.weather[0].avgtempC}
                  </span>
                </p>
                <p>
                  <i className="fas fa-temperature-high text-[#2180a8] text-xl"></i>
                  Temperature (F):{" "}
                  <span id="tempF" className="tempF text-[#87ceeb] font-semibold">
                    {weatherData.weather[0].avgtempF}
                  </span>
                </p>
                <p>
                  <i className="fas fa-cloud-sun text-[#2180a8] text-xl"></i>
                  Weather:{" "}
                  <span id="weather" className="weather text-[#87ceeb] font-semibold">
                    {weatherData.current_condition[0].weatherDesc[0].value}
                  </span>
                </p>

                <hr className="my-3" />

                <p>
                  <i className="fas fa-sun text-[#2180a8] text-xl"></i>
                  Sunrise:{" "}
                  <span id="sunRise" className="sunrise-sunset text-[#2180a8]">
                    {weatherData.weather[0].astronomy[0].sunrise}
                  </span>
                </p>
                <p>
                  <i className="fas fa-moon text-[#2180a8] text-xl"></i>
                  Sunset:{" "}
                  <span id="sunSet" className="sunrise-sunset text-[#2180a8]">
                    {weatherData.weather[0].astronomy[0].sunset}
                  </span>
                </p>
                <p>
                  <i className="fas fa-wind text-[#2180a8] text-xl"></i>
                  Wind Speed (kmph):{" "}
                  <span id="windSpeed" className="wind-speed text-[#2180a8]">
                    {weatherData.current_condition[0].windspeedKmph}
                  </span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default WeatherPage;
