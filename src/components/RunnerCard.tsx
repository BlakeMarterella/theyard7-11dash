import IRunner from "../types/runner";
import { deleteRunner } from "../services/runners.service";

interface RunnerProps {
    runner: IRunner
}

export default function RunnerCard(props: RunnerProps) {
    
    const handleDelete = async () => {
        await deleteRunner(props.runner.id ? props.runner.id : "");
    };

    return (
        <>
            <h2>{props.runner.name}</h2>
            <button onClick={handleDelete}>Delete</button>
        </>
    )
}