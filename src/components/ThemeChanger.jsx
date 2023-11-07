import { useEffect, useState } from "react";
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

const ThemeChanger = ({ themeTwo, setThemeTwo, needButtonsDrug, setNeedButtonsDrug, setThemeMenu, themeMenu }) => {
    const [task, setTask] = useState({
        id: "",
        name: "",
        status: 'todo'
    });
    const themeControl = useAnimation();
    const themeControlTwo = useAnimation();
    const themeControlThree = useAnimation();
    const [changeButton, setCnangeButton] = useState(true);
    const [changeButtonTwo, setCnangeButtonTwo] = useState(true);
    const [changeButtonThree, setCnangeButtonThree] = useState(true);

    const [needSortedCalendy, setNeedSortedCalendy] = useState((JSON.parse(localStorage.getItem("needSortedCalendy"))));

    useEffect(() => {
        if (JSON.parse(localStorage.getItem("needSortedCalendy")) !== null) {
            setNeedSortedCalendy(JSON.parse(localStorage.getItem("needSortedCalendy")))
        }
    }, [])

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

    const changeThemeFunk3 = () => {
        setCnangeButtonThree(!changeButtonThree)
        setNeedSortedCalendy(!needSortedCalendy)

        localStorage.setItem("needSortedCalendy", JSON.stringify(!needSortedCalendy))

        if (!changeButtonThree) {
            themeControlThree.start(svgVariants.white)
        } else {
            themeControlThree.start(svgVariants.black)
        }
    }

    return (
        <section className={`flex sticky top-0 z-20 flex-col w-full h-screen items-center pt-[100px] gap-4 ${themeTwo ? "bg-slate-100" : "bg-slate-900"}`}>
            <button onClick={() => setThemeMenu(!themeMenu)} className="absolute flex gap-2 top-3 font-black text-slate-100 p-1 px-2 rounded-md bg-slate-600 hover:bg-slate-500 duration-300">
                К делам
                <span className="rotate-180">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z" />
                    </svg>
                </span>
            </button>

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

            <span onClick={changeThemeFunk3} className={`w-[300px] h-[70px] flex justify-between font-medium p-3 rounded-md items-center ${themeTwo ? "bg-slate-200 text-slate-900" : "bg-slate-700 text-slate-300"}`}>
                <p className="w-[200px]">{needSortedCalendy ? 'Добавить' : 'Убрать'}  сортировку календаря по датам?</p>
                <button onClick={changeThemeFunk3} className="bg-white border-2 border-slate-700 p-1 rounded-[50px] h-[24px] w-[40px]">
                    <motion.div animate={themeControlThree} transition={{ duration: 0.7 }} className="w-[12px] h-[12px] bg-slate-700 rounded-[50%]"></motion.div>
                </button>
            </span>

        </section>

    )
}

export default ThemeChanger;