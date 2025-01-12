import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { closeModal } from "../store/tokenSlice/tokenSlice";
import { logOut } from "../store/userSlice/userSlice";

const ProtectedRoute = ({ component }) => {
  const user = useSelector((state) => state.user.user);
  const tokenModal=useSelector(state=> state.token.token);
  const dispatch=useDispatch();
  const navigate = useNavigate();
  console.log("Token",tokenModal);

  useEffect(() => {
    if (user === null) {
      return navigate("/login");
    }
  }, [user]);

  const handleTokenModal=()=>{
    dispatch(closeModal());
    dispatch(logOut());
    navigate("/login");
  }

  return (
    <>
      {tokenModal && component}
      {!tokenModal&&<Modal closeOnOverlayClick={false} isOpen={!tokenModal} onClose={()=> dispatch(closeModal())} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalBody>
          <Text fontSize={"2xl"} fontWeight={"semibold"} mt={5} >Your sessions has expired. Please Login again</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" m={"auto"} onClick={handleTokenModal}>
              Ok
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>}
    </>
  );
};

export default ProtectedRoute;
