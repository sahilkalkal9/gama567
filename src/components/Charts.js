import React, { useEffect, useState } from 'react';
import apiInstance from '../utils/axios';
import { Link } from 'react-router';


const Charts = () => {
  const [chartSections, setChartSections] = useState([
    { title: "STARLINE CHARTS", charts: [] },
    { title: "JACKPOT CHARTS", charts: [] },
    { title: "PANNA CHARTS", charts: [] },
    { title: "JODI CHARTS", charts: [] },
  ]);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await apiInstance.get("/api/marketManagement/getMarketGames");

        const starlineResponse = await apiInstance.get('/api/starline/getGameListWeb');
        const jackpotChartsResponse = await apiInstance.get('/api/GaliDisawar/getAllMarketWeb');



        const data = response.data



        const pannaCharts = data.map((sa) => ({
          name: sa.gameName,
          link: `/panna-chart/${sa.gameName}`,
        }));

        const jodiCharts = data.map((sa) => ({
          name: sa.gameName,
          link: `/jodi-chart/${sa.gameName}`,
        }));

        const starlineCharts = starlineResponse.data.data.map((sa) => ({
          name: sa.game_name,
          link: `/mrecords/${sa.game_name}-starline-chart`,
        }));

        const jackpotCharts = jackpotChartsResponse.data.data.map((sa) => ({
          name: sa.game_name,
          link: `/jackpot-chart/${sa.game_name}`,
        }));

        setChartSections([
          { title: "STARLINE CHARTS", charts: starlineCharts },
          { title: "JACKPOT CHARTS", charts: jackpotCharts },
          { title: "PANNA CHARTS", charts: pannaCharts },
          { title: "JODI CHARTS", charts: jodiCharts },

        ]);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="flex flex-col items-center min-h-screen mt-20">
      <div className="w-full">
        {chartSections.map((section, index) => (
          <div key={index} className="mb-8">
            <h2 className="chartHeading text-xl font-bold mb-4 p-2 text-white bg-red-500 rounded-sm">
              {section.title}
            </h2>
            <div className='flex flex-col gap-[.2cm] ' >
              {
                section.charts && section.charts.map((sa) => (
                  <Link to={sa.link} >
                    <p className='border py-[.2cm] text-center text-orange font-bold cursor-pointer ' >
                      {sa.name}
                    </p>
                  </Link>
                ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Charts;
