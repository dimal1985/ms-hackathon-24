import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect  } from 'react';
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
  const [countries, setCountries] = useState({ features: []});

  useEffect(() => {
    // load data
    fetch('/ne_110m_admin_0_countries.geojson')
      .then(res => 
              res.json())
      .then(setCountries);
  }, []);

  /*const handleCountryClick = (country) => {
    setSelectedCountry(country);
    // Fetch and display data for the selected country
  };*/

  return (
    <div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.3}
        hexPolygonUseDots={true}
        hexPolygonColor="rgba(200, 0, 0, 0.6)"
        hexPolygonLabel=
        {({ properties: d }) => `
          <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
          Population: <i>${d.POP_EST}</i>
        `}

        /*polygonAltitude={0.06}
        polygonCapColor="rgba(200, 0, 0, 0.6)"
        polygonSideColor="rgba(255, 0, 0, 0.15)"
        onPolygonClick= {(event) => {}} // {(event) => handleCountryClick(event.object)}*/

      />
      {/*selectedCountry && */(
        <div>
          <h3>Data for {/*{selectedCountry.properties.name}*/}</h3>
          {/* Display your data here */}
        </div>
      )}
    </div>
  );
};

// export default App;
export default GlobeComponent;
