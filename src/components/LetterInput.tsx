import { useEffect } from "react";
import { Box } from "./Primitives";
import { LetterInputPrimitive } from "./Primitives/LetterInputPrimitive";

interface LetterInputProps extends React.ComponentPropsWithoutRef<typeof Box> {
  isFocused: boolean;
  inputKey: number;
  setFocusedInput: React.Dispatch<React.SetStateAction<number>>;
  setWord: React.Dispatch<React.SetStateAction<string[]>>;
}

export function LetterInput({
  isFocused,
  setFocusedInput,
  setWord,
  children,
  inputKey,
  css,
  ...props
}: LetterInputProps) {
  useEffect(() => {
    const validKeys = "abcdefghijklmnopqrstuvwxyz";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isFocused) return;
      if (validKeys.includes(e.key)) {
        setWord((prevWord) => prevWord.map((letter, i) => (i === inputKey ? e.key : letter)));
        inputKey !== 4 && setFocusedInput(inputKey + 1);
      }

      switch (e.key) {
        case "Backspace":
          setWord((prevWord) => prevWord.map((letter, i) => (i === inputKey ? "" : letter)));
          inputKey !== 0 && setFocusedInput(inputKey - 1);
          break;
        case "ArrowLeft":
          inputKey !== 0 && setFocusedInput(inputKey - 1);
          break;
        case "ArrowRight":
          inputKey !== 4 && setFocusedInput(inputKey + 1);
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  });

  return (
    <LetterInputPrimitive
      onClick={() => setFocusedInput(inputKey)}
      css={{
        outline: isFocused ? "2px solid $slate11" : "none",
        "&:hover": {
          cursor: "pointer",
        },
      }}
      {...props}
    >
      {children}
    </LetterInputPrimitive>
  );
}
