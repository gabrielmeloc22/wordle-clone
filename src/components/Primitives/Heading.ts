import { styled } from "../../styles/stitches.config";

export const Heading = styled("h1", {
  variants: {
    size: {
      sm: {
        fontSize: "xx-large",
      },
      md: {
        fontSize: "xxx-large",
      },
      lg: {
        fontSize: "5rem",
      },
    },
    weight: {
      light: {
        fontWeight: "light",
      },
      regular: {
        fontWeight: "normal",
      },
      bold: {
        fontWeight: "bold",
      },
    },
  },
  defaultVariants: {
    size: "md",
    weight: "bold",
  },
});
