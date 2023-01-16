import { Button, Flex, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import React, { useState } from "react";
import Arrow from "./Arrow";

const MotionFlex = motion(Flex);

const ArrowButton = ({ text, icon, ...otherProps }: any) => {
  const [hovered, setHovered] = useState(false);
  return (
    <Button
      {...otherProps}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Flex>
        <MotionFlex
          initial={{ paddingRight: 0 }}
          animate={{ paddingRight: hovered ? "0.5rem" : 0 }}
        >
          <Arrow isExpanded={hovered} />
        </MotionFlex>
        <Text>{text}</Text>
        <MotionFlex
          alignItems="center"
          justifyContent="center"
          initial={{ paddingLeft: "0.5rem", width: "1.5rem" }}
          animate={{
            paddingLeft: !hovered ? "0.5rem" : 0,
            width: !hovered ? "1.5rem" : 0,
            overflow: "hidden",
          }}
        >
          {icon}
        </MotionFlex>
      </Flex>
    </Button>
  );
};

export default ArrowButton;
