import { useEffect, useState } from 'react'
import CreateTask from './components/CreateTask'
import ListTask from './components/TasksList'
import toast, { Toaster } from 'react-hot-toast';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import ThemeChanger from './components/ThemeChanger';

function App() {
  const [tasks, setTasks] = useState([])
  const [themeMenu, setThemeMenu] = useState(false)
  const [themeTwo, setThemeTwo] = useState(
    JSON.parse(localStorage.getItem('theme'))
  );
  const [needButtonsDrug, setNeedButtonsDrug] = useState(JSON.parse(localStorage.getItem("needButton")));

  const status = true;

  useEffect(() => {
    if (JSON.parse(localStorage.getItem("tasks")) !== null) {
      setTasks(JSON.parse(localStorage.getItem("tasks")))
    }
    if (JSON.parse(localStorage.getItem("needButton")) !== null) {
      setNeedButtonsDrug(JSON.parse(localStorage.getItem("needButton")))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem("theme", JSON.stringify(themeTwo))
  }, [themeTwo])
  useEffect(() => {
    localStorage.setItem("needButton", JSON.stringify(needButtonsDrug))
  }, [needButtonsDrug])

  return (

    <DndProvider backend={HTML5Backend}>
      <Toaster />
      {
        themeMenu
          ? <ThemeChanger
            setThemeMenu={setThemeMenu}
            themeMenu={themeMenu}
            themeTwo={themeTwo}
            setThemeTwo={setThemeTwo}
            needButtonsDrug={needButtonsDrug}
            setNeedButtonsDrug={setNeedButtonsDrug}
          />
          : <></>
      }
      <div className='w-screen overflow-hidden bg-slate-100 flex flex-col items-center'>
        <CreateTask
          themeTwo={themeTwo}
          setThemeTwo={setThemeTwo}
          tasks={tasks}
          setTasks={setTasks}
          setThemeMenu={setThemeMenu}
          themeMenu={themeMenu}
        />

        <ListTask
          tasks={tasks}
          themeTwo={themeTwo}
          setThemeTwo={setThemeTwo}
          setTasks={setTasks}
          needButtonsDrug={needButtonsDrug}
        />
      </div>
    </DndProvider>

  )
}

export default App
