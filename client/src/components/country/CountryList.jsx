function CountryList({ countries }) {
  console.log("countries", countries);
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        {countries.length > 0 ? (
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  Name
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                  ISO CODE
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  CAPITAL
                </th>
                <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">
                  CONTINENT
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {countries.map((el) => (
                <tr
                  key={el.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {el.name}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {el.isoCode}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {el.capital}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {el.continent}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-3xl font-medium text-gray-700">
            No Data Available!!!
          </p>
        )}
      </div>
    </div>
  );
}

export default CountryList;
