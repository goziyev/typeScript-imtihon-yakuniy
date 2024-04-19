import styled from "@emotion/styled";
import { ClipLoader } from "react-spinners";

const Loader = () => {
  return (
    <>
      <Modal>
        <SpinnerWrapper>
          <ClipLoader color="white" size={120} speedMultiplier={1} />
        </SpinnerWrapper>
      </Modal>

      <ModalBackground></ModalBackground>
    </>
  );
};

const Modal = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  position: fixed;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  overflow: hidden;
  pointer-events: none;
`;

export default Loader;
