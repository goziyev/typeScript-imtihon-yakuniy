import styled from "@emotion/styled";
import { Container } from "../elements";
import HeaderSelect from "../headerSelect";
import WatchList from "../WatchList";
import { useNavigate } from "react-router-dom";
const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 0px;
  align-items: center;
`;
const SelectAndModal = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
`;

const Title = styled.h3`
  font-family: Montserrat;
  font-size: 20px;
  font-weight: 700;
  line-height: 32px;
  cursor: pointer;
  letter-spacing: 0.15000000596046448px;
  text-align: left;
  color: #87ceeb;
`;
function Header() {
  const navigate = useNavigate();
  return (
    <Container>
      <HeaderWrapper>
        <Title onClick={() => {navigate("/")}}>
          CRYPTOFOLIO
        </Title>
        <SelectAndModal>
          <HeaderSelect />
          <WatchList />
        </SelectAndModal>
      </HeaderWrapper>
    </Container>
  );
}

export default Header;
