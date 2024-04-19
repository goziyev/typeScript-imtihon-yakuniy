import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, PriceType } from "../elements";
import styled from "@emotion/styled";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { DataContext } from "../../App";

const Wrapper = styled.div`
  .slick-prev,
  .slick-next {
    display: none !important;
  }
`;
const StyledSlider = styled(Slider)`
  display: flex;
  margin: 0px auto;
  justify-content: space-around;
  padding-left: 150px;
`;
const SliderItem = styled.div`
  outline: none;
  max-width: 140px !important;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: center;
  text-align: center;
  img {
    cursor: pointer;
    margin: 10px auto;
  }
`;
const SliderTitle = styled.h3`
  font-family: Roboto, sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 18.75px;
  text-align: center;
  text-transform: uppercase;
  span {
    margin-left: 7px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20.02px;
    letter-spacing: 0.15000000596046448px;
  }
`;

const SliderPrice = styled.p`
  font-family: Roboto;
  font-size: 21.83px;
  font-weight: 500;
  line-height: 25.58px;
  text-align: center;
`;
const Carusel = ({ data }) => {
  const navigate = useNavigate();
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  function handleNavigate(elId, element) {
    if (elId) {
      const storedData = JSON.parse(localStorage.getItem("cardData")) || [];
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

  const [type, setType] = useContext(DataContext);

  return (
    <Wrapper>
      <Container>
        <StyledSlider {...settings}>
          {data.length > 0 &&
            data.map((el, index) => {
              let a = Number(el.price_change_percentage_24h).toFixed(2);
              return (
                <SliderItem
                  key={index}
                  onClick={() => {
                    handleNavigate(el.id, el);
                  }}
                >
                  <img width={80} height={80} src={el.image} alt="slide1" />
                  <SliderTitle>
                    {el.symbol}
                    <span style={{ color: a >= 0 ? "#0ecb81" : "red" }}>
                      {a >= 0 ? `+ ${a}` : ` ${a}`}%
                    </span>
                  </SliderTitle>
                  <SliderPrice>
                    {" "}
                    {PriceType(type)} {el.current_price.toFixed(2)}
                  </SliderPrice>
                </SliderItem>
              );
            })}
        </StyledSlider>
      </Container>
    </Wrapper>
  );
};
Carusel.propTypes = {
  data: PropTypes.any.isRequired,
};

export default Carusel;
