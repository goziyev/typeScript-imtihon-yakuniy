import styled from "@emotion/styled";
import { NavLink } from "react-router-dom";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  gap: 50px;
  h3 {
    font-size: 80px;
    color: white;
    font-weight: 700;
    text-transform: uppercase;
  }
`;

const NavLinkButton = styled(NavLink)`
  padding: 15px 25px;
  font-weight: 700;
  font-size: 15px;
  border-radius: 10px;
  border: none;
  color: white;
  display: inline-block;
  background-color: transparent;
  text-decoration: none;
  border: 2px solid white;
  cursor: pointer;
  transition: 0.4s;
  :hover {
    background-color: white;
    color: black;
  }
`;

function ErrorPage() {
  return (
    <Wrapper>
      <h3>page not found </h3>
      <NavLinkButton to="/">Go to Home</NavLinkButton>
    </Wrapper>
  );
}

export default ErrorPage;
