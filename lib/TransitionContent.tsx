import { Box } from "@chakra-ui/react";
import { Item } from "./pagex";

const keyframes = {
  heading: {
    enter: {
      // how heading will appear 0% of the way through page entrance
      0: {
        translateY: 110,
      },
      // how heading will appear 60% of the way through page entrance
      0.6: {
        translateY: 0,
      },
    },
    exit: {
      // how heading will appear 0% of the way through page exit
      0: {
        translateY: 0,
      },
      // how heading will appear 50% of the way through page exit
      0.5: {
        translateY: -70,
      },
    },
  },
};

const TransitionContent = ({ children }: any) => {
  return (
    <Box as={Item} keyframes={keyframes.heading} transformOrigin="50% 0%">
      {children}
    </Box>
  );
};

export default TransitionContent;
