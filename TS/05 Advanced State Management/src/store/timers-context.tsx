import {createContext, type ReactNode, useContext, useReducer} from "react";
import Timer from "../components/Timer.tsx";

export type Timer = {
    name: string;
    duration: number;
}

type TimersState = {
    isRunning: boolean;
    timers: Timer[]
}

type TimersContextValue = TimersState & {
    addTimer: (timerData: Timer) => void;
    startTimers: () => void;
    stopTimers: () => void;
};

const TimersContext = createContext<TimersContextValue | null>(null);

export function useTimersContext() {
    const timersContext = useContext(TimersContext);
    if (timersContext === null) {
        throw new Error("TimersContext must NOT be NULL");
    }
    return timersContext;
}


type TimersContextProps = {
    children: ReactNode;
}

type StartTimersAction = {
    action: 'start';
}
type StopTimersAction = {
    action: 'stop';
}
type AddTimerAction = {
    action: 'add';
    timerData: Timer;
}

type TimersAction = StartTimersAction | StopTimersAction | AddTimerAction;

const initialState: TimersState = {
    isRunning: false,
    timers: []
}

export function timersReducer(state: TimersState, action: TimersAction) {
    if (action.action === 'start') {
        return {
            ...state,
            isRunning: true
        };
    }

    if (action.action === 'stop') {
        return {
            ...state,
            isRunning: false
        };
    }

    if (action.action === 'add') {
        return {
            ...state,
            timers: [...state.timers, action.timerData]
        };
    }

    return state;
}

export default function TimersContextProvider({children}: TimersContextProps) {
    const [timersState, dispatch] = useReducer(timersReducer, initialState);

    const ctx: TimersContextValue = {
        timers: timersState.timers,
        isRunning: timersState.isRunning,
        addTimer: (timerData: Timer) => {
            dispatch({action: 'add', timerData});
        },
        startTimers: () => {
            dispatch({action: 'start'});
        },
        stopTimers: () => {
            dispatch({action: 'stop'});
        }
    };

    return (
        <TimersContext.Provider value={ctx}>
            {children}
        </TimersContext.Provider>
    );
}