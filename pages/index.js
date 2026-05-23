import { useEffect, useState } from "react";

export default function Home() {

  const [nifty, setNifty] = useState("Loading...");
  const [data, setData] = useState([]);

  useEffect(() => {

    async function fetchData() {

      try {

        const response = await fetch(
          "https://www.nseindia.com/api/option-chain-indices?symbol=NIFTY"
        );

        const json = await response.json();

        setNifty(json.records.underlyingValue);

        const optionData = json.records.data.slice(0, 10);

        setData(optionData);

      } catch (error) {
        console.log(error);
      }
    }

    fetchData();

  }, []);

  return (
    <div style={{
      background:"#000",
      color:"#fff",
      minHeight:"100vh",
      padding:"20px",
      fontFamily:"Arial"
    }}>

      <h1 style={{
        color:"#FFD700",
        fontSize:"50px"
      }}>
        OPTION KING
      </h1>

      <h2 style={{color:"lime"}}>
        NIFTY : {nifty}
      </h2>

      <table
        border="1"
        cellPadding="10"
        style={{
          width:"100%",
          marginTop:"30px",
          borderCollapse:"collapse"
        }}
      >

        <thead>
          <tr style={{background:"#111"}}>
            <th>STRIKE</th>
            <th>CE OI</th>
            <th>PE OI</th>
          </tr>
        </thead>

        <tbody>

          {data.map((item,index) => (

            <tr key={index}>

              <td>{item.strikePrice}</td>

              <td>
                {item.CE?.openInterest || "-"}
              </td>

              <td>
                {item.PE?.openInterest || "-"}
              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}
