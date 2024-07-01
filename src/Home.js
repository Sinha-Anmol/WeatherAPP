import React, { useState, useEffect } from 'react';

function Home() {
    const [cityName, setCityName] = useState('');
    const [temp, setTemp] = useState('');
    const [feelsLike, setFeelsLike] = useState('');
    const [humidity, setHumidity] = useState('');
    const [minTemp, setMinTemp] = useState('');
    const [maxTemp, setMaxTemp] = useState('');
    const [windSpeed, setWindSpeed] = useState('');
    const [windDegrees, setWindDegrees] = useState('');
    const [sunrise, setSunrise] = useState('');
    const [sunset, setSunset] = useState('');
    const [cityInput, setCityInput] = useState('');
    const [weatherData, setWeatherData] = useState(null);

    const getWeather = async (city) => {
        try {
            const url = `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '497be08b75msha7c5bc63048c0a5p1f48b8jsnc3a83dacf58f',
                    'X-RapidAPI-Host': 'weather-by-api-ninjas.p.rapidapi.com'
                }
            };

            const response = await fetch(url, options);
            const result = await response.json();

            setWeatherData(result);

            // Update state with weather data
            setCityName(city);
            setTemp(result.temp);
            setFeelsLike(result.feels_like);
            setHumidity(result.humidity);
            setMinTemp(result.min_temp);
            setMaxTemp(result.max_temp);
            setWindSpeed(result.wind_speed);
            setWindDegrees(result.wind_degrees);
            setSunrise(result.sunrise);
            setSunset(result.sunset);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Call getWeather initially with default city
        getWeather('Bern');
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        getWeather(cityInput);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <a className="navbar-brand" href="#">Weather Information App</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        </ul>
                        <form className="d-flex" onSubmit={handleSubmit}>
                            <input id="city" className="form-control me-2" type="search" placeholder="City Name" aria-label="Search" value={cityInput} onChange={(e) => setCityInput(e.target.value)} />
                            <button className="btn btn-outline-success" type="submit">Search</button>
                        </form>
                    </div>
                </div>
            </nav>

            <div className="container">
                <h1 className="my-4 text-center">Weather of {cityName}</h1>
                <main>
                    <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Temperature</h4>
                                </div>
                                <div className="card-body">
                                    <h1>{temp}</h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Temperature: {temp}</li>
                                        <li>Max Temp: {maxTemp}</li>
                                        <li>Min Temp: {minTemp}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Weather</h4>
                                </div>
                                <div className="card-body">
                                    <h1>{feelsLike}</h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Humidity: {humidity}</li>
                                        <li>Wind Speed: {windSpeed} km/hr</li>
                                        <li>Feels Like: {feelsLike}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col">
                            <div className="card mb-4 rounded-3 shadow-sm">
                                <div className="card-header py-3">
                                    <h4 className="my-0 fw-normal">Sun and Wind Info</h4>
                                </div>
                                <div className="card-body">
                                    <h1>{windDegrees}</h1>
                                    <ul className="list-unstyled mt-3 mb-4">
                                        <li>Wind Degrees: {windDegrees}</li>
                                        <li>Sunrise: {sunrise}</li>
                                        <li>Sunset: {sunset}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Home;
