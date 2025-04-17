import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const JodiChart = () => {
  const { gameName } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameTitle, setGameTitle] = useState('');

  useEffect(() => {
    const extractedGameName = gameName?.toLowerCase(/-jodi-chart/, '');

    const formattedName = extractedGameName
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    setGameTitle(formattedName);

    const fetchData = async () => {
      try {
        const response = await fetch(`https://api.jannatmatka.shop/${extractedGameName}-jodi-chart`);
        if (!response.ok) throw new Error("Failed to fetch chart data");
        const data = await response.json();
        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [gameName]);

  const specialValues = [
    '00', '11', '22', '33', '44', '55', '66', '77', '88', '99',
    '05', '50', '16', '61', '27', '72', '38', '83', '49', '94', '**'
  ];

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
      <div className="gameNameChart">{gameTitle} Jodi Chart</div>
      <div className="gameNameDesc">{gameTitle} Jodi Chart - Historical Data and Results</div>

      <div className="divResultsTable mt-6">
        <table className="clsResultsTable">
          <thead>
            <tr>
              <td className="thChartResult">Date</td>
              <td className="thChartResult">Open</td>
              <td className="thChartResult">Close</td>
            </tr>
          </thead>
          <tbody>
            {chartData.map((row, index) => {
              const isOpenRed = specialValues.includes(row.open);
              const isCloseRed = specialValues.includes(row.close);
              return (
                <tr key={index}>
                  <td className="thChartResult">{row.date}</td>
                  <td className={`fontResult thChartResult ${isOpenRed ? 'redList' : ''}`}>{row.open}</td>
                  <td className={`fontResult thChartResult ${isCloseRed ? 'redList' : ''}`}>{row.close}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="divBottomButtons mt-6">
        <button
          onClick={handleBack}
          className="text-sm md:text-base px-2 w-20 h-7 shadow font-medium bg-orange border-orange text-white rounded-lg"
        >
          Back
        </button>
        <button
          onClick={scrollToTop}
          className="text-sm md:text-base px-2 w-25 h-7 shadow font-medium bg-orange border-orange text-white rounded-lg"
        >
          Go to Top
        </button>
      </div>
    </div>
  );
};

export default JodiChart;
