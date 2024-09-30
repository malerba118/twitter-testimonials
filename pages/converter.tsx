import {
  Box,
  BoxProps,
  Button,
  Center,
  chakra,
  Flex,
  Heading,
  HStack,
  Icon,
  Img,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  PropsOf,
  useDimensions,
} from "@chakra-ui/react";

import Image from "next/image";
import Navbar from "../lib/Navbar";
import TransitionContent from "../lib/TransitionContent";
import TransitionOverlay from "../lib/TransitionOverlay";
import frostin from "../public/frostin.png";
import stripes from "../public/stripes.png";
import { useResizeObserver } from "../lib/hooks";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Carousel, CarouselPage } from "../lib/Carousel";
import { HiOutlineArrowNarrowRight as ArrowIcon } from "react-icons/hi";
import { ProgressiveBlur } from "../lib/ProgressiveBlur";
import { action, makeObservable, observable } from "mobx";
import Dropzone from "react-dropzone";
import { observer } from "mobx-react";
import { Mask, masks } from "../lib/Mask";

const MotionSvg = motion(chakra.svg);

class OutputFileManager {}

class PageManager {
  inputFiles: File[] = [];
  outputFiles: OutputFileManager[] = [];
  page: number = 0;

  constructor() {
    makeObservable(this, {
      page: observable.ref,
      inputFiles: observable.ref,
      setInputFiles: action,
      startConversions: action,
    });
  }

  setInputFiles(files: File[]) {
    this.inputFiles = files;
    if (this.inputFiles.length === 0) {
      this.page = 0;
    } else {
      this.page = 1;
    }
  }

  startConversions() {
    this.page = 2;
  }
}

const pageManager = new PageManager();

const LongArrow = ({
  width = "100px",
  height = "20px",
  color = "currentColor",
  dashArray = "6,3",
  ...otherProps
}: PropsOf<typeof chakra.svg> & { dashArray?: string }) => {
  return (
    <MotionSvg
      width={width}
      height={height}
      viewBox="0 0 100 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...otherProps}
    >
      <path
        d="M0 10H97M97 10L88 1M97 10L88 19"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray={dashArray}
      />
    </MotionSvg>
  );
};

const UploadPage = () => {
  return (
    <CarouselPage>
      {pageManager.inputFiles.length === 0 && (
        <Center>
          <Dropzone
            onDrop={(acceptedFiles) => pageManager.setInputFiles(acceptedFiles)}
          >
            {({ getRootProps, getInputProps }) => (
              <Button
                variant="dashed"
                px={5}
                size="sm"
                rounded="md"
                {...getRootProps()}
              >
                <input {...getInputProps()} />
                Select some videos
              </Button>
            )}
          </Dropzone>
        </Center>
      )}
      <Stack
        pr={14}
        w="min-content"
        maxW="100%"
        pos="absolute"
        right={0}
        mt={1}
      >
        {pageManager.inputFiles.map((file) => (
          <Text isTruncated key={file.name} color="blackAlpha.900">
            {file.name}
          </Text>
        ))}
      </Stack>
    </CarouselPage>
  );
};

const ConversionsPage = observer(() => {
  return (
    <CarouselPage>
      <Stack pl={14} mt={1}>
        {pageManager.inputFiles.map((file) => (
          <Text isTruncated key={file.name} color="blackAlpha.900">
            {file.name}
          </Text>
        ))}
      </Stack>
    </CarouselPage>
  );
});

const Converter = observer(() => {
  return (
    <Box borderLeft="sm" borderRight="sm">
      <TransitionOverlay />
      <TransitionContent>
        <Box h="100dvh" w="100%" overflow="hidden">
          <Navbar />
          <Box pos="relative" w="340px" mx="auto">
            <ProgressiveBlur
              direction="to-left"
              layers={5}
              blurStart={0}
              blurEnd={24}
              w="50vw"
              maxW="720px"
              top={-4}
              bottom={-4}
              pos="absolute"
              right="90%"
              zIndex={1}
              pointerEvents="none"
              bgGradient="linear(to-l, transparent, #fbfbfb)"
            />
            <Carousel w="340px" mt={24} page={pageManager.page}>
              <UploadPage />
              <CarouselPage>
                <Icon
                  as={LongArrow}
                  w={10}
                  h={8}
                  pos="absolute"
                  left={-2}
                  top={0}
                  transform="translateX(0%)"
                  // animate={{ x: pageManager.page === 0 ? "70%" : "140%" }}
                />
                <Stack alignItems="center" spacing={3}>
                  <HStack spacing={3}>
                    <Button size="sm" variant="ghost">
                      MP4
                    </Button>
                    <Text>@</Text>
                    <Button size="sm" variant="ghost">
                      720p
                    </Button>
                  </HStack>
                  <Button
                    variant="dashed"
                    px={10}
                    size="sm"
                    rounded="md"
                    onClick={() => {
                      pageManager.startConversions();
                    }}
                  >
                    Convert
                  </Button>
                </Stack>
                <Icon
                  as={LongArrow}
                  w={10}
                  h={8}
                  pos="absolute"
                  right={0}
                  top={0}
                  transform="translateX(0%)"
                  // animate={{ x: pageManager.page === 0 ? "70%" : "140%" }}
                />
              </CarouselPage>
              <ConversionsPage />
            </Carousel>
            <ProgressiveBlur
              direction="to-right"
              w="50vw"
              maxW="720px"
              layers={5}
              blurStart={0}
              blurEnd={24}
              top={-4}
              bottom={-4}
              pos="absolute"
              left="90%"
              zIndex={1}
              pointerEvents="none"
              bgGradient="linear(to-r, transparent, #fbfbfb)"
            />
          </Box>
        </Box>
      </TransitionContent>
    </Box>
  );
});

export default Converter;
