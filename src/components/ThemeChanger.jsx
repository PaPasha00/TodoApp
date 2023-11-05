import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import LinkButton from "./commons/LinkButton";
import { motion, useAnimation } from "framer-motion";

const svgVariants = {
    white: {
        x: 0,
    },
    black: {
        x: 15,
    }
}

const ThemeChanger = ({themeTwo, setThemeTwo, needButtonsDrug, setNeedButtonsDrug, setThemeMenu, themeMenu}) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: 'todo'
    });
    const themeControl = useAnimation();
    const themeControlTwo = useAnimation();
    const [changeButton, setCnangeButton] = useState(true);
    const [changeButtonTwo, setCnangeButtonTwo] = useState(true);

    const changeThemeFuck = () => {
        setThemeTwo(!themeTwo)
        setCnangeButton(!changeButton)

        if (!changeButton) {
            themeControl.start(svgVariants.white)
        } else {
            themeControl.start(svgVariants.black)
        }
    }

    const changeThemeFunk2 = () => {
        setCnangeButtonTwo(!changeButtonTwo)
        setNeedButtonsDrug(!needButtonsDrug)
        
        if (!changeButtonTwo) {
            themeControlTwo.start(svgVariants.white)
        } else {
            themeControlTwo.start(svgVariants.black)
        }
    }

    return (
        <section className={`flex sticky top-0 z-20 flex-col w-full h-screen items-center pt-[100px] gap-4 ${themeTwo ? "bg-slate-100" : "bg-slate-900"}`}>
            <button onClick={() => setThemeMenu(!themeMenu)} className="absolute flex gap-2 top-3 font-black text-slate-100 p-1 px-2 rounded-md bg-slate-600 hover:bg-slate-500 duration-300">К делам</button>
            
            <span onClick={changeThemeFuck} className={`w-[300px] h-[50px] flex justify-between font-medium p-3 rounded-md items-center ${themeTwo ? "bg-slate-200 text-slate-900" : "bg-slate-700 text-slate-300"}`}>
                <p>Изменить тему</p>
                <button onClick={changeThemeFuck} className="bg-white border-2 border-slate-700 p-1 rounded-[50px] w-[40px]">
                <motion.div animate={themeControl} transition={{ duration: 0.7 }} className="w-[12px] h-[12px] bg-slate-700 rounded-[50%]"></motion.div>
            </button>
            </span>
            
            <span onClick={changeThemeFunk2} className={`w-[300px] h-[150px] flex justify-between font-medium p-3 rounded-md items-center ${themeTwo ? "bg-slate-200 text-slate-900" : "bg-slate-700 text-slate-300"}`}>
                <p className="w-[200px]">{needButtonsDrug ? 'Убрать' : 'Добавить'} дополнительные кнопки для перемещания карточек</p>
                <button onClick={changeThemeFunk2} className="bg-white border-2 border-slate-700 p-1 rounded-[50px] h-[24px] w-[40px]">
                <motion.div animate={themeControlTwo} transition={{ duration: 0.7 }} className="w-[12px] h-[12px] bg-slate-700 rounded-[50%]"></motion.div>
            </button>
            </span>
            
        </section>

    )
}

export default ThemeChanger;