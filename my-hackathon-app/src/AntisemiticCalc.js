async function getCountryContinent(countryName) {
    const endpoint = `https://restcountries.com/v3.1/name/${countryName}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        if (data && data.length > 0) {
            const continent = data[0].continents ? data[0].continents[0] : 'Unknown';
            console.log(`The continent of ${countryName} is ${continent}`);
            return continent;
        } else {
            console.log(`Country not found: ${countryName}`);
            return null;
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        return null;
    }
}

export async function getAntisemiticRankForCountry(countryName) {
    if (typeof countryName !== 'string' || countryName.length === 0) {
        return null;
    }
    
    let continent = await getCountryContinent(countryName);

    return continent;
}
