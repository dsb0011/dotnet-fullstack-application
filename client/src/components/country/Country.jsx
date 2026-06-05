import CountryList from "./CountryList";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_BASE_API_URL + "/countries";

function Country() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /* ADDING Country LIST on the first MOUNT -- GET REQUEST*/
    async function loadCountries() {
      try {
        const response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Failed to fetch countries");

        const data = await response.json();
        setCountries(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }
    loadCountries();
  }, []); // [] It will load only on the first MOUNT!!!

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Country Data
          </h1>
        </div>
        <div className="text-center">
          {loading ? (
            <p className="text-2xl font-bold bg-gradient-to-r from-green-500 to-blue-500 bg-clip-text text-transparent">
              LOADING...
            </p>
          ) : (
            <CountryList countries={countries} />
          )}
        </div>
      </div>
    </div>
  );
}

export default Country;
