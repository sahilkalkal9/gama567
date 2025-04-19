import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import apiInstance from '../utils/axios';

const PannaChart = () => {
  const { gameNamePanna } = useParams();
  const navigate = useNavigate();
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const selectedGameName = gameNamePanna || "";

  useEffect(() => {
    async function fetchGameResults() {
      try {
        const response = await apiInstance.get("/api/mainmarketdeclareResult/DeclareResult");
        const results = response.data.results || [];

        const filteredResults = results.filter(
          (item) =>
            item.gameName.trim().toLowerCase() === selectedGameName.trim().toLowerCase()
        );

        const groupedData = {};
        filteredResults.forEach((item) => {
          const date = item.date;
          if (!groupedData[date]) {
            groupedData[date] = { date, open: null, close: null, jodi: "**" };
          }
          if (item.gameType.toLowerCase() === "open") {
            groupedData[date].open = `${item.panna}`;
          }
          if (item.gameType.toLowerCase() === "close") {
            groupedData[date].close = `${item.panna}`;
          }
        });

        Object.keys(groupedData).forEach((date) => {
          const openPanna = groupedData[date].open;
          const closePanna = groupedData[date].close;
          if (openPanna && closePanna) {
            const openSum = openPanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            const closeSum = closePanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            groupedData[date].jodi = `${openSum % 10}${closeSum % 10}`;
          } else if (openPanna) {
            const openSum = openPanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            groupedData[date].jodi = `${openSum % 10}*`;
            groupedData[date].close = groupedData[date].close || "***";
          } else if (closePanna) {
            const closeSum = closePanna.split("").reduce((acc, num) => acc + parseInt(num), 0);
            groupedData[date].jodi = `*${closeSum % 10}`;
            groupedData[date].open = groupedData[date].open || "***";
          } else {
            groupedData[date].open = "***";
            groupedData[date].close = "***";
            groupedData[date].jodi = "**";
          }
        });

        const finalData = Object.values(groupedData).sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setDataSource(finalData);
      } catch (error) {
        console.error("Error fetching results:", error);
        setError("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    fetchGameResults();
  }, [selectedGameName]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) return <div className="text-center py-10">Loading chart data...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="divTable mt-10">
      <div className="gameNameChart text-xl font-bold mb-2">{selectedGameName} Jodi Chart</div>
      <div className="gameNameDesc text-sm mb-4 text-gray-600">
        {selectedGameName} Jodi Chart - Historical Data and Results
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full text-center border border-gray-300">
          <thead className="bg-orange text-white">
            <tr>
              <th className="border px-4 py-2">Date</th>
              <th className="border px-4 py-2">Open</th>
              <th className="border px-4 py-2">Jodi</th>
              <th className="border px-4 py-2">Close</th>
            </tr>
          </thead>
          <tbody>
            {dataSource.map((d, index) => (
              <tr key={index} className="border-t">
                <td className="border px-4 py-2">{d.date}</td>
                <td className="border px-4 py-2">{d.open}</td>
                <td className="border px-4 py-2">{d.jodi}</td>
                <td className="border px-4 py-2">{d.close}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="divBottomButtons mt-6 flex gap-4 justify-center">
        <button
          onClick={handleBack}
          className="text-sm md:text-base px-4 py-2 shadow font-medium bg-orange border-orange text-white rounded-lg"
        >
          Back
        </button>
        <button
          onClick={scrollToTop}
          className="text-sm md:text-base px-4 py-2 shadow font-medium bg-orange border-orange text-white rounded-lg"
        >
          Go to Top
        </button>
      </div>
    </div>
  );
};

export default PannaChart;
