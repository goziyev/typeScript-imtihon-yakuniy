import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/loader";
import styled from "@emotion/styled";
import { PriceType, radioButtons } from "../../components/elements";
import { DataContext } from "../../App";
import LinearDimensions from "../../components/chart";
import parse from "html-react-parser";

const Wrapper = styled.div`
  display: flex;
  max-width: 1880px;
  width: 100%;
  gap: 10px;
  margin: 25px auto 50px;
  justify-content: space-between;
`;

const DetailWrapper = styled.div`
  border-right: 2px solid #808080;
  display: flex;
  max-width: 25%;
  width: 100%;
  min-height: 630px;
  height: auto;
  flex-direction: column;
  padding: 0px 20px;
  img {
    margin: 0px auto;
  }
`;

const DetailTitle = styled.h3`
  font-size: 48px;
  font-weight: 700;
  line-height: 56.02px;
  text-align: center;
  color: white;
  margin: 20px 0px;
  max-width: 545px;
  width: 100%;
`;
const DetailDescription = styled.p`
  max-width: 545px;
  width: 100%;
  font-size: 16px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  margin-bottom: 30px;
`;
const DetailText = styled.div`
  display: flex;
  gap: 7px;
  h3 {
    font-size: 20px;
    font-weight: 700;
    line-height: 32.02px;
    text-align: left;
    margin-bottom: 8px;
  }
  span {
    line-height: 32.02px;
    text-align: left;
    letter-spacing: 2.5px;
    font-size: 18px;
  }
`;
const SelectPrice = styled.div`
  width: 73%;
  display: flex;
  gap: 38px;
  input {
    display: none;
  }
  label {
    display: inline-block;
    padding: 11px 21px;
    width: 220px;
    border: 1px solid #87ceeb;
    height: 41px;
    border-radius: 6px;
    font-family: Montserrat;
    font-size: 16px;
    font-weight: 500;
    line-height: 19.5px;
    text-align: left;
    cursor: pointer;
  }
  input[type="radio"]:checked + label {
    background-color: #87ceeb;
    color: black;
    font-family: 700;
  }
`;
const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
function ProductDetail() {
  const [product, setProduct] = useState({});
  const [pricetype, setPriceType] = useState("24");
  const [type, setType] = useContext(DataContext);
  const [loader, setLoader] = useState(false);
  const navigate = useNavigate();
  const { crypto } = useParams();

  useEffect(() => {
    if (crypto) {
      setLoader(true);
      fetch(`https://api.coingecko.com/api/v3/coins/${crypto}`)
        .then((res) => res.json())
        .then((el) => {
          setProduct(el);

          setLoader(false);
        })
        .catch((error) => {
          console.log(
            "apidan malumotlarni olishda hatolik yuzaga keldi ProductDetail sahifasida ",
            error
          );
        });
    } else {
      navigate("/");
    }
  }, []);

  const handlePriceTypeChange = (event) => {
    setPriceType(event.target.value);
  };
  const firstSentence = String(product?.description?.en).split(".")[0];

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <Wrapper>
          <DetailWrapper>
            <img src={product?.image?.large} width={200} alt="" />
            <DetailTitle>{product?.name}</DetailTitle>
            <DetailDescription>{parse(`${firstSentence}`)}</DetailDescription>
            <DetailText>
              <h3> Rank :</h3>
              <span> {product?.market_cap_rank}</span>
            </DetailText>
            <DetailText>
              <h3>Current Price :</h3>
              <span>
                {PriceType(type)}
                {product?.market_data?.market_cap[type]}
              </span>
            </DetailText>

            <DetailText>
              <h3> Market Cap :</h3>{" "}
              <span>
                {PriceType(type)}
                {product?.market_data?.current_price[type]}
              </span>
            </DetailText>
          </DetailWrapper>
          <ColumnWrapper>
            <LinearDimensions id={crypto} days={pricetype} />
            <SelectPrice>
              {radioButtons.map((button) => (
                <div key={button.id}>
                  <input
                    type="radio"
                    id={button.id}
                    name="priceType"
                    value={button.value}
                    checked={pricetype === button.value}
                    onChange={handlePriceTypeChange}
                  />
                  <label htmlFor={button.id}>{button.label}</label>
                </div>
              ))}
            </SelectPrice>
          </ColumnWrapper>
        </Wrapper>
      )}
    </>
  );
}

export default ProductDetail;
