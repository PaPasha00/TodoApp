import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

const CreateTask = ({ tasks, setTasks }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: 'todo'
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        if (task.name.length < 3)
            return toast.error('В задаче должно быть не менее трёх символов')

        if (task.name.length > 100)
            return toast.error('В задаче должно быть не более 100 символов')

        setTasks((prev) => {
            const list = [...prev, task];

            localStorage.setItem("tasks", JSON.stringify(list))

            return list
        });

        toast.success('Задача создана')

        setTask({
            id: "",
            name: "",
            status: "todo",
        });
    };

    return (
        <div className="w-full h-[150px] flex justify-center items-center">
            <form onSubmit={handleSubmit} className="flex gap-1">
                <input type="text"
                    className="border border-white rounded-md p-1 pl-3"
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <button className="p-2 bg-s bg-slate-500 rounded-md text-white font-bold hover:bg-slate-400 duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </form>

        </div>
    );
}

export default CreateTask;