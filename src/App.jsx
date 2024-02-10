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
  const [fullScreen, setFullScreen] = useState(false)
  const [themeTwo, setThemeTwo] = useState(
    JSON.parse(localStorage.getItem('theme'))
  );
  const [needButtonsDrug, setNeedButtonsDrug] = useState(JSON.parse(localStorage.getItem("needButton")));

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

  const fullScreenFunk = () => {
    if (!fullScreen) {
      function fullScreen(element) {
        if(element.requestFullscreen) {
          element.requestFullscreen();
        } else if(element.webkitrequestFullscreen) {
          element.webkitRequestFullscreen();
        } else if(element.mozRequestFullscreen) {
          element.mozRequestFullScreen();
        }
      }
      const html = document.documentElement;
      fullScreen(html);
    } else {
      function fullScreenCancel() {
        if(document.requestFullscreen) {
          document.requestFullscreen();
        } else if(document.webkitRequestFullscreen ) {
          document.webkitRequestFullscreen();
        } else if(document.mozRequestFullscreen) {
          document.mozRequestFullScreen();
        }
      }
      fullScreenCancel();
    }
    setFullScreen(!fullScreen)
  }

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
          fullScreenFunk={fullScreenFunk}
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
