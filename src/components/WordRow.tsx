import { keyframes } from "@stitches/react";
import { useEffect, useState } from "react";
import { useAttempt } from "../contexts/Attempt";
import { LetterInput } from "./LetterInput";
import { Box, Flex } from "./Primitives";

interface WordRowProps {
  active: boolean;
}

const errorAnimation = keyframes({
  "0%": {
    transform: "translateX(0)",
  },
  "25%": {
    transform: "translateX(1.25rem)",
  },
  "50%": {
    transform: "translateX(-1.25rem)",
  },
  "100%": {
    transform: "translateX(0)",
  },
});

export function WordRow({ active }: WordRowProps) {
  const [focusedInput, setFocusedInput] = useState(0);
  const [word, setWord] = useState(["", "", "", "", ""]);
  const { sendAnswer, error } = useAttempt();

  useEffect(() => {
    if (!active) return;
    const handleSubmitWord = (e: KeyboardEvent) => {
      if (e.key !== "Enter") return;
      sendAnswer(word);
    };
    document.addEventListener("keydown", handleSubmitWord);

    return () => document.removeEventListener("keydown", handleSubmitWord);
  }, [word, active]);

  if (!active) {
    return (
      <Flex
        css={{
          marginTop: "1rem",
          gap: "0.75rem",
        }}
      >
        {new Array(5).fill(null).map((_, i) => (
          <Box
            key={i}
            css={{
              width: "5.25rem",
              height: "5.25rem",
              backgroundColor: "$slate5",
              borderRadius: "0.5rem",
            }}
          />
        ))}
      </Flex>
    );
  }

  return (
    <Flex
      css={{
        marginTop: "1rem",
        gap: "0.75rem",
        animation: error ? `${errorAnimation} 0.3s ease-in-out` : "",
      }}
    >
      {new Array(5).fill(null).map((_, i) => (
        <LetterInput
          key={i}
          inputKey={i}
          setFocusedInput={setFocusedInput}
          setWord={setWord}
          isFocused={i === focusedInput}
        >
          {word[i]}
        </LetterInput>
      ))}
    </Flex>
  );
}
