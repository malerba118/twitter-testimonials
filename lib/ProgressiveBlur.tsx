import React, { ComponentProps, HTMLProps, ReactNode } from "react";
import { Direction, Mask, masks } from "./Mask";
import { HTMLMotionProps, motion, MotionProps } from "framer-motion";
import { Box, BoxProps, chakra } from "@chakra-ui/react";

const MotionBox = motion(Box);

export interface ProgressiveBlurProps extends BoxProps {
  direction?: Direction;
  blurStart?: number;
  blurEnd?: number;
  layers?: number;
  children?: ReactNode;
}

export const ProgressiveBlur = React.memo(
  ({
    direction = "to-bottom",
    blurStart = 0,
    blurEnd = 12,
    layers = 5,
    children,
    ...otherProps
  }: ProgressiveBlurProps) => {
    layers = Math.max(layers, 2);
    const step = 1 / (layers + 1);
    const blurMin = Math.min(blurStart, blurEnd);
    const blurMax = Math.max(blurStart, blurEnd);
    const blurRange = blurMax - blurMin;
    const blurBase = blurRange ** (1 / (layers - 1));
    return (
      <MotionBox pos="relative" {...otherProps}>
        {children}
        <Box
          pos="absolute"
          inset={0}
          pointerEvents="none"
          style={{
            backdropFilter: `blur(${blurMin}px)`,
          }}
        />
        {[...new Array(layers).keys()].map((layer) => {
          return (
            <Mask
              key={layer}
              image={masks.linear({
                direction: direction,
                opacities: [0, 1, 1, 0],
                positions: [
                  layer * step,
                  (layer + 1) * step,
                  (layer + 2) * step,
                  (layer + 3) * step,
                ],
                rotate: blurStart > blurEnd ? 180 : 0,
              })}
              style={{
                backdropFilter: `blur(${blurBase ** layer}px)`,
                position: "absolute",
                inset: 0,
                pointerEvents: "none",
                borderRadius: "inherit",
              }}
            />
          );
        })}
      </MotionBox>
    );
  }
);
