import { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import toast from "react-hot-toast";

const ListTasks = ({ tasks, setTasks }) => {
    const [todos, setTodos] = useState([]);
    const [inProgress, setInProgress] = useState([]);
    const [closed, setClosed] = useState([]);

    useEffect(() => {
        if (localStorage.getItem("tasks") !== null) {
            const fTodos = tasks.filter((task) => task.status === 'todo')
            const fInProgress = tasks.filter((task) => task.status === 'inprogress')
            const fClosed = tasks.filter((task) => task.status === 'closed')
            setTodos(fTodos)
            setInProgress(fInProgress)
            setClosed(fClosed)
        }
    }, [tasks])

    const statuses = ['todo', 'inprogress', 'closed'];


    return (
        <div className="w-full overflow-x-scroll flex pl-3 md:pl-10 gap-3 md:gap-10 p-10 pt-0 min-h-[calc(100vh-150px)]">
            {
                statuses.map((status, index) => (
                    <Section
                        key={index}
                        status={status}
                        tasks={tasks}
                        setTasks={setTasks}
                        todos={todos}
                        inProgress={inProgress}
                        closed={closed}
                    />
                ))
            }
        </div>
    );
}

export default ListTasks;

const Section = ({ status, tasks, setTasks, todos, inProgress, closed }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "task",
        drop: (item) => addItemtoSection(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver()
        })
    }))

    const addItemtoSection = (id) => {
        setTasks(prev => {
            const mTasks = prev.map(t => {
                if (t.id === id) {
                    return { ...t, status: status }
                }
                return t
            })

            localStorage.setItem('tasks', JSON.stringify(mTasks));
            toast.success("Успешно")

            return mTasks;
        })
    }

    let text = "Сделать";
    let bg = 'bg-slate-500';
    let tasksToMap = todos;

    if (status === 'inprogress') {
        text = 'В процессе...';
        bg = 'bg-purple-500';
        tasksToMap = inProgress;
    }
    if (status === 'closed') {
        text = 'Готово!';
        bg = 'bg-green-500';
        tasksToMap = closed;
    }
    return (
        <div ref={drop} className={`${isOver ? 'bg-slate-200' : ""} flex flex-col p-2 rounded-md`}>
            <Header bg={bg} text={text} count={tasksToMap.length} />
            {
                tasksToMap.length > 0
                && tasksToMap.map((task) => (
                    <Task key={task.id} task={task} tasks={tasks} setTasks={setTasks} />
                ))
            }
        </div>
    )
}

const Header = ({ text, bg, count }) => {
    return (
        <div className={`${bg} p-2 px-4 flex justify-between rounded-md w-[240px] md:w-[300px] text-white font-medium`}>
            {text}
            <div className="bg-white text-slate-500 rounded-[50%] w-[25px] h-[25px] flex justify-center">
                {count}
            </div>
        </div>
    )
}

const Task = ({ task, tasks, setTasks }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "task",
        item: { id: task.id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging()
        })
    }))

    const handleRemove = (id) => {
        const fTasks = tasks.filter(t => t.id !== id)
        localStorage.setItem("tasks", JSON.stringify(fTasks))
        setTasks(fTasks)
        toast("Задача удалена", { icon: "👎😢" })
    }
    return (
        <div ref={drag} className={`relative flex justify-between p-4 mt-3 shadow-md rounded-md cursor-grab ${isDragging ? "opacity-30" : "opacity-100"}`}>
                <p>{task.name}</p>
                <button className="" onClick={() => handleRemove(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
        </div>
    )
}