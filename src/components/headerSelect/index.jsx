import styled from "@emotion/styled";
import { useContext, useEffect } from "react";
import { DataContext } from "../../App";

const Select = styled.div`
  select {
    background: transparent;
    border: none;
    color: white;
    padding: 10px;
    outline: none;
    option {
      background: #14161a;
      color: white;
      font-family: Roboto;
      font-size: 16px;
      font-weight: 400;
      line-height: 19px;
      letter-spacing: 0.15000000596046448px;
      text-align: left;
    }
  }
`;
function HeaderSelect() {
  const [type, setType] = useContext(DataContext);
  useEffect(() => {
    if (localStorage.getItem("type")) {
      setType(localStorage.getItem("type"));
    }
  }, []);
  return (
    <Select>
      <select
        value={type}
        onChange={(e) => {
          localStorage.setItem("type", e.target.value);
          setType(e.target.value);
        }}
      >
        <option value="usd">USD</option>
        <option value="rub">RUB</option>
        <option value="eur">EUR</option>
      </select>
    </Select>
  );
}

export default HeaderSelect;
