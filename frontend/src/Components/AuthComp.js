import { Box, Container } from "@chakra-ui/react";
import React from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "./Login";
import SignUp from "./SignUp";
const AuthComp = () => {
  return (
    <Container
      mt={3}
      padding={"2px"}
      fontSize={{ base: "25px", md: "25px" }}
      boxShadow={"xl"}
      p={5}
    >
      <Box>
        <Tabs variant="soft-rounded" colorScheme="green">
          <TabList>
            <Tab w={"50%"}>Login</Tab>
            <Tab w={"50%"}>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default AuthComp;
