import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Card,
  CardBody,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";
import BadgeFunc from "./BadgeFunc";

const PizzaModal = ({ pizza, isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <BadgeFunc text={"Pizza Time yummy 😋"} colorScheme={"red"} />
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {pizza.name}
          <Card>
            <CardBody>
              <Box display={"flex"} justifyContent={"center"}>
                <Image src={pizza.image} boxsize={"260"} borderRadius={130} />
              </Box>
              <Text>{pizza.description}</Text>
            </CardBody>
          </Card>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PizzaModal;
