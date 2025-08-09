import {type FormEvent, useRef} from "react";

type NewGoalProps = {
    onAddGoal: (title: string, summary: string) => void;
}

export default function NewGoal({onAddGoal}: NewGoalProps) {
    const goal = useRef<HTMLInputElement>(null);
    const summary = useRef<HTMLInputElement>(null);

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault();

        const enteredGoal = goal.current!.value;
        const enteredSummary = summary.current!.value;
        event.currentTarget.reset();

        onAddGoal(enteredGoal, enteredSummary);
    }

    return (
        <form onSubmit={handleSubmit}>
            <p>
                <label htmlFor="goal">Your Goal</label>
                <input type="text" id="goal" ref={goal}/>
            </p>
            <p>
                <label htmlFor="summary">Short Summary</label>
                <input type="text" id="summary" ref={summary}/>
            </p>
            <p>
                <button type="submit">Add Goal</button>
            </p>
        </form>
    );
}