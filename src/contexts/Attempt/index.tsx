import { createContext, useContext, useReducer } from "react";

type State = {
  curr: number;
  attempts: Array<string[]>;
  error: boolean;
};

type Action = {
  type: "sendAnswer" | "setError";
  payload: Partial<State>;
};

interface AttemptContextData {
  attempt: State;
  sendAnswer: (answer: string[]) => void;
}

interface AttemptProvider {
  children: React.ReactNode;
}

const AttemptContext = createContext({} as AttemptContextData);

const reducer = (state: State, { payload, type }: Action): State => {
  switch (type) {
    case "sendAnswer":
      return {
        ...state,
        error: false,
        curr: state.curr + 1,
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
      setTimeout(() => {
        dispatch({
          type: "setError",
          payload: {
            error: false,
          },
        });
      }, 500);
      return;
    }
    dispatch({ payload: { attempts: [answer] }, type: "sendAnswer" });
  }

  return <AttemptContext.Provider value={{ attempt: state, sendAnswer }}>{children}</AttemptContext.Provider>;
}

export const useAttempt = () => {
  return useContext(AttemptContext);
};
