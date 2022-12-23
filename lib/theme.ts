import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#fbfbfb",
      },
    },
  },
  fonts: {
    heading: `'Space Mono', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
  },
});
