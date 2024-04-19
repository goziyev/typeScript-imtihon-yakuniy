import styled from "@emotion/styled";
import Carusel from "../../components/carusel";
import rasm from "../../assets/caruselBackground.jpg";
import { useContext, useEffect, useState } from "react";
import Table from "../../components/table";
import Loader from "../../components/loader";
import { DataContext } from "../../App";

const CaruselBackground = styled.div`
  background-image: url(${rasm});
  background-size: cover;
  background-position: center;
  height: 400px;
`;
const Title = styled.h2`
  font-family: Montserrat;
  font-size: 60px;
  font-weight: 700;
  line-height: 72px;
  letter-spacing: -0.5px;
  text-align: center;
  color: #87ceeb;
  margin-bottom: 10px;
  padding-top: 69px;
`;
const CaruselDesc = styled.p`
  font-family: Montserrat;
  font-size: 14px;
  font-weight: 500;
  line-height: 21.98px;
  letter-spacing: 0.10000000149011612px;
  text-align: center;
  color: #a9a9a9;
  margin-bottom: 40px;
`;


function Home() {
  const [products, setProducts] = useState([]);
  const [loader, setLoader] = useState(true);
  const [type,setType] =  useContext(DataContext)

  async function GetApi(e = 1) {
    setLoader(true);
    try {
      let a = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${type}&order=gecko_desc&per_page=10&page=${e}&sparkline=false&price_change_percentage=24h`
      );
      let b = await a.json();
      setProducts(b);
      setLoader(false);
    } catch (error) {
      console.log("apidan malummot olishdagi hatolik table component", error);
    }
  }
  useEffect(() => {
    GetApi();
  }, [type]);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          <CaruselBackground>
            <Title>CRYPTOFOLIO WATCH LIST</Title>
            <CaruselDesc>
              Get all the Info regarding your favorite Crypto Currency
            </CaruselDesc>
            <Carusel data={products} />
          </CaruselBackground>
          <Table data={products} />
        </>
      )}
    </>
  );
}

export default Home;
