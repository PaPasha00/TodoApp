import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import LinkButton from "./commons/LinkButton";

const svgVariants = {
    white: {
        x: 0,
    },
    black: {
        x: 15,
    }
}

const CreateTask = ({ tasks, setTasks, themeTwo, setThemeTwo, setThemeMenu, themeMenu }) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: 'todo'
    });
    const themeControl = useAnimation();
    const [changeButton, setCnangeButton] = useState(true);

    const changeThemeFuck = () => {
        setThemeTwo(!themeTwo)
        setCnangeButton(!changeButton)

        if (!changeButton) {
            themeControl.start(svgVariants.white)
        } else {
            themeControl.start(svgVariants.black)
        }
    }


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
        <div className={`w-full h-[150px] flex gap-3 justify-center ${themeTwo ? 'bg-slate-200' : 'bg-slate-900'} items-center`}>
            <LinkButton path='/Calendar' text='Календарь' needReverse='false' />
            <button onClick={() => setThemeMenu(!themeMenu)} className={`absolute top-3 p-1 md:p-3 rounded-md right-5 text-white ${themeTwo ? 'bg-slate-700' : 'bg-slate-500'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42" />
                </svg>
            </button>


            <form onSubmit={handleSubmit} className="flex gap-1">
                <input type="text"
                    className={`border-2 border-slate-500  rounded-md ${themeTwo ? 'bg-slate-100 text-black' : 'bg-slate-600 text-slate-100'} p-1 pl-3`}
                    value={task.name}
                    onChange={(e) => setTask({ ...task, id: uuidv4(), name: e.target.value })}
                />
                <button className={`p-2 bg-s  rounded-md ${themeTwo ? 'bg-slate-500 text-white' : 'bg-slate-600 text-slate-100'} text-white font-bold hover:bg-slate-400 duration-300`}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </form>

        </div>
    );
}

export default CreateTask;