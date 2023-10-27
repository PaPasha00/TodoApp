import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { useAnimation } from "framer-motion";

const svgVariants = {
    white: {
        x: 0,
    },
    black: {
        x: 17,
    }
}

const CreateTask = ({ tasks, setTasks, themeTwo, setThemeTwo }) => {

    const [task, setTask] = useState({
        id: "",
        name: "",
        status: 'todo'
    });
    const themeControl = useAnimation();

    const changeThemeFuck = () => {
        setThemeTwo(!themeTwo)
        
        if (!themeTwo) {
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
        <div className={`w-full h-[150px] flex gap-3 justify-center ${themeTwo ? 'bg-slate-100' : 'bg-slate-900'} items-center`}>
            <button onClick={changeThemeFuck} className="bg-white border-2 border-slate-700 p-1 rounded-[50px] w-[40px]">
                <motion.div animate={themeControl} transition={{ duration: 0.7 }} className="w-[12px] h-[12px] bg-slate-700 rounded-[50%]"></motion.div>
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