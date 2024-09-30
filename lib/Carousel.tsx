import { Box, BoxProps, HStack } from "@chakra-ui/react";
import { useResizeObserver } from "../lib/hooks";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { springs } from "./springs";

const MotionHStack = motion(HStack);

interface CarouselProps extends BoxProps {
  page: number;
}

export const Carousel = ({ page, children, ...otherProps }: CarouselProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);

  useResizeObserver(ref, (entry) => {
    setWidth(entry.contentRect.width);
  });

  return (
    <Box ref={ref} w="100%" {...otherProps}>
      {width !== null && (
        <MotionHStack
          w="max-content"
          gap={0}
          alignItems="start"
          // @ts-ignore
          style={{ "--carousel-width": width + "px" }}
          animate={{ x: -page * width }}
          transition={springs.xslow()}
        >
          {children}
        </MotionHStack>
      )}
    </Box>
  );
};

interface CarouselPageProps extends BoxProps {}

export const CarouselPage = (props: CarouselPageProps) => {
  return <Box {...props} pos="relative" w="var(--carousel-width)"></Box>;
};
