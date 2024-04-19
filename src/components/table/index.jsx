import styled from "@emotion/styled";
import eye from "../../assets/Eye.svg";
import eyeGreen from "../../assets/greenEye.svg";
import { Container, PriceType } from "../elements";
import { useNavigate } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import { useContext, useEffect, useState } from "react";
import Loader from "../loader";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { DataContext } from "../../App";
const TableTitle = styled.h2`
  font-family: Montserrat;
  font-size: 34px;
  font-weight: 400;
  line-height: 41.99px;
  letter-spacing: 0.25px;
  text-align: center;
  margin-top: 18px;
  margin-bottom: 12.98px;
`;

const TableInput = styled.input`
  color: white;
  width: 100%;
  padding: 25px 14px 20px;
  background-color: transparent;
  border: 1px solid #4a4c4f;
  & ::placeholder {
    font-family: Roboto;
    font-size: 16px;
    font-weight: 400;
    line-height: 16px;
    letter-spacing: 0.15000000596046448px;
    text-align: center;
  }
  border-radius: 7px;
  margin-bottom: 20px;
`;
const Wrapper = styled.div`
  padding: 0px 24px;
  margin-bottom: 20px;
`;
const TableWrapper = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

const Thead = styled.thead`
  background-color: #87ceeb;
  border-radius: 15px;
  & tr {
    border-radius: 10px;
    font-family: Montserrat;
    font-size: 14px;
    font-weight: 700;
    line-height: 24px;
    letter-spacing: 0.15000000596046448px;
    text-align: left;
    color: black;
    & th:nth-of-type(1) {
      padding-left: 16px;
      width: 25%;
      border-top-left-radius: 7px;
    }
    & th:nth-of-type(2) {
      width: 20%;
      text-align: right;
    }
    & th:nth-of-type(3) {
      width: 22%;
      text-align: center;
    }
    & th:nth-of-type(4) {
      padding-right: 16px;
      width: 13%;
      text-align: right;
      border-top-right-radius: 7px;
    }
  }
`;
const TableHeadCell = styled.th`
  padding: 19px 0px;
  border: none;
`;
const TableRow = styled.tr`
  cursor: pointer;
  border-bottom: 1px solid #4a4c4f;
  background-color: #16171a;
  & td:nth-of-type(2) {
    text-align: right;
  }
  & td:nth-of-type(3) {
    text-align: center;
  }
  & td:nth-of-type(4) {
    text-align: right;
    padding-right: 16px;
  }
`;
const TableCell = styled.td`
  padding: 16px 16px 27px;
`;
const TableImgText = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  & div h3 {
    text-transform: uppercase;
    font-size: 22px;
    font-weight: 400;
    line-height: 31.46px;
    letter-spacing: 0.15000000596046448px;
    text-align: left;
  }
  & p {
    font-family: Roboto, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15000000596046448px;
    text-align: left;
    color: #a9a9a9;
  }
`;
const TableBodyPrice = styled.td`
  font-size: 14px;
  font-weight: 400;
  line-height: 20.02px;
  letter-spacing: 0.15000000596046448px;
  text-align: right;
`;
const TablePercentage = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  align-items: center;

  img {
    cursor: pointer;
  }
  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 20.02px;
    letter-spacing: 0.15000000596046448px;
    text-align: right;
  }
`;

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  padding: 20px;
`;
const StyledPaginaiton = styled(PaginationItem)`
  color: white !important;
  && {
    background-color: ${(props) =>
      props.selected ? "#3A3B3F" : "inherit"} !important;
  }
`;

function Table({ data }) {
  const storedData = JSON.parse(localStorage.getItem("cardData")) || [];
  const [elements, setData] = useState(data);
  const [loader, setLoader] = useState(false);
  const [type, setType] = useContext(DataContext);
  async function GetApi(e = 1) {
    setLoader(true);
    try {
      let a = await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${type}&order=gecko_desc&per_page=10&page=${e}&sparkline=false&price_change_percentage=24h`
      );
      let b = await a.json();
      setData(b);
      setLoader(false);
    } catch (error) {
      console.log("apidan malummot olishdagi hatolik table component", error);
    }
  }

  useEffect(() => {
    GetApi();
  }, [type]);
  function handleNavigate(elId, element) {
    if (elId) {
      const isDataExists = storedData.some((item) => item.id === elId);
      if (isDataExists) {
        navigate(`crypto/${elId}`);
        return;
      }
      const updatedData = [...storedData, element];
      localStorage.setItem("cardData", JSON.stringify(updatedData));
      navigate(`crypto/${elId}`);
    } else {
      alert("Malumotlar yetarli emas iltimos qayatdan urining");
    }
  }
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  console.log(PriceType(type));

  return (
    <>
      <Container>
        <Wrapper>
          <TableTitle>Cryptocurrency Prices by Market Cap</TableTitle>
          <TableInput
            type="text"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            placeholder="Search For a Crypto Currency.."
          />
          {loader ? (
            <Loader />
          ) : (
            <TableWrapper>
              <Thead>
                <tr>
                  <TableHeadCell>Coin</TableHeadCell>
                  <TableHeadCell>Price</TableHeadCell>
                  <TableHeadCell>24 h Changes</TableHeadCell>
                  <TableHeadCell>Market Cap</TableHeadCell>
                </tr>
              </Thead>
              <tbody>
                {elements &&
                  elements.length > 0 &&
                  elements
                    .filter((item) =>
                      item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    .map((el, index) => {
                      let a = Number(el.price_change_percentage_24h).toFixed(2);
                      const isDataExists = storedData.some(
                        (item) => item.id === el.id
                      );
                      return (
                        <TableRow
                          key={index}
                          onClick={() => {
                            handleNavigate(el.id, el);
                          }}
                        >
                          <TableCell>
                            <TableImgText>
                              <img src={el.image} alt={el.name} width={50} />
                              <div>
                                <h3>{el.symbol}</h3>
                                <p>{el.name}</p>
                              </div>
                            </TableImgText>
                          </TableCell>
                          <TableBodyPrice>
                            {PriceType(type)} {el.current_price.toFixed(2)}
                          </TableBodyPrice>
                          <td>
                            <TablePercentage>
                              <img
                                src={!isDataExists ? eyeGreen : eye}
                                alt=""
                                width={27}
                                onClick={() => {
                                  navigate(`/crypto/${el.id}`);
                                }}
                              />
                              <p style={{ color: a >= 0 ? "#0ecb81" : "red" }}>
                                {a >= 0 ? `+ ${a}` : ` ${a}`}%
                              </p>
                            </TablePercentage>
                          </td>
                          <TableBodyPrice>
                            {" "}
                            {PriceType(type)}
                            {el.market_cap.toString().slice(0, -6)}M
                          </TableBodyPrice>
                        </TableRow>
                      );
                    })}
              </tbody>
            </TableWrapper>
          )}
          <PaginationWrapper>
            <Stack spacing={2}>
              <Pagination
                count={10}
                onChange={(event, page) => {
                  GetApi(page);
                }}
                renderItem={(item) => (
                  <StyledPaginaiton
                    slots={{
                      previous: ArrowBackIosIcon,
                      next: ArrowForwardIosIcon,
                    }}
                    {...item}
                  />
                )}
              />
            </Stack>
          </PaginationWrapper>
        </Wrapper>
      </Container>
    </>
  );
}

export default Table;
