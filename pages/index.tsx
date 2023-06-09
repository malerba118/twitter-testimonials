import {
  Box,
  Button,
  Center,
  chakra,
  Flex,
  Heading,
  HStack,
  Img,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";

import Image from "next/image";
import Navbar from "../lib/Navbar";
import TransitionContent from "../lib/TransitionContent";
import TransitionOverlay from "../lib/TransitionOverlay";
import frostin from "../public/frostin.png";
import stripes from "../public/stripes.png";

export default function Services() {
  return (
    <Box borderLeft="sm" borderRight="sm">
      <TransitionOverlay />
      <TransitionContent>
        <Navbar />
        <Stack
          pos="relative"
          alignItems="center"
          pt={28}
          pb={{ base: 10, md: 28 }}
          borderBottom="sm"
        >
          <Image
            src={frostin}
            alt="frostin"
            style={{ width: "75vw", maxWidth: "800px" }}
          />
          <Stack spacing={10} alignItems="center" maxW="3xl">
            <Heading size="md" fontWeight={400} textAlign="center" px={6}>
              Add a little frostin to your cake.
            </Heading>
            <Button h="56px" px={10} variant="primary">
              Maybe Coming Soon
            </Button>
            <Text px={10}>
              Everyone wants a ux as smooth as linear’s and a ui as polished as
              vercel’s. I’m the service that’s going to get you there. For just
              $3,999/month I’ll custom-build polished React components, pages,
              and apps that will leave your users mesmerized.
              <br />
              <br />
              In my 10 year career I have built close to one-hundred apps and
              dozens of libraries. Through this experience I have come to work
              with a unique blend of speed and quality. But don’t take my word
              for it, here’s what people say about my work.
            </Text>
          </Stack>
        </Stack>
        <Stack alignItems="center" borderBottom="sm">
          <Stack spacing={4} py={{ base: 10, md: 28 }} maxW="3xl" px={10}>
            <Heading>How it works</Heading>
            <Text>
              When you subscribe for as low as $3,999/month, you’ll be given a
              dedicated GitHub repo where you can make requests via GitHub
              Issues. <br />
              <br />
              From there, you may submit as many requests as you’d like to the
              backlog and I will dedicate up to 40 hours per month working to
              deliver you high quality React/TypeScript/JavaScript code. <br />
              <br />
              Don’t have any mockups yet? No problem, I’ll handle the design
              work as well!
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
            <Heading>The services</Heading>
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
              px={{ base: 2, md: 6 }}
            >
              <Text color="black">Design</Text>
            </Center>
            <Center h="64px" borderBottom="sm" borderLeft="sm">
              <Text>1-5 hours</Text>
            </Center>
            <Center h="64px" borderBottom="sm" borderLeft="sm">
              <Text>5-10 hours</Text>
            </Center>
            <Center h="64px" borderBottom="sm" borderLeft="sm">
              <Text>20-40 hours</Text>
            </Center>
            <Center
              justifyContent="start"
              px={{ base: 2, md: 6 }}
              h="64px"
              borderLeft="sm"
            >
              <Text color="black">Development</Text>
            </Center>
            <Center h="64px" borderLeft="sm">
              <Text>5-10 hours</Text>
            </Center>
            <Center h="64px" borderLeft="sm">
              <Text>10-30 hours</Text>
            </Center>
            <Center h="64px" borderLeft="sm">
              <Text>40-120 hours</Text>
            </Center>
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
              <Text
                color="black"
                textDecoration="underline"
                // fontWeight={600}
              >
                CodeSandbox
              </Text>
              <Text>
                Code that you can run, edit, and deploy directly from your
                browser.
              </Text>
            </Stack>
            <Stack py={12} px={8} borderLeft="sm">
              <Text
                color="black"
                textDecoration="underline"
                // fontWeight={600}
              >
                Figma
              </Text>
              <Text>
                A Figma design file with mockups and assets that you can further
                edit to your liking.
              </Text>
            </Stack>
          </Stack>
        </Flex>
        <Flex pos="relative">
          <Box
            borderRight="sm"
            borderBottom="sm"
            display={{ base: "none", md: "block" }}
          >
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
              display={{ base: "none", md: "flex" }}
            >
              <Center flex={1} borderRight="sm">
                <Heading>Request</Heading>
              </Center>
              <Center flex={1}>
                <Heading>Deliverable</Heading>
              </Center>
            </Flex>
            <Stack
              p={8}
              borderBottom="sm"
              display={{ base: "block", md: "none" }}
            >
              <Heading>Examples</Heading>
            </Stack>
            <Flex
              h={{ base: "auto", md: "30vw" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Stack
                flex={1}
                p={10}
                // h="100%"
                borderBottom="sm"
              >
                <Text color="black" fontSize="xl">
                  Animated Glowing Button
                </Text>
                <Text>
                  &ldquo;Yo frostin, could you make me one of those buttons with
                  a fancy glowing border that animates around it infinitely?
                  &rdquo;
                </Text>
              </Stack>
              <Box
                pos="relative"
                h="100%"
                flex={1}
                minW="50%"
                bg="black"
                borderBottom="sm"
                borderLeft="sm"
                borderBottomColor="whiteAlpha.600"
              >
                <chakra.video
                  src="/fancy-glowing-button.mp4"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Box>
            </Flex>
            <Flex
              h={{ base: "auto", md: "30vw" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Stack
                flex={1}
                p={10}
                // h="100%"
                borderBottom="sm"
              >
                <Text color="black" fontSize="xl">
                  Portfolio Site
                </Text>
                <Text>
                  &ldquo;Hey frostin, I need a slick portfolio site that
                  supports light/dark mode and has some cool scroll animations.
                  I'll provide a bio and project details shortly! &rdquo;
                </Text>
              </Stack>
              <Box
                pos="relative"
                // h="100%"
                flex={1}
                minW="50%"
                bg="black"
                borderBottom="sm"
                borderLeft="sm"
                // borderColor="whiteAlpha.500"
              >
                <chakra.video
                  src="/portfolio-site.mp4"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Box>
            </Flex>
            <Flex
              h={{ base: "auto", md: "30vw" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Stack flex={1} p={10} borderBottom="sm">
                <Text color="black" fontSize="xl">
                  Reorderable List
                </Text>
                <Text>
                  &ldquo;Hey, I'd like a react component that lets me pass in an
                  array of items and will allow me to drag to reorder the
                  items.&rdquo;
                </Text>
              </Stack>
              <Box
                pos="relative"
                h="100%"
                flex={1}
                minW="50%"
                borderBottom="sm"
                borderLeft="sm"
                // borderColor="whiteAlpha.500"
              >
                <chakra.video
                  src="/reorderable-list.mp4"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Box>
            </Flex>
            <Flex
              h={{ base: "auto", md: "30vw" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Stack
                flex={1}
                p={10}
                // h="100%"
                borderBottom="sm"
              >
                <Text color="black" fontSize="xl">
                  Animated ticker section
                </Text>
                <Text>
                  &ldquo;Hey, I need a section for my site that shows two
                  animated tickers displaying project images and I would like
                  the images to appear fullscreen when you click on them.
                  &rdquo;
                </Text>
              </Stack>
              <Box
                pos="relative"
                h="100%"
                minW="50%"
                flex={1}
                bg="black"
                borderBottom="sm"
                borderBottomColor="whiteAlpha.600"
              >
                <chakra.video
                  src="/camera-utils.mp4"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Box>
            </Flex>
            <Flex
              h={{ base: "auto", md: "30vw" }}
              flexDir={{ base: "column", md: "row" }}
            >
              <Stack
                flex={1}
                p={10}
                // h="100%"
                borderBottom="sm"
              >
                <Text color="black" fontSize="xl">
                  Testimonials for Marketing Site
                </Text>
                <Text>
                  &ldquo;Hi, we need a tweets section for our marketing page to
                  show what people think about our product!&rdquo;
                </Text>
              </Stack>
              <Box
                pos="relative"
                h="100%"
                minW="50%"
                flex={1}
                bg="black"
                borderBottom="sm"
                // borderColor="whiteAlpha.500"
              >
                <chakra.video
                  src="/twitter-testimonials.mp4"
                  h="100%"
                  w="100%"
                  objectFit="cover"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </Box>
            </Flex>
          </Box>
        </Flex>
        <Stack alignItems="center" borderBottom="sm">
          <Stack spacing={4} py={{ base: 10, md: 28 }} maxW="3xl" px={8}>
            <Heading>Caveats</Heading>
            <Text>
              To keep things flowing smoothly, I will not be working directly in
              your codebase. Onboarding processes are clunky and require lots of
              account creations and granting of permissions. This way, i can
              spend more hours building for you and less hours groking your
              code, context-switching, and doing trivial onboarding work.
              <br />
              <br />
              Think of this service as an opportunity to offload coding and
              design tasks and you will receive back assets that you can then
              integrate into your codebase. And no worries, I will provide
              documentation outlining steps to integrate/customize all assets!
              <br />
              <br />
              For this reason, I recommend that you have at least one other
              technical person in-house that can dedicate a small amount of time
              toward integrating assets into your codebase.
            </Text>
          </Stack>
        </Stack>
      </TransitionContent>
    </Box>
  );
}
