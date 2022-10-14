import { Flex } from ".";
import { styled } from "../../styles/stitches.config";

export const LetterInputPrimitive = styled(Flex, {
  textTransform: "uppercase",
  color: "$slate11",
  fontSize: "3rem",
  fontWeight: "bold",
  width: "5rem",
  height: "5rem",
  borderRadius: "0.5rem",
  border: "2px solid $slate11",
  defaultVariants: {
    align: "center",
    justify: "center",
  },
});
