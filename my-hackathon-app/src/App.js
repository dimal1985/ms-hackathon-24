import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';
import Globe from 'react-globe.gl';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        Hello World Dima !!
      </header>
    </div>
  );
}

const GlobeComponent = () => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  const handleCountryClick = (country) => {
    setSelectedCountry(country);
    // Fetch and display data for the selected country
  };

  return (
    <div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        polygonsData={[] /* your polygons data for countries */}
        polygonAltitude={0.06}
        polygonCapColor="rgba(200, 0, 0, 0.6)"
        polygonSideColor="rgba(255, 0, 0, 0.15)"
        onPolygonClick={(event) => handleCountryClick(event.object)}
      />
      {selectedCountry && (
        <div>
          <h3>Data for {selectedCountry.properties.name}</h3>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
};

// export default App;
export default GlobeComponent;
