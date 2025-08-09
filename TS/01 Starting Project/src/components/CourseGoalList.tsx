import {type CourseGoal as CGoal} from "../App.tsx";
import CourseGoal from "./CourseGoal.tsx";
import InfoBox from "./InfoBox.tsx";
import {type ReactNode} from "react";

type CourseGoalListProps = {
    goals: CGoal[];
    onDeleteGoal: (id: number) => void;
}

export default function CourseGoalList({goals, onDeleteGoal}: CourseGoalListProps) {
    if (goals.length === 0) {
        return (<InfoBox mode="hint">
            You have no goals yet. Start by adding one!
        </InfoBox>);
    }

    let warningBox: ReactNode;
    if (goals.length >= 4) {
        warningBox = (<InfoBox mode="warning" severity="medium">
            You have {goals.length} goals. Consider removing some to focus on the most important ones.
        </InfoBox>);
    }

    return (
        <>
            {warningBox}
            <ul>
                {goals.map((goal: CGoal) => (
                    <li key={goal.id}>
                        <CourseGoal id={goal.id} title={goal.title} onDelete={onDeleteGoal}>
                            <p>{goal.description}</p>
                        </CourseGoal>
                    </li>
                ))}
            </ul>
        </>
    );
}