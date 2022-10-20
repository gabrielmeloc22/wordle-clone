import * as ToastPrimitive from "@radix-ui/react-toast";
import { keyframes } from "@stitches/react";
import { styled } from "../styles/stitches.config";

const fadeOut = keyframes({
  "0%": { opacity: 1, transform: "translateY(11vh)" },
  "100%": { opacity: 0, transform: "translateY(8vh)" },
});

const slideIn = keyframes({
  "0%": { opacity: 0, transform: "translateY(5vh)" },
  "100%": { opacity: 1, transform: "translateY(11vh)" },
});

export const ToastTitle = styled(ToastPrimitive.Title, {
  color: "$slate11",
  fontSize: "1.5rem",
  fontWeight: "bold",
});
export const ToastDescription = styled(ToastPrimitive.Description, {
  color: "$slate11",
});
export const ToastViewport = styled(ToastPrimitive.Viewport, {
  position: "fixed",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  flexDirection: "column",
  padding: "1rem",
  gap: 10,
  margin: 0,
  listStyle: "none",
  zIndex: 2147483647,
  outline: "none",
});
export const Toast = styled(ToastPrimitive.Root, {
  display: "flex",
  borderRadius: "0.25rem",
  alignItems: "center",
  padding: "1rem",
  flexDirection: "column",
  backgroundColor: "$slate3",
  "@media (prefers-reduced-motion: no-preference)": {
    "&[data-state=open]": {
      animation: `${slideIn} 300ms cubic-bezier(.07,1.74,.67,.91) forwards`,
    },
    "&[data-state='closed']": {
      animation: `${fadeOut} 500ms ease-in forwards`,
    },
  },
});
