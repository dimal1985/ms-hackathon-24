import Papa from 'papaparse';

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

export async function NypdCsvFetcher() {
    const response = await fetch('https://data.cityofnewyork.us/api/views/bqiq-cu78/rows.csv');
    const csvData = await response.text();
    const results = Papa.parse(csvData, { header: true, dynamicTyping: true });
    return results.data;
    
} 

// NypdCsvFetcher = () => {
//     const [data, setData] = useState([]);

//     useEffect(() => {
//       const fetchData = async () => {
//         const response = await fetch('https://data.cityofnewyork.us/api/views/bqiq-cu78/rows.csv');
//         const csvData = await response.text();
//         Papa.parse(csvData, {
//           header: true,
//           dynamicTyping: true,
//           complete: (results) => {
//             setData(results.data);
//           }
//         });
//       };

//       fetchData().catch(error => console.error('Error fetching or parsing NYPD CSV:', error));
//     }, []);

//     return (
//       <div>
//         <h1>CSV Data</h1>
//         {data.length > 0 ? (
//           <table>
//             <thead>
//               <tr>
//                 {Object.keys(data[0]).map((header, index) => (
//                   <th key={index}>{header}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {data.map((row, rowIndex) => (
//                 <tr key={rowIndex}>
//                   {Object.values(row).map((value, colIndex) => (
//                     <td key={colIndex}>{value}</td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <p>Loading...</p>
//         )}
//       </div>
//     );
//   };

export async function getAntisemiticRankForCountry(countryName) {
    if (typeof countryName !== 'string' || countryName.length === 0) {
        return null;
    }
    
    if (countryName === 'United States of America') {
        const nycAntisemiticData = await NypdCsvFetcher();
        
        const nycAntisemiticCrimes = nycAntisemiticData
            .filter(row => row['Bias Motive Description'] === 'ANTI-JEWISH')
            .filter(row => row['Record Create Date'].endsWith('2024'));

        console.log(`Number of antisemitic crimes in the US: ${nycAntisemiticCrimes.length}`);

        const nycPopulation = 8.336817e+06;
        const crimesPer100KCapita = (nycAntisemiticCrimes.length / (nycPopulation / 100000)).toFixed(2);

        return crimesPer100KCapita + ' per 100K capita, based on 2024 NYPD report';
    }

    let continent = await getCountryContinent(countryName);
    return continent;
}
