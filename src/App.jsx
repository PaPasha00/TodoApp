import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTask from './components/TasksList'
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks")) !== null) setTasks(JSON.parse(localStorage.getItem("tasks")))
  }, [])

  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className='h-screen w-screen bg-slate-100 flex flex-col items-center'>
        <CreateTask tasks={tasks} setTasks={setTasks} />
        <ListTask tasks={tasks} setTasks={setTasks} />
      </div>
    </DndProvider>

  )
}

export default App
