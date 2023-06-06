import {
  Box,
  Button,
  Center,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import Image from "next/image";
import frostin from "../public/frostin.png";
import stripes from "../public/stripes.png";
import triangle from "../public/triangle.png";

const Navbar = () => {
  return (
    <HStack
      h="70px"
      borderBottom="sm"
      borderTop="sm"
      spacing={0}
      overflow="hidden"
    >
      <Box
        flex={1}
        h="100%"
        pos="relative"
        bgImage={stripes.src}
        bgRepeat="repeat"
        bgSize="contain"
      >
        <Image
          src={triangle}
          alt="triangle"
          style={{
            width: "100%",
            height: "calc(100% + 2px)",
            position: "relative",
            top: -2,
          }}
        />
      </Box>
      <Button h="100%" px={10} variant="secondary" borderLeft="sm">
        Work
      </Button>
      <Button h="100%" px={10} variant="primary">
        Apply now
      </Button>
    </HStack>
  );
};

export default function Services() {
  return (
    <Box>
      <Navbar />
      <Stack alignItems="center" py={28} borderBottom="sm">
        <Image
          src={frostin}
          alt="frostin"
          style={{ width: "70vw", maxWidth: "800px" }}
        />
        <Stack spacing={10} alignItems="center" maxW="3xl" px={6}>
          <Heading
            size="md"
            fontWeight={400}
            letterSpacing="0.1rem"
            textAlign="center"
          >
            Add a little frostin to your cake.
          </Heading>
          <Button h="56px" px={10} variant="primary">
            Apply now
          </Button>
          <Text
            color="blackAlpha.600"
            fontWeight={400}
            letterSpacing="0.1rem"
            lineHeight="155%"
          >
            Everyone wants a ux as smooth as linear’s and a ui as polished as
            vercel’s. I’m the service that’s going to get you there. For just
            $4k/month i’ll custom-build polished React components, pages, and
            apps that will leave your users mesmerized. <br /> <br />
            In my 10 year career I have built close to one-hundred apps and
            dozens of libraries. Through this experience I have come to work
            with a unique blend of speed and quality. But don’t take my word for
            it, here’s what people say about my work.
          </Text>
        </Stack>
      </Stack>
      <Stack alignItems="center" borderBottom="sm">
        <Stack spacing={4} py={28} maxW="3xl" px={6}>
          <Heading>How it works</Heading>
          <Text
            color="blackAlpha.600"
            fontWeight={400}
            letterSpacing="0.1rem"
            lineHeight="155%"
          >
            When you subscribe for as low as $3,999/month, you’ll be given a
            dedicated GitHub repo where you can make requests via GitHub Issues.{" "}
            <br />
            <br />
            From there, you may submit as many requests as you’d like to the
            backlog and I will dedicate up to 40 hours per month working to
            deliver you high quality React/TypeScript/JavaScript code. <br />
            <br />
            Don’t have any mockups yet? No problem, I’ll handle the design work
            as well!
          </Text>
        </Stack>
      </Stack>
      <HStack spacing={0} borderBottom="sm" w="100%">
        <Stack flex={1} h="100%" px={16}>
          <Heading>The offerings</Heading>
        </Stack>
        <SimpleGrid w="60%" columns={4}>
          <Box
            h="64px"
            borderBottom="sm"
            borderLeft="sm"
            bgImage={stripes.src}
            bgSize="contain"
            bgRepeat="repeat"
          ></Box>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text>Component</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text>Page</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text>App</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text>Design</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text color="blackAlpha.600">1-5 hours</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm"></Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm"></Center>
          <Center h="64px" borderLeft="sm">
            <Text>Development</Text>
          </Center>
          <Center h="64px" borderLeft="sm">
            <Text color="blackAlpha.600">1-5 hours</Text>
          </Center>
          <Center h="64px" borderLeft="sm"></Center>
          <Center h="64px" borderLeft="sm"></Center>
        </SimpleGrid>
      </HStack>
    </Box>
  );
}
