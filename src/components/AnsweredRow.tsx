import { keyframes } from "@stitches/react";
import { Flex } from "./Primitives";
import { LetterInputPrimitive } from "./Primitives/LetterInputPrimitive";

interface AnsweredRowProps extends React.ComponentPropsWithoutRef<typeof Flex> {
  answer: string[];
}

type State = "correct" | "incorrect" | "contains";
type StyleProps = {
  backgroundColor: string;
  color: string;
};

const propsByState: Record<State, StyleProps> = {
  correct: {
    color: "#82d382",
    backgroundColor: "#1f491f",
  },
  incorrect: {
    color: "$slate10",
    backgroundColor: "$slate3",
  },
  contains: {
    color: "#e4db90",
    backgroundColor: "#5e5825",
  },
};

const revealAnimation = keyframes({
  "0%": {
    perspective: "1000px",
    transform: "rotate3d(0, 1, 0, 0)",
  },
  "50%": {
    perspective: "10px",
    transform: "rotate3d(0, 1, 0, 90deg)",
  },
  "100%": {
    perspective: "1000px",
    transform: "rotate3d(0, 1, 0, 180deg)",
  },
});

export function AnsweredRow({ answer }: AnsweredRowProps) {
  const solution = ["c", "a", "r", "r", "o"];
  const solutionStyles = getStyleProps(answer, solution);

  return (
    <Flex
      css={{
        marginTop: "1rem",
        gap: "0.75rem",
      }}
    >
      {answer.map((letter, i) => (
        <LetterInputPrimitive
          key={i}
          css={{
            width: "5.25rem",
            height: "5.25rem",
            backgroundColor: "$slate5",
            position: "relative",
            transformStyle: "preserve-3d",
            border: "none",
            "&:after": {
              position: "absolute",
              content: `${letter}`,
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transform: "translateZ(-1px) rotate3d(0, 1, 0, 180deg)",
              borderRadius: "0.5rem",
              ...solutionStyles[i],
            },
            animation: `${revealAnimation} 0.5s ease-in-out forwards`,
            animationDelay: `${i * 0.2}s`,
          }}
        >
          {letter}
        </LetterInputPrimitive>
      ))}
    </Flex>
  );
}

const getStyleProps = (answer: string[], solution: string[]) => {
  const styles: StyleProps[] = [];
  const letterCount = solution.reduce((acc, curr) => {
    return {
      ...acc,
      [curr]: (acc[curr] || 0) + 1,
    };
  }, {} as Record<string, number>);
  console.log(letterCount);

  answer.forEach((letter, i) => {
    console.log(letter, solution[i]);
    if (letter === solution[i]) {
      styles.push(propsByState.correct);
      letterCount[letter]--;
    } else {
      styles.push(propsByState.incorrect);
    }
  });

  answer.forEach((letter, i) => {
    if (solution.includes(letter) && letterCount[letter] >= 1 && letter !== solution[i]) {
      styles[i] = propsByState.contains;
      letterCount[letter]--;
    }
  });

  return styles;
};
