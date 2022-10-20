import { createContext, useContext, useReducer } from "react";

type State = {
  curr: number;
  attempts: Array<string[]>;
  error: boolean;
  gameOver: boolean;
  hasWon: boolean;
};

type Action = {
  type: "sendAnswer" | "setError";
  payload: Partial<State>;
};

interface AttemptContextData extends State {
  clearError: () => void;
  sendAnswer: (answer: string[]) => void;
}

interface AttemptProvider {
  children: React.ReactNode;
}

const AttemptContext = createContext({} as AttemptContextData);

const reducer = (state: State, { payload, type }: Action): State => {
  switch (type) {
    case "sendAnswer":
      const hasWon = payload.attempts?.some((attempt) => attempt.join("") === "carro") || false;
      return {
        ...state,
        error: false,
        curr: state.curr + 1,
        hasWon,
        gameOver: state.curr === 6 || hasWon,
        attempts: [...state.attempts, ...payload?.attempts!],
      };
    case "setError":
      return {
        ...state,
        error: payload?.error!,
      };
    default:
      throw new Error("Invalid action");
  }
};

const initialState: State = {
  attempts: [],
  curr: 1,
  error: false,
  hasWon: false,
  gameOver: false,
};

export function AttemptProvider({ children }: AttemptProvider) {
  const [state, dispatch] = useReducer(reducer, initialState);

  function sendAnswer(answer: string[]) {
    if (answer.length !== 5) return;
    if (answer.some((letter) => letter === "")) {
      dispatch({
        type: "setError",
        payload: {
          error: true,
        },
      });
      return;
    }
    dispatch({ payload: { attempts: [answer] }, type: "sendAnswer" });
  }

  function clearError() {
    dispatch({
      type: "setError",
      payload: {
        error: false,
      },
    });
  }

  return (
    <AttemptContext.Provider value={{ ...state, sendAnswer, clearError }}>{children}</AttemptContext.Provider>
  );
}

export const useAttempt = () => {
  return useContext(AttemptContext);
};
