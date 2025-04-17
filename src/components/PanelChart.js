import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';

const PanelChart = () => {
  const { gameName } = useParams();
  const navigate = useNavigate();
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [gameTitle, setGameTitle] = useState('');
  const [chartType, setChartType] = useState('panel');
  const [resultType, setResultType] = useState('single');

  // 🧪 Mock data for development
  const mockData = [
    [
      { date: "2025-04-01", displayValue: "12-34-56" },
      { date: "2025-04-02", displayValue: "22-05-77" },
      { date: "2025-04-03", displayValue: "33-94-66" },
      { date: "2025-04-04", displayValue: "11-16-38" },
      { date: "2025-04-05", displayValue: "45-83-88" },
      { date: "2025-04-06", displayValue: "00-27-49" },
      { date: "2025-04-07", displayValue: "39-61-99" }
    ],
    [
      { date: "2025-04-08", displayValue: "01-50-72" },
      { date: "2025-04-09", displayValue: "11-22-83" },
      { date: "2025-04-10", displayValue: "03-05-66" },
      { date: "2025-04-11", displayValue: "41-94-27" },
      { date: "2025-04-12", displayValue: "14-16-05" },
      { date: "2025-04-13", displayValue: "20-83-38" },
      { date: "2025-04-14", displayValue: "33-49-50" }
    ]
  ];

  useEffect(() => {
    const extractedGameName = gameName?.replace(/-panel-chart/, '');
    const apiGameName = extractedGameName?.toLowerCase();

    const formattedName = extractedGameName
      ?.split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    setGameTitle(formattedName);

    const fetchData = async () => {
      try {
        // 👉 Uncomment this block when using the real API
        /*
        const response = await fetch(`https://api.jannatmatka.shop/${apiGameName}-panel-chart`);
        if (!response.ok) throw new Error('Failed to fetch data');
        const data = await response.json();

        setChartData(data.resultData || []);
        setResultType(data.type || 'single');
        */
        
        // ✅ Using mock data during development
        setChartData(mockData);
        setResultType('single');
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

  const handleBack = () => navigate(-1);
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  if (loading) return <div className="text-center py-10">Loading chart data...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="divTable mt-20">
      <div className="gameNameChart">{gameTitle} Panel Chart</div>
      <div className="gameNameDesc">{gameTitle} Panel Chart - Historical Data and Results</div>

      {chartData.length > 0 ? (
        <div className="divResultsTable">
          <table className="clsResultsTable">
            {resultType === 'single' && chartData[0] && (
              <thead>
                <tr>
                  <td className="thChartResult">Date</td>
                  {chartData[0].map((_, index) => (
                    <td key={index} className="thChartResult">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][index] || `Day ${index + 1}`}
                    </td>
                  ))}
                </tr>
              </thead>
            )}

            <tbody>
              {chartData.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  <td className="thChartResult">
                    <div className="tdDate">
                      <div className="dateDivLeft">{row[0]?.date?.split('-')[2]}</div>
                      <div className="dateDivRight flex flex-col">
                        <div className="dateDivTop">
                          {row[0]?.date?.replace(`-${row[0]?.date?.split('-')[2]}`, '')}
                          <br /> to
                        </div>
                        <div className="dateDivBottom">
                          {row[row.length - 1]?.date?.replace(`-${row[row.length - 1]?.date?.split('-')[2]}`, '')}
                        </div>
                      </div>
                    </div>
                  </td>

                  {row.map((cell, colIndex) => {
                    const [p1, val, p2] = cell.displayValue.split('-');
                    const isRed = specialValues.includes(val);
                    return (
                      <td
                        key={colIndex}
                        className={`${isRed ? 'redList' : 'tdChartOrange'} thChartResult`}
                      >
                        <div className="divPanna">
                          <div className="text-xxs">{p1 || ''}</div>
                          <div className="fontResult">{val}</div>
                          <div className="text-xxs">{p2 || ''}</div>
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-5 text-sm text-gray-500">No data available</div>
      )}

      <div className="divBottomButtons mt-5" style={{ visibility: chartData.length ? 'visible' : 'hidden' }}>
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

export default PanelChart;
