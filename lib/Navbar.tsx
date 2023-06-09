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
  Link,
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
import NextLink from "next/link";
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
  const { scrollY } = useScroll();
  const size = useDimensions(ref, true);

  const angle = toDeg(-Math.atan(70 / (size?.contentBox.width || Infinity)));

  let rotate = useTransform(scrollY, [0, 75], [angle, -angle / 2]);
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
          pos="absolute"
          bottom={"-1px"}
          left={0}
          h="155%"
          w="155%"
          bg="offwhite"
          style={{ rotate }}
          transformOrigin="bottom left"
          borderBottom="sm"
        />
        <Link
          as={NextLink}
          href="/"
          pos="absolute"
          inset={0}
          scroll={false}
        ></Link>
      </Box>
      <Link as={NextLink} h="100%" href="/work" scroll={false}>
        <Button h="100%" px={10} variant="secondary" borderLeft="sm">
          Work
        </Button>
      </Link>
      <Button
        h="100%"
        px={10}
        variant="primary"
        display={{ base: "none", md: "initial" }}
      >
        Maybe Coming Soon
      </Button>
    </HStack>
  );
};

export default Navbar;
