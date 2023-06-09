import {
  Box,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Img,
  Stack,
  Text,
  Link,
  Button,
  Center,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Head from "next/head";
import { useLayoutEffect, useRef, useState } from "react";
import { dataset } from "../lib/data";
import { LazyLoadComponent } from "react-lazy-load-image-component";
import { AiFillHeart as HeartIcon, AiOutlineCodeSandbox } from "react-icons/ai";
import { format } from "date-fns";
import Image from "next/image";
import frostin from "../public/frostin.png";
import ArrowButton from "../lib/ArrowButton";
import Navbar from "../lib/Navbar";
import TransitionOverlay from "../lib/TransitionOverlay";
import TransitionContent from "../lib/TransitionContent";

const Video = chakra("video");
const MotionVideo = motion(Video);

const whitelist = new Set(["1602671703410282497"]);

const tweets = dataset.tweets
  .filter(
    (tweet) =>
      (!tweet.isReply && tweet.hasMedia && tweet.replies.length > 0) ||
      whitelist.has(tweet.id)
  )
  .sort((a, b) => b.likes - a.likes);

// interface MediaProps {
//   media: Media;
// }

const Media = ({ media, ...otherProps }: any) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [canPlay, setCanPlay] = useState(false);
  const [inView, setInView] = useState(false);

  useLayoutEffect(() => {
    if (canPlay && inView) {
      videoRef.current?.play();
    } else {
      videoRef.current?.pause();
    }
  }, [canPlay, inView]);

  if (media.type === "video") {
    return (
      <MotionVideo
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        onViewportEnter={() => {
          setInView(true);
        }}
        onViewportLeave={() => {
          setInView(false);
        }}
        onCanPlay={() => setCanPlay(true)}
        {...otherProps}
      >
        {media.sources
          .filter(
            (src: any) =>
              src.content_type === "video/mp4" && Number(src.bitrate) > 300000
          )
          .map((src: any) => (
            <source key={src.url} src={src.url} type={src.content_type} />
          ))}
      </MotionVideo>
    );
  } else {
    return <Img src={media.sources[0].url} {...otherProps} />;
  }
};

