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

      setTime(new Date().toLocaleTimeString());

    } catch (error) {

      setSignal("LIVE ERROR");

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
      minHeight:"100vh",
      padding:"20px",
      fontFamily:"Arial",
      color:"#fff"
    }}>

      <div style={{
        textAlign:"center",
        marginBottom:"30px"
      }}>

        <h1 style={{
          color:"#FFD700",
          fontSize:"55px"
        }}>
          OPTION KING
        </h1>

        <p style={{
          color:"gray"
        }}>
          LIVE OPTION CHAIN SIGNALS
        </p>

      </div>

      <div style={{
        background:"#111",
        padding:"25px",
        borderRadius:"20px",
        marginBottom:"20px",
        textAlign:"center",
        boxShadow:"0px 0px 15px #222"
      }}>

        <h2 style={{color:"cyan"}}>NIFTY LIVE</h2>

        <h1 style={{
          fontSize:"60px"
        }}>
          {nifty}
        </h1>

      </div>

      <div style={{
        background:"#111",
        padding:"25px",
        borderRadius:"20px",
        textAlign:"center",
        boxShadow:"0px 0px 15px #222"
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
        textAlign:"center",
        color:"gray"
      }}>

        LAST UPDATED : {time}

      </div>

    </div>

  );
}
