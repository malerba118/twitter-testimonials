import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useDimensions,
} from "@chakra-ui/react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";
import frostin from "../public/frostin.png";
import stripes from "../public/stripes.png";
import triangle from "../public/triangle.png";

const MotionBox = motion(Box);

function toDeg(radians: number) {
  return radians * (180 / Math.PI);
}

const Navbar = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const size = useDimensions(ref, true);

  const angle = toDeg(-Math.atan(70 / (size?.contentBox.width || Infinity)));

  let rotate = useTransform(scrollYProgress, [0, 0.0225], [angle, -angle]);
  rotate = useSpring(rotate, { mass: 0.2, damping: 6, stiffness: 100 });

  return (
    <HStack
      h="70px"
      borderBottom="sm"
      borderTop="sm"
      spacing={0}
      overflow="hidden"
    >
      <Box
        ref={ref}
        flex={1}
        h="100%"
        pos="relative"
        bgImage={stripes.src}
        bgRepeat="repeat"
        bgSize="contain"
        overflow="hidden"
      >
        {/* <Image
          src={triangle}
          alt="triangle"
          style={{
            width: "calc(100% + 2px)",
            height: "calc(100% + 2px)",
            position: "relative",
            top: -2,
            left: -2,
          }}
        /> */}
        <MotionBox
          h="100%"
          w="105%"
          bg="offwhite"
          style={{ rotate }}
          transformOrigin="bottom left"
          borderBottom="sm"
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
    <Box borderLeft="sm" borderRight="sm">
      <Navbar />
      <Stack alignItems="center" py={28} borderBottom="sm">
        <Image
          src={frostin}
          alt="frostin"
          style={{ width: "70vw", maxWidth: "800px" }}
        />
        <Stack spacing={10} alignItems="center" maxW="3xl" px={6}>
          <Heading size="md" fontWeight={400} textAlign="center">
            Add a little frostin to your cake.
          </Heading>
          <Button h="56px" px={10} variant="primary">
            Apply now
          </Button>
          <Text>
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
          <Text>
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
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        borderBottom="sm"
        w="100%"
      >
        <Stack
          flex={1}
          width={{ base: "100%", md: "auto" }}
          h="100%"
          minH="100px"
          justifyContent="center"
          px={{ base: 8, md: 16 }}
          borderBottom={{ base: "sm", md: "none" }}
        >
          <Heading>The offerings</Heading>
        </Stack>
        <SimpleGrid width={{ base: "100%", md: "60%" }} columns={4}>
          <Box
            h="64px"
            borderBottom="sm"
            borderLeft="sm"
            bgImage={stripes.src}
            bgSize="contain"
            bgRepeat="repeat"
          ></Box>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text color="black">Component</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text color="black">Page</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text color="black">App</Text>
          </Center>
          <Center
            h="64px"
            borderBottom="sm"
            borderLeft="sm"
            justifyContent="start"
            px={6}
          >
            <Text color="black">Design</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm">
            <Text>1-5 hours</Text>
          </Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm"></Center>
          <Center h="64px" borderBottom="sm" borderLeft="sm"></Center>
          <Center justifyContent="start" px={6} h="64px" borderLeft="sm">
            <Text color="black">Development</Text>
          </Center>
          <Center h="64px" borderLeft="sm">
            <Text>1-5 hours</Text>
          </Center>
          <Center h="64px" borderLeft="sm"></Center>
          <Center h="64px" borderLeft="sm"></Center>
        </SimpleGrid>
      </Flex>
      <Flex
        flexDirection={{ base: "column", md: "row" }}
        alignItems="center"
        borderBottom="sm"
        w="100%"
      >
        <Stack
          flex={1}
          h="100%"
          minH="100px"
          width={{ base: "100%", md: "auto" }}
          justifyContent="center"
          px={{ base: 8, md: 16 }}
          borderBottom={{ base: "sm", md: "none" }}
        >
          <Heading>The deliverables</Heading>
        </Stack>
        <Stack flex={1.4} width={{ base: "100%", md: "auto" }} spacing={0}>
          <Stack py={12} px={8} borderLeft="sm" borderBottom="sm">
            <Text color="black">CodeSandbox</Text>
            <Text>
              Code that you can run, edit, and deploy directly from your
              browser.
            </Text>
          </Stack>
          <Stack py={12} px={8} borderLeft="sm">
            <Text color="black">CodeSandbox</Text>
            <Text>
              Code that you can run, edit, and deploy directly from your
              browser.
            </Text>
          </Stack>
        </Stack>
      </Flex>
      <Flex pos="relative">
        <Box borderRight="sm" borderBottom="sm">
          <Box pos="sticky" top={0} p={4}>
            <Heading
              h="fit-content"
              size="4xl"
              style={{
                writingMode: "vertical-lr",
                textOrientation: "mixed",
              }}
              transform="rotate(180deg)"
              transformOrigin="center"
            >
              Examples
            </Heading>
          </Box>
        </Box>
        <Box pos="relative" flex={1}>
          <Flex
            pos="sticky"
            top={0}
            h="70px"
            w="100%"
            borderBottom="sm"
            bg="offwhite"
            zIndex={1}
          >
            <Center flex={1} borderRight="sm">
              <Heading>Request</Heading>
            </Center>
            <Center flex={1}>
              <Heading>Deliverable</Heading>
            </Center>
          </Flex>
          <HStack h="32vw" spacing={0}>
            <Stack w="50%" p={10} h="100%" borderBottom="sm">
              <Text color="black">
                Component to play a sequence of images on scroll.
              </Text>
              <Text>
                &ldquo;Hi, I need a react component that can play a sequence of
                images on scroll similar to the apple airpods site.&rdquo;
              </Text>
            </Stack>
            <Box
              pos="relative"
              h="100%"
              flex={1}
              bg="black"
              borderBottom="sm"
              borderColor="whiteAlpha.500"
            ></Box>
          </HStack>
          <HStack h="32vw" spacing={0}>
            <Stack w="50%" p={10} h="100%" borderBottom="sm">
              <Text color="black">
                Component to play a sequence of images on scroll.
              </Text>
              <Text>
                &ldquo;Hi, I need a react component that can play a sequence of
                images on scroll similar to the apple airpods site.&rdquo;
              </Text>
            </Stack>
            <Box
              pos="relative"
              h="100%"
              flex={1}
              bg="black"
              borderBottom="sm"
              borderColor="whiteAlpha.500"
            ></Box>
          </HStack>
        </Box>
      </Flex>
      <Box h="200vh" w="100%"></Box>
    </Box>
  );
}