export default function Home() {
  return (
    <>
      <Head>
        <title>frostin.dev</title>
        <meta
          name="description"
          content="A showcase of frostin's best work from 2022."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box as="main">
        <TransitionOverlay />
        <TransitionContent>
          <Navbar />
          <Center flexDir="column" pt={28} pb={{ base: 20, md: 10 }}>
            <Image
              src={frostin}
              alt="frostin"
              style={{ width: "75vw", maxWidth: "800px" }}
            />
            <Text
              mt={12}
              fontSize="lg"
              color="gray.500"
              fontWeight={500}
              letterSpacing="2px"
              py={4}
              px={6}
              border="1px dashed rgba(0,0,0,0.25)"
              rounded="2xl"
            >
              Best of Twitter
            </Text>
          </Center>
          {tweets.map((tweet) => (
            <Box key={tweet.id}>
              <Flex flexDir="column" gap={8} mb={{ base: 8, md: 20 }}>
                <Box
                  pos="sticky"
                  top={0}
                  pt={{ base: 6, md: 16 }}
                  px={6}
                  pb={0}
                  bg="#fbfbfb"
                  zIndex={1}
                >
                  {/* <Box
                  borderTop="1px dashed rgba(0,0,0,0.125)"
                  pos="absolute"
                  top={0}
                  left={0}
                  right={0}
                  style={{
                    WebkitMaskImage:
                      "radial-gradient(rgba(255,255,255, 1) 0%, rgba(255,255,255, 1) 0%, rgba(255,255,255, 0) 80%)",
                    WebkitMaskSize: "100%",
                  }}
                /> */}
                  <Box
                    w={{ base: "100%", md: "550px" }}
                    h={{ base: "260px", md: "330px" }}
                    marginX="auto"
                    pos="relative"
                  >
                    <Link
                      href={`https://twitter.com/austin_malerba/status/${tweet.id}`}
                      target="_blank"
                      display="block"
                      borderRadius="1.75rem"
                      boxShadow={`0px 5.4px 5.3px rgba(0, 0, 0, 0.008),
                  0px 13px 12.6px rgba(0, 0, 0, 0.012),
                  0px 24.4px 23.8px rgba(0, 0, 0, 0.015),
                  0px 43.6px 42.4px rgba(0, 0, 0, 0.018),
                  0px 81.5px 79.4px rgba(0, 0, 0, 0.022),
                  0px 195px 190px rgba(0, 0, 0, 0.03)`}
                      bg="#fbfbfb"
                      p="8px"
                      w="100%"
                      h="100%"
                      pos="relative"
                      cursor="pointer"
                      role="group"
                    >
                      <Box
                        pos="absolute"
                        inset="8px"
                        bgGradient="linear(to-l, pink.200, blue.200)"
                        borderRadius="1.75rem"
                        opacity={0}
                        zIndex={0}
                        _groupHover={{
                          inset: "0px",
                          opacity: 0.6,
                        }}
                        transition="all 0.3s"
                      />

                      <Box
                        _groupHover={{
                          transform: "scale(0.98)",
                        }}
                        transition="transform 0.3s"
                        w="100%"
                        h="100%"
                        overflow="hidden"
                      >
                        <LazyLoadComponent>
                          <Media
                            media={tweet.primaryMedia}
                            w="100%"
                            h="100%"
                            objectFit="cover"
                            borderRadius="1.35rem"
                          />
                        </LazyLoadComponent>
                      </Box>
                    </Link>
                    <HStack pos="absolute" bottom={4} right={4}>
                      {tweet.sandboxUrl && (
                        <Link
                          href={tweet.sandboxUrl}
                          target="_blank"
                          _hover={{ textDecoration: "none" }}
                        >
                          <ArrowButton
                            size="sm"
                            rounded="full"
                            colorScheme="blackAlpha"
                            aria-label="View Code"
                            border="1px solid rgba(255,255,255,0.2)"
                            bg="blackAlpha.500"
                            backdropFilter="blur(4px)"
                            _hover={{
                              bg: "blackAlpha.600",
                              borderColor: "rgba(255,255,255,0.4)",
                            }}
                            text="See Code"
                            icon={<AiOutlineCodeSandbox />}
                          />
                        </Link>
                      )}
                    </HStack>
                  </Box>
                </Box>
                <HStack
                  px={{ base: 6, md: 0 }}
                  w="sm"
                  marginX="auto"
                  pt={4}
                  spacing={6}
                >
                  <HStack color="gray.600">
                    <Icon as={HeartIcon} mb="2px" color="red.400" />
                    <Text>{tweet.likes}</Text>
                  </HStack>
                  <Box borderTop="1px dashed rgba(0,0,0,0.15)" flex={1} />
                  <Text color="gray.600">
                    {format(tweet.createdAt, "MMM YYY")}
                  </Text>
                </HStack>
                <Stack
                  spacing={8}
                  px={{ base: 6, md: 0 }}
                  w="sm"
                  marginX="auto"
                >
                  {tweet.replies.map((mention) => (
                    <Stack
                      as={Link}
                      href={`https://twitter.com/${mention.author.username}/status/${mention.id}`}
                      target="_blank"
                      key={mention.id}
                      spacing={1}
                      role="group"
                      pos="relative"
                      zIndex={0}
                      cursor="pointer"
                    >
                      <Box
                        pos="absolute"
                        inset="-2px -4px"
                        bgGradient="linear(to-l, pink.200, blue.200)"
                        borderRadius="2xl"
                        opacity={0}
                        zIndex={-1}
                        _groupHover={{
                          inset: "-8px -12px",
                          opacity: 0.25,
                        }}
                        transition="all 0.3s"
                      />
                      <Heading fontSize="md" fontWeight="bold">
                        {mention.author.name}
                      </Heading>
                      <Text fontSize="md" color="gray.600">
                        {mention.text}
                      </Text>
                    </Stack>
                  ))}
                </Stack>
              </Flex>
            </Box>
          ))}
        </TransitionContent>
      </Box>
    </>
  );
}
