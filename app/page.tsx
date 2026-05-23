"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [price, setPrice] = useState("Loading...");
  const [signal, setSignal] = useState("WAIT");

  async function fetchData() {
    try {
      const res = await fetch(
        "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
      );

      const data = await res.json();

      const spot = data.records.underlyingValue;

      setPrice(spot);

      if (spot > 25000) {
        setSignal("BULLISH 🚀");
      } else {
        setSignal("BEARISH 🔻");
      }
    } catch (err) {
      setPrice("LIVE ERROR");
    }
  }

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main
      style={{
        background: "#000",
        color: "#fff",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>OPTION KING 👑</h1>

      <h2 style={{ fontSize: "45px", marginTop: "20px" }}>
        NIFTY: {price}
      </h2>

      <h3 style={{ fontSize: "35px", color: "lime" }}>{signal}</h3>
    </main>
  );
}
