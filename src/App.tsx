import { ToastProvider } from "@radix-ui/react-toast";
import { AnsweredRow } from "./components/AnsweredRow";
import { Flex, Heading } from "./components/Primitives";
import { Toast, ToastDescription, ToastViewport } from "./components/Toast";
import { WordRow } from "./components/WordRow";
import { useAttempt } from "./contexts/Attempt";
import { globalStyles } from "./styles/globalStyles";

export function App() {
  globalStyles();
  const { clearError, curr, error, attempts, gameOver } = useAttempt();

  return (
    <Flex direction="column" align="center">
      <ToastProvider>
        <Toast
          open={error}
          onOpenChange={clearError}
          css={{
            backgroundColor: "$slate3",
          }}
        >
          <ToastDescription>Apenas palavras de cinco letras!</ToastDescription>
        </Toast>
        <ToastViewport />
      </ToastProvider>
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
          marginTop: "2rem",
          marginBottom: "5rem",
        }}
      >
        {new Array(6).fill(null).map((_, i) => {
          return attempts[i] === undefined ? (
            <WordRow key={i} active={i + 1 === curr && !gameOver} />
          ) : (
            <AnsweredRow key={i} answer={attempts[i]} />
          );
        })}
      </Flex>
    </Flex>
  );
}
