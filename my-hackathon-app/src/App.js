import logo from './logo.svg';
import './App.css';
import {getAntisemiticRankForCountry} from './AntisemiticCalc.js';
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

  const [countriesMap, setCountriesMap] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        for (let i = 0; i < countries.features.length; i++) {
          const countryName = countries.features[i].properties.ADMIN;
          const rank = await getAntisemiticRankForCountry(countryName);
          setCountriesMap(prevState => ({
            ...prevState,
            [countryName]: rank
          }));
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [countries]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        hexPolygonsData={countries.features}
        hexPolygonResolution={3}
        hexPolygonMargin={0.1}
        hexPolygonUseDots={false}
        hexPolygonColor="rgba(200, 0, 0, 0.6)"
        hexPolygonLabel=
          {({ properties: d }) => {
            return `
              <b>${d.ADMIN} (${d.ISO_A2})</b> <br />
              Population: <i>${d.POP_EST}</i> <br />
              <i style="color: red">Antisemitic rank: ${countriesMap[d.ADMIN]}</i>
            `;
          }}

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
