import { Box } from "@chakra-ui/react";
import { motion, MotionConfig } from "framer-motion";
import * as React from "react";

const MotionBox = motion(Box);

const variants = {
  root: {
    expanded: {
      opacity: 1,
    },
    collapsed: {
      opacity: 0,
    },
  },
  shaft: {
    expanded: {
      width: "1.1rem",
    },
    collapsed: {
      width: 0,
    },
  },
  headA: {
    expanded: {
      width: "0.4rem",
    },
    collapsed: {
      width: 0,
    },
  },
  headB: {
    expanded: {
      width: "0.4rem",
    },
    collapsed: {
      width: 0,
    },
  },
};

function Arrow({ isExpanded, color = "white" }: any) {
  return (
    <MotionBox
      animate={isExpanded ? "expanded" : "collpased"}
      pos="relative"
      display="inline-flex"
      alignItems="center"
    >
      <MotionBox
        className="shaft"
        bgColor={color}
        variants={variants.shaft}
        height="1px"
        rounded="full"
      />
      <MotionBox
        className="headA"
        pos="absolute"
        right={0}
        h="1px"
        bgColor={color}
        variants={variants.headA}
        transform="rotate(40deg) translateY(0.5px)"
        transformOrigin="center right"
        rounded="full"
      />
      <MotionBox
        className="headB"
        pos="absolute"
        right={0}
        h="1px"
        bgColor={color}
        variants={variants.headB}
        transform="rotate(-40deg) translateY(-0.5px)"
        transformOrigin="center right"
        rounded="full"
      />
    </MotionBox>
  );
}

export default Arrow;
