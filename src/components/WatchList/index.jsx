import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import styled from "@emotion/styled";
import { useLocation } from "react-router-dom";

const Button = styled.button`
  padding: 8px 18px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: 500;
  line-height: 24.5px;
  letter-spacing: 0.4000000059604645px;
  text-align: center;
  border: none;
  cursor: pointer;
  border-radius: 7px;
  background-color: #87ceeb;
`;

const ListTitle = styled.h3`
  font-family: Roboto;
  margin-top: 32px;
  font-size: 30px;
  font-weight: 500;
  line-height: 24.5px;
  letter-spacing: 0.4000000059604645px;
  text-align: center;
`;

const NotData = styled.p`
  font-size: 18px;
  text-align: center;
  margin-top: 25px;
`;
const ModalItemsWrapper = styled.div`
  display: flex;
  gap: 41px 36px;
  flex-wrap: wrap;
  padding: 36px;
`;

const ModalItem = styled.div`
  padding: 17px 30px;
  display: flex;
  flex-direction: column;
  background-color: #14161a;
  width: 198px;
  align-items: center;
  border-radius: 15px;
  p {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15000000596046448px;
    text-align: right;
    color: white;
    margin-top: 37px;
    margin-bottom: 15px;
  }
  button {
    font-family: Roboto;
    font-size: 20px;
    font-weight: 400;
    line-height: 20.02px;
    letter-spacing: 0.15000000596046448px;
    text-align: right;
    background-color: red;
    color: white;
    padding: 5px 17px;
    border: none;
    cursor: pointer;
  }
`;

export default function AnchorTemporaryDrawer() {
  const location = useLocation();
  const [state, setState] = React.useState({
    right: false,
  });
  const [data, setData] = React.useState(
    JSON.parse(localStorage.getItem("cardData")) || []
  );
  React.useEffect(() => {
    if (localStorage.getItem("cardData")) {
      setData(JSON.parse(localStorage.getItem("cardData")));
    }
  }, [location.pathname]);
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const updateData = (newData) => {
    setData(newData);
    localStorage.setItem("cardData", JSON.stringify(newData));
  };

  const removeItem = (index) => {
    const newData = [...data];
    newData.splice(index, 1);
    updateData(newData);
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 511 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Divider />
      <ListTitle>WATCHLIST</ListTitle>
      <ModalItemsWrapper>
        {data.length > 0 ? (
          data.map((el, index) => (
            <ModalItem key={index}>
              <img src={el.image} alt="" width={120} />
              <p>₹{el.current_price}</p>
              <button onClick={() => removeItem(index)}>Remove</button>
            </ModalItem>
          ))
        ) : (
          <NotData>You do not have any preferred currencies !!!</NotData>
        )}
      </ModalItemsWrapper>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>WATCHLIST</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
