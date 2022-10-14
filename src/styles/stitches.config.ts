import { slateDark } from "@radix-ui/colors";
import { createStitches } from "@stitches/react";

export const { globalCss, styled } = createStitches({
  theme: {
    colors: {
      ...slateDark,
    },
  },
});
