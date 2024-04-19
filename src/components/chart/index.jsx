import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { CircularProgress, createTheme, ThemeProvider } from "@mui/material";

import { useContext } from "react";
import { DataContext } from "../../App";
import styled from "@emotion/styled";
import Loader from "../loader";

const LinearDimensions = ({ id, days }) => {
  const [type, setType] = useContext(DataContext);
  const [product, setProduct] = useState([]);
  const [loader, setLoader] = useState(false);

  const fetchData = async () => {
    setLoader(true);
    try {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${type}&days=${days}`
      );

      const b = await response.json();
      setProduct(b.prices);
      setLoader(false);
      console.log(b, product);
    } catch (error) {
      console.error("Chart componentda hatolik keldi :", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [days]);

  const Container = styled.div`
    max-width: 1292px;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 25;
    padding: 40;
  `;

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <Container>
        {!product || loader ? (
          <Loader />
        ) : (
          <>
            <Line
              data={{
                labels: product?.map((coin) => {
                  let date = new Date(coin[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),
                datasets: [
                  {
                    data: product.map((coin) => coin[1]),
                    label: `Price ( Past ${days} Days ) in ${type}`,
                    borderColor: "skyblue",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
          </>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default LinearDimensions;
