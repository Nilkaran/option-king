import { useEffect, useState } from "react";

export default function Home() {

  const [nifty, setNifty] = useState("Loading...");
  const [signal, setSignal] = useState("WAIT");
  const [color, setColor] = useState("white");
  const [time, setTime] = useState("");

  async function fetchData() {

    try {

      const response = await fetch(
        "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
      );

      const json = await response.json();

      setNifty(json.records.underlyingValue);

      const data = json.records.data;

      let totalCE = 0;
      let totalPE = 0;

      data.forEach((item) => {

        totalCE += item.CE?.openInterest || 0;
        totalPE += item.PE?.openInterest || 0;

      });

      if (totalPE > totalCE) {

        setSignal("BULLISH 🚀");
        setColor("lime");

      } else {

        setSignal("BEARISH 🔻");
        setColor("red");

      }

      const now = new Date().toLocaleTimeString();

      setTime(now);

    } catch (error) {

      setSignal("LIVE DATA ERROR");

    }

  }

  useEffect(() => {

    fetchData();

    const interval = setInterval(() => {

      fetchData();

    }, 5000);

    return () => clearInterval(interval);

  }, []);

  return (

    <div style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      padding:"30px",
      fontFamily:"Arial"
    }}>

      <h1 style={{
        color:"#FFD700",
        fontSize:"60px"
      }}>
        OPTION KING
      </h1>

      <div style={{
        background:"#111",
        padding:"25px",
        borderRadius:"20px",
        marginTop:"30px"
      }}>

        <h2>NIFTY LIVE</h2>

        <h1 style={{
          color:"cyan",
          fontSize:"55px"
        }}>
          {nifty}
        </h1>

      </div>

      <div style={{
        background:"#111",
        padding:"25px",
        borderRadius:"20px",
        marginTop:"30px"
      }}>

        <h2>MARKET SIGNAL</h2>

        <h1 style={{
          color:color,
          fontSize:"65px"
        }}>
          {signal}
        </h1>

      </div>

      <div style={{
        marginTop:"20px",
        color:"gray"
      }}>

        LAST UPDATED : {time}

      </div>

    </div>

  );
}
