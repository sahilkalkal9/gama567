import React, { useEffect, useState } from "react";
import {
  FaHandPointRight,
  FaPhone,
  FaWhatsapp,
  FaPlayCircle,
} from "react-icons/fa";
import apiInstance from "../utils/axios";
import moment from 'moment';

function Hero() {
  const [pricing, setPricing] = useState([]);
  const [games, setGames] = useState([]);
  const [charts, setCharts] = useState([]);
  const [declaredResults, setDeclaredResults] = useState([]);

  const today = moment().format("YYYY-MM-DD");
  // Fetch declared results for charts



  const getResultStringForGame = (gameName) => {
    const gameResults = declaredResults.filter(
      (item) =>
        item.gameName.trim().toUpperCase() === gameName.trim().toUpperCase()
    );
    const openResult = gameResults.find((item) => item.gameType === "open");
    const closeResult = gameResults.find((item) => item.gameType === "close");

    if (openResult && closeResult) {
      return `${openResult.panna}-${openResult.digit}${closeResult.digit}-${closeResult.panna}`;
    } else if (openResult && !closeResult) {
      return `${openResult.panna}-${openResult.digit}*-***`;
    } else if (!openResult && closeResult) {
      return `***-*${closeResult.digit}-${closeResult.panna}`;
    } else {
      return "***-**-***";
    }
  };

  // Fetch market games
  const fetchGames = async () => {
    try {
      const response = await apiInstance.get("/api/marketManagement/getMarketGames");
      const data = response.data || [];
      // Filter out games that are not active.
      const activeGames = data.filter((game) => game.isActive);

      // Determine current day name (e.g., "Sunday")
      const currentDay = moment().format("dddd");

      // Map and update each game based on the weekend schedule.
      const mappedGames = activeGames.map((game) => {
        // Look for the weekend record matching the current day.
        const weekendRecord = game.weekends.find(
          (item) => item.day.toLowerCase() === currentDay.toLowerCase()
        );

        // Default values: use main game times and main open status if no weekend record exists.
        let status = game.is_open ? "Running" : "Closed for today";
        let displayOpenTime = game.openTime;
        let displayCloseTime = game.closeTime;
        const gameName = game.gameName || game.name || 'unknown-game';

        const cleanGameName = gameName.toString()
          .toLowerCase()
          .replace(/\s+/g, '-')
          .replace(/[^a-z0-9-]/g, '');

        if (weekendRecord) {
          // Check if the market is active on the current day.
          if (!weekendRecord.is_on) {
            // Market is off for today.
            status = "Closed for today";
            displayOpenTime = weekendRecord.openTime;
            displayCloseTime = weekendRecord.closeTime;
          } else {
            // Market is on, now check if bidding is open.
            if (!weekendRecord.is_open) {
              status = "Closed for today";
              displayOpenTime = weekendRecord.openTime;
              displayCloseTime = weekendRecord.closeTime;
            } else {
              status = "Running";
            }
          }
        }

        return {
          name: game.gameName.toUpperCase(),
          originalName: game.gameName,
          openTime: displayOpenTime,
          closeTime: displayCloseTime,
          status,
          createdAt: game.createdAt,
          jodiChart: `/mrecords/${cleanGameName}-jodi-chart`,
          pannaChart: `/mrecords/${cleanGameName}-panel-chart`,
        };
      });

      // Sort games by their createdAt time.
      const sortedGames = mappedGames.sort((a, b) =>
        moment(a.createdAt).diff(moment(b.createdAt))
      );
      setGames(sortedGames);
    } catch (error) {
      console.error("Error fetching games:", error);
    }
  };

  const fetchDeclaredResults = async () => {
    try {
      const response = await apiInstance.get("/api/mainmarketdeclareResult/DeclareResult");
      const results = response.data.results || [];
      const todayResults = results.filter(
        (item) => item.date === today && item.marketName === "Main Market"
      );
      setDeclaredResults(todayResults);
      // const data = await response.json();
      // console.log(results)
      setCharts(response.data.results ? Object.entries(response.data.results) : []);
    } catch (error) {
      console.error("Error fetching declared results:", error);
    }
  };

  useEffect(() => {
    fetchGames();
  }, []);

  useEffect(() => {
    fetchDeclaredResults();
  }, [today]);





  // console.log(declaredResults)

  




  const [gameRatesObject, setGameRatesObject] = useState({});
  const [gameRatesArray, setGameRatesArray] = useState([]);

  useEffect(() => {
    const fetchGameRates = async () => {
      try {
        const response = await apiInstance.get("/api/rates/getBetRatesWeb");
        setGameRatesObject(response.data);
      } catch (err) {
        console.error("Error fetching game rates:", err);
      }
    };

    fetchGameRates();
  }, []);

  useEffect(() => {
    const requiredKeys = [
      { key: "singleDigits", label: "Single Digit" },
      { key: "jodi", label: "Jodi Digit" },
      { key: "doublePana", label: "Double Pana" },
      { key: "halfSangamA", label: "Half Sangam A" },
      { key: "redBracket", label: "Red Bracket" },
      { key: "singlePana", label: "Single Pana" },
      { key: "triplePana", label: "Triple Pana" },
      { key: "fullSangam", label: "Full Sangam" },
    ];

    const convertObjectToArray = () => {
      const convertedArray = requiredKeys.map(({ key, label }) => ({
        rateLabel: label,
        rate: gameRatesObject[key] ?? 0,
        valueLabel: `${key}Value`,
        value: gameRatesObject[`${key}Value`] ?? 0,
      }));

      setGameRatesArray(convertedArray);
    };

    if (Object.keys(gameRatesObject).length > 0) {
      convertObjectToArray();
    }
  }, [gameRatesObject]);

  // console.log("Charts : ", charts)
  // console.log("Declared Results : ", declaredResults)

  // console.log("games : ", games)











  return (
    <div className=" " >

      <a href="https://wa.me/+916367591857" target="blank" className="whatsapp-icon-div">
        <FaWhatsapp name="whatsapp" size={26} color="white" />

      </a>


      <div className="flex flex-col items-center min-h-screen mt-10">
        <section className="flex flex-col w-full text-center header mt-4">
          <div className="z-10">
            <h1 className="text-3xl md:text-6xl font-bold">
              Welcome to <span className="text-orange-500">Gama 567</span>
            </h1>
            <p className="mt-3 text-xl md:text-3xl">
              Business Of Faith, With Confidence
            </p>
          </div>
        </section>
        <section id="hero" className="w-full h-72 bg-pink-200 pt-4">
          <div className="max-w-7xl mx-auto px-4 overflow-hidden sm:px-6 lg:px-8">
            <div className="flex justify-center space-x-6">
              <a href="http://download937.mediafire.com/w37wggn9gchgRE-vL-RQM7e-ygfzxof4LgwwIwguPmdrpInFQlRUULgY5Bhew2h4LtAp2Fwf4YexlNeRLcH7KB0x3kgWk86qfisbKjn2jzcsrT91AM-xgu3mk_dMxZYEKjiAvC6QqcQlR8xJl0hA-yIZJbYdmsxBo_y3YBD6qA/fal22t8mcyhgg2t/gama.apk" className="animate-bounce bg-orange-500 p-2 rounded-full w-72 text-white border-white border-2 shadow mt-3">
                <FaHandPointRight className="inline-block text-lg mr-2" />
                Download Now
              </a>
            </div>

            <div className="mt-8 text-center text-base">
              <h3 className="text-2xl text-gray-800">
                <strong> +91 6367591857 </strong>
                <span className="text-gray-500 text-sm"></span>
              </h3>
            </div>

            <div className="mt-6 flex justify-center space-x-6">
              <a
                className="bg-white border-orange-500 p-3 rounded-full text-gray-800 w-48 border-2 shadow text-center"
                href="tel:+916367591857"
              >
                <FaPhone className="inline-block mr-2" />
                Call Now
              </a>

              <a
                className="bg-green-600 p-3 rounded-full text-white w-48 border-white border-2 shadow text-center"
                href="https://wa.me/+916367591857"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp className="inline-block mr-2" />
                Whats App
              </a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full h-auto pt-4 p-4 bg-gray-100">
          <div className="text-center my-4">
            <h2 className="text-4xl">
              <strong>
                Game<span className="text-orange-500"> Rates</span>
              </strong>
            </h2>
            <p className="separator">We have Best Game Rates for you</p>

            <br />
            <br />


            <div className="grid grid-cols-2 gap-4">
              {gameRatesArray && gameRatesArray.map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between border-l-[5px] border-l-red-500 px-[.3cm] py-[.25cm] bg-white rounded-[5px]"
                >
                  <div className="w-fit flex items-center gap-[.2cm]">
                    <FaHandPointRight size={20} />
                    <p className="font-bold text-[18px]">
                      {m.rateLabel}
                    </p>
                  </div>
                  <p className="font-bold text-red-500 text-[18px]">
                    {m.rate} RS KA {m.value} RS
                  </p>
                </div>
              ))}
            </div>


          </div>

          <div className="md:grid md:grid-cols-2 md:gap-2">
            {pricing.map((game, index) => (
              <div
                key={index}
                className="grid grid-cols-2 p-4 h-18 text-base md:text-lg my-2 px-2 bg-white shadow border-l-4 border-l-orange-500 rounded-r-lg"
              >
                <div className="text-left">
                  <span>
                    <FaHandPointRight className="inline-block mr-2 text-red-500" />
                    <strong>{game.name}</strong>
                  </span>
                </div>
                <div className="text-right text-orange-500 pr-8">
                  <h2 className="text-red-500 inline-block">
                    <strong>{game.rate}</strong>
                  </h2>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Available Games Section */}
        <section id="availableGames" className="w-full h-auto pt-4 p-4">
          <div className="text-center my-4">
            <h2 className="text-4xl">
              <strong>
                Available<span className="text-orange-500"> Games</span>
              </strong>
            </h2>
            <p className="separator">We have multiple types of games for you</p>
          </div>



          <div
            className="md:grid md:grid-cols-2 md:gap-4"
            id="available-game-row"
          >
            {games.map((game, index) => (
              <div
                key={index}
                className="bg-white rounded-r-lg grid grid-cols-2 pt-2 h-36 text-lg md:text-lg shadow border-l-4 border-l-orange-500 my-2 px-2"
              >
                <div className="mt-4 text-center">
                  <h3 className="">
                    <strong>{game.name}</strong>
                  </h3>
                  <h2 className="text-orange-500">
                    <strong>{getResultStringForGame(game.name)} </strong>
                  </h2>
                  <div>
                    <span>
                      <a
                        className="text-orange-500 viewChartFont"
                        href={game.jodiChart}
                      >
                        {game.jodiChart ? "Digit chart" : "View Chart"}
                      </a>
                    </span>
                    {game.pannaChart && (
                      <>
                        <span> | </span>
                        <span>
                          <a
                            className="text-orange-500 viewChartFont"
                            href={game.pannaChart}
                          >
                            Panna Chart
                          </a>
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <div className="text-right pr-4">
                  <button className=" mr-2">
                    <FaPlayCircle
                      size={60}
                      className="text-orange-500 text-2xl shadow- rounded-full shadow-orange-400 shadow-lg"
                    />
                  </button>
                  <h5 className="mt-2 text-base">
                    <strong>Play Now</strong>
                  </h5>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Charts Section */}
        {/* {charts.length > 0 && (
          <section className="w-full pt-1 p-4">
            <div className="chartHeading">PANNA CHARTS</div>
            <div id="panel-charts">
              {charts.map(([marketName, marketData], index) => (
                <div key={index} className="gameNameRow">
                  <Link
                    to={`../mrecords/${marketName
                      .toLowerCase()
                      .replace(/ /, "-")}-panel-chart`}
                    className="text-link"
                  >
                    {marketName} PANNA CHART
                  </Link>
                </div>
              ))}
            </div>

            <div className="chartHeading">JODI CHARTS</div>
            <div id="jodi-charts">
              {charts.map(([marketName, marketData], index) => (
                <div key={index} className="gameNameRow">
                  <a
                    href={`../mrecords/${marketName
                      .toLowerCase()
                      .replace(/ /, "-")}-jodi-chart`}
                    className="text-link"
                  >
                    {marketName} JODI CHART
                  </a>
                </div>
              ))}
            </div>
          </section>
        )} */}
      </div>
    </div>
  );
}

export default Hero;
