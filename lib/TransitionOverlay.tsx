import {
  motion,
  useMotionTemplate,
  useTransform,
  useSpring,
} from "framer-motion";
import { Item, usePage } from "./pagex";
import { chakra, Box } from "@chakra-ui/react";

const Svg = chakra("svg");

const keyframes = {
  enterOverlay: {
    enter: {
      0: {
        translateY: "0%",
      },
      0.4: {
        translateY: "-100%",
      },
    },
  },
  exitOverlay: {
    exit: {
      0.15: {
        translateY: "100%",
      },
      0.4: {
        translateY: "0%",
      },
    },
  },
};

const springConfig = {
  mass: 0.2,
  damping: 10,
  stiffness: 100,
};

const EnterPanel = () => {
  const { enterProgress } = usePage();
  const curveAmount = useTransform(enterProgress, (progress) => {
    if (progress < 0.1) {
      return 100;
    } else if (progress < 0.5) {
      return 75;
    } else {
      return 100;
    }
  });
  const curveAmountSpring = useSpring(curveAmount, springConfig);
  const d = useMotionTemplate`M 0 0 L 100 0 L 100 100 Q 50 ${curveAmountSpring} 0 100 L 0 100`;
  return (
    <Box
      as={Item}
      keyframes={keyframes.enterOverlay}
      pos="fixed"
      inset={0}
      zIndex={2}
    >
      <Svg
        w="100vw"
        h="100svh"
        overflow="visible"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path fill="black" d={d} />
      </Svg>
    </Box>
  );
};

const ExitPanel = () => {
  const { exitProgress } = usePage();
  const curveAmount = useTransform(exitProgress, (progress) => {
    progress = progress || 0;
    if (progress < 0.1) {
      return 4;
    } else if (progress < 0.5) {
      return 25;
    } else {
      return 1;
    }
  });
  const curveAmountSpring = useSpring(curveAmount, springConfig);
  const d = useMotionTemplate`M 0 0 Q 50 -${curveAmountSpring} 100 0 L 100 100 L 0 100`;
  return (
    <Box
      as={Item}
      keyframes={keyframes.exitOverlay}
      pos="fixed"
      inset={0}
      zIndex={2}
    >
      <Svg
        w="100vw"
        h="100svh"
        overflow="visible"
        viewBox="0 0 100 100"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <motion.path fill="black" d={d} />
      </Svg>
    </Box>
  );
};

const TransitionOverlay = () => {
  return (
    <>
      <EnterPanel />
      <ExitPanel />
    </>
  );
};

export default TransitionOverlay;
