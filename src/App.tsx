import { AnsweredRow } from "./components/AnsweredRow";
import { Flex, Heading } from "./components/Primitives";
import { WordRow } from "./components/WordRow";
import { useAttempt } from "./contexts/Attempt";
import { globalStyles } from "./styles/globalStyles";

export function App() {
  globalStyles();
  const {
    attempt: { curr, error, attempts },
  } = useAttempt();

  return (
    <Flex direction="column" align="center">
      {error && <Heading onAnimationEnd={() => {}}>Erro</Heading>}
      <Heading
        size="md"
        css={{
          padding: "1rem",
          color: "$slate12",
        }}
      >
        Wordle
      </Heading>
      <Flex
        direction="column"
        css={{
          marginBottom: "5rem",
        }}
      >
        {new Array(6).fill(null).map((_, i) => {
          return attempts[i] === undefined ? (
            <WordRow key={i} active={i + 1 === curr} />
          ) : (
            <AnsweredRow key={i} answer={attempts[i]} />
          );
        })}
      </Flex>
    </Flex>
  );
}
