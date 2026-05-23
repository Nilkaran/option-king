import { useEffect, useState } from "react";

export default function Home() {

  const [nifty, setNifty] = useState("Loading...");

  useEffect(() => {

    async function fetchData() {
      try {

        const response = await fetch(
          "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
        );

        const data = await response.json();

        setNifty(data.records.underlyingValue);

      } catch (error) {
        setNifty("LIVE DATA ERROR");
      }
    }

    fetchData();

  }, []);

  return (
    <div style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      padding:"30px",
      fontFamily:"Arial"
    }}>

      <img 
  src="/optionking.png"
  width="200"
/>

      <div style={{
        background:"#111",
        padding:"25px",
        borderRadius:"20px",
        marginTop:"30px"
      }}>

        <h2>LIVE NIFTY</h2>

        <h1 style={{
          color:"lime",
          fontSize:"50px"
        }}>
          {nifty}
        </h1>

      </div>

    </div>
  );
}
