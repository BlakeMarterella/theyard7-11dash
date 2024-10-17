import { useEffect, useState } from "react";
import Header from "../components/Header";
import { addRunner, getAllRunners } from "../services/runners.service";
import IRunner from "../types/runner";
import RunnerCard from "../components/RunnerCard";

export default function Runners() {
    const [newRunner, setNewRunner] = useState<Omit<IRunner, 'id'>>({
        name: '',
        isDeleted: false,
    })
    const [runners, setRunners] = useState<IRunner[]>([]);

    useEffect(() => {
        const fetchRunners = async () => {
            setRunners(await getAllRunners());
        };
        fetchRunners();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setNewRunner((prevRunner) => ({
            ...prevRunner,
            [name]: value
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        
        await addRunner({
            ...newRunner
        });
        
        setNewRunner({
            name: "",
            isDeleted: false
        });
    };

    return ( <>
        <Header text="Runners"></Header>
        <div className="container mx-auto p-4">
            <form onSubmit={handleSubmit}>
                <h2 className="text-xl font-bold mb-2">Create New Runner</h2>
                <div className="flex flex-col mb-4">
                    <label htmlFor="name" className="mb-2">Name:</label>
                    <input type="text" name="name" onChange={handleChange} required className="border border-gray-300 p-2" />
                </div>
                <button type="submit" className="bg-711-green text-white py-2 px-4 rounded">Create</button>
            </form>
            
            <div className="h-1 rounded-xl bg-gray-300 my-5"></div>

            <h2 className="text-xl font-bold mb-2">Runner</h2>
                <div className="grid grid-cols-3 gap-4">
                    {runners.map((runner: IRunner) => (
                        <RunnerCard runner={runner} key={runner.id}/>
                    ))}
                </div>
        </div>
    </>
    );
}