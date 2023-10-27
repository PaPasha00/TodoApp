import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const ThemeChanger = () => {
    const [theme, setTheme] = useState({
        name: '',
        bg: 'bg-[#000000]',
        bgInput: 'bg-[#000000]',
        button: 'bg-[#000000]',
        todo: 'bg-[#000000]',
        inprogress: 'bg-[#000000]',
        closed: 'bg-[#000000]'
    }
    )
    return (
        <div className="flex justify-center pt-[100px] flex-col items-center">
            <Link to={`/`} className="absolute top-5 flex gap-2 items-center font-bold hover:text-slate-500 duration-300">К задачам
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
                </svg>

            </Link>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите название темы</span>
                <input onChange={(e) => { setTheme({ ...theme, name: `${e.target.value}` }); }}
                    className="border-2 border-slate-400 rounded-md p-2" type="text"
                />
            </div>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите цвет фона</span>
                <input onChange={(e) => { setTheme({ ...theme, bg: `bg-[${e.target.value}]` }); }}
                    className="border-2 border-slate-400 rounded-md" type="color"
                />
            </div>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите поля ввода</span>
                <input onChange={(e) => { setTheme({ ...theme, bgInput: `bg-[${e.target.value}]` }); }}
                    className="border-2 border-slate-400 rounded-md" type="color"
                />
            </div>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите цвет кнопки добавления задачи</span>
                <input onChange={(e) => { setTheme({ ...theme, button: `bg-[${e.target.value}]` }); }}
                    className="border-2 border-slate-400 rounded-md" type="color"
                />
            </div>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите цвет "Сделать"</span>
                <input onChange={(e) => { setTheme({ ...theme, todo: `bg-[${e.target.value}]` }); }}
                    className="border-2 border-slate-400 rounded-md" type="color"
                />
            </div>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите цвет "В процессе"</span>
                <input onChange={(e) => { setTheme({ ...theme, inprogress: `bg-[${e.target.value}]` }); }}
                    className="border-2 border-slate-400 rounded-md" type="color"
                />
            </div>
            <div className="flex items-center justify-center p-5 gap-5">
                <span className="text-slate-500 font-bold flex items-center">Выберите цвет "Сделано"</span>
                <input onChange={(e) => { setTheme({ ...theme, closed: `bg-[${e.target.value}]` }); }}
                    className="border-2 border-slate-400 rounded-md" type="color"
                />
            </div>
            <button className="bg-slate-500 text-white p-2 rounded-md font-bold" onClick={() => {
                localStorage.setItem(`themBase`, JSON.stringify([...JSON.parse(localStorage.getItem("themBase")), theme]))
            }}>
                Добавить тему
            </button>
        </div>
    )
}

export default ThemeChanger;