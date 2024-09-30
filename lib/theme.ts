import { extendTheme } from "@chakra-ui/react";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  styles: {
    global: {
      body: {
        bg: "#fbfbfb",
        fontSize: {
          base: "0.75rem",
          md: "1rem",
        },
      },
    },
  },
  fonts: {
    heading: `'Space Mono', sans-serif`,
    body: `'Space Grotesk', sans-serif`,
  },
  semanticTokens: {
    colors: {
      offwhite: "#fbfbfb",
      charcoal: "#313131",
    },
    borders: {
      sm: "1px solid var(--chakra-colors-charcoal)",
    },
  },
  components: {
    Heading: {
      baseStyle: {
        letterSpacing: "0.05rem",
        color: "charcoal",
      },
    },
    Text: {
      baseStyle: {
        letterSpacing: "0.05rem",
        color: "blackAlpha.600",
        lineHeight: "155%",
      },
    },
    Button: {
      baseStyle: {
        rounded: "none",
        transition: "filter 0.3s",
      },
      variants: {
        primary: {
          bg: "charcoal",
          filter: "brightness(100%)",
          color: "white",
          _hover: {
            bg: "charcoal",
            filter: "brightness(90%)",
          },
          _active: {
            bg: "charcoal",
            filter: "brightness(80%)",
          },
        },
        secondary: {
          bg: "transparent",
          filter: "brightness(100%)",
          color: "charcoal",
          _hover: {
            bg: "transparent",
            filter: "brightness(90%)",
          },
          _active: {
            bg: "transparent",
            filter: "brightness(80%)",
          },
        },
        dashed: {
          bg: "transparent",
          border: "1px dashed black",
          filter: "brightness(100%)",
          color: "charcoal",
          _hover: {
            bg: "transparent",
            filter: "brightness(90%)",
          },
          _active: {
            bg: "transparent",
            filter: "brightness(80%)",
          },
        },
      },
    },
  },
});
