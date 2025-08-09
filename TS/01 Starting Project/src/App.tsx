import CourseGoal from "./components/CourseGoal.tsx";
import Header from "./components/Header.tsx";
import goalsImage from "./assets/goals.jpg";
import {useState} from "react";
import CourseGoalList from "./components/CourseGoalList.tsx";
import NewGoal from "./components/NewGoal.tsx";

export type CourseGoal = {
    title: string;
    description: string;
    id: number;
}

export default function App() {
    const [goals, setGoals] = useState<CourseGoal[]>([]);

    function handleAddGoal(goal:string, summary: string) {
        setGoals(prevGoals => {
            const newGoal = {
                title: goal,
                description: summary,
                id: Math.random()
            };
            return [...prevGoals, newGoal];
        })
    }

    function handleRemoveGoal(id: number) {
        setGoals(prevGoals => prevGoals.filter(goal => goal.id !== id));
    }

    return (
        <main>
            <Header image={{src: goalsImage, alt: "List of Goals"}}>
                <h1>Your Course Goals</h1>
            </Header>
            <NewGoal onAddGoal={handleAddGoal} />

            <CourseGoalList goals={goals} onDeleteGoal={handleRemoveGoal} />
        </main>
    );
}