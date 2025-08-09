import Container from './UI/Container.tsx';
import {Timer as TimerProps, useTimersContext} from "../store/timers-context.tsx";
import {useEffect, useRef, useState} from "react";

export default function Timer({name, duration}: TimerProps) {
    const interval = useRef<number | null>(null);
    const [remainingTime, setRemainingTime] = useState<number>(duration * 1000);
    const {isRunning} = useTimersContext();

    if (remainingTime <= 0 && interval.current) {
        clearInterval(interval.current);
    }

    useEffect(() => {
        let timer: number;
        if (isRunning) {
            timer = setInterval(() => {
                setRemainingTime(prevTime => {
                    if (prevTime <= 0) {
                        return 0;
                    }
                    return prevTime - 50;
                });
            }, 50);
            interval.current = timer;
        } else if (!isRunning && interval.current) {
            clearInterval(interval.current);
        }

        return () => {
            clearInterval(timer);
        };
    }, [isRunning]);

    return (
        <Container as="article">
            <h2>{name}</h2>
            <p>
                <progress max={duration * 1000} value={remainingTime}/>
            </p>
            <p>{(remainingTime / 1000).toFixed(2)}</p>
        </Container>
    );
}
