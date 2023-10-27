import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTask from './components/TasksList'
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([])
  const [themeTwo, setThemeTwo] = useState(
    JSON.parse(localStorage.getItem('theme'))
  );

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks")) !== null) {
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeTwo))
  }, [themeTwo])

  return (

    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='w-screen overflow-hidden bg-slate-100 flex flex-col items-center'>
        <CreateTask themeTwo={themeTwo} setThemeTwo={setThemeTwo} tasks={tasks} setTasks={setTasks} />
        <ListTask tasks={tasks} themeTwo={themeTwo} setThemeTwo={setThemeTwo} setTasks={setTasks} />
      </div>
    </DndProvider>

  )
}

export default App
