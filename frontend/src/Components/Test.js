import { useState } from 'react';
import {
  Box,
  Flex,
  IconButton,
  Stack,
  Text,
  useBreakpointValue,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

function Test() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const display = useBreakpointValue({ base: isOpen ? 'block' : 'none', md: 'flex' });

  return (
    <Box bg="gray.800" color="white">
      <Flex
        maxW="1200px"
        mx="auto"
        py={4}
        px={6}
        align="center"
        justify="space-between"
      >
        <Text fontSize="xl" fontWeight="bold">
          My Test
        </Text>

        <IconButton
          display={{ base: 'block', md: 'none' }}
          onClick={toggle}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Toggle Navigation"
          bg="transparent"
          _hover={{ bg: 'transparent' }}
          _active={{ bg: 'transparent' }}
          _focus={{ boxShadow: 'none' }}
        />

        <Box display={display} width={{ base: 'full', md: 'auto' }}>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
            <Text>Home</Text>
            <Text>About</Text>
            <Text>Contact</Text>
          </Stack>
        </Box>
      </Flex>
    </Box>
  );
}

export default Test;