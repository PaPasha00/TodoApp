import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import CardEvent from "./commons/CardEvent";
import Header from "./commons/CalendHeader";
import { Link } from "react-router-dom";
import LinkButton from "./commons/LinkButton";

const Calendar = () => {
    const [themeTwo, setTheme] = useState(JSON.parse(localStorage.getItem('theme')))
    useEffect(() => {
    }, [])

    const [events, setEvents] = useState([]);

    const [event, setEvent] = useState({
        id: "",
        name: "",
        date: "",
        time: "",
        status: 'calend'
    });
    useEffect(() => {
        if (JSON.parse(localStorage.getItem("calendy")) !== null) {
            setEvents(JSON.parse(localStorage.getItem("calendy")))
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();

        if (event.name.length < 3)
            return toast.error('В мероприятии должно быть не менее трёх символов')

        if (event.date.length < 10)
            return toast.error('Введите дату')

        if (event.name.length > 100)
            return toast.error('В мероприятии должно быть не более 100 символов')

        setEvents((prev) => {
            const list = [...prev, event];
            list.sort(function (a, b) {
                return new Date(a.date) - new Date(b.date);
            });

            localStorage.setItem("calendy", JSON.stringify(list))

            return list
        });

        toast.success('Мероприятие создано')

        setEvent({
            id: "",
            name: "",
            date: "",
            status: 'calend'
        })
    };

    const handleRemove = (id) => {
        const cList = events.filter(t => t.id !== id)
        cList.sort(function (a, b) {
            return new Date(a.date) - new Date(b.date);
        });
        localStorage.setItem("calendy", JSON.stringify(cList))
        setEvents(cList)
        toast("Мероприятие удалено", { icon: "👎😢" })
    }

    return (
        <>
            <Toaster />
            <section className={`w-full ${themeTwo ? 'bg-slate-100' : 'bg-slate-900'} flex px-3 md:pl-10 gap-3 md:gap-10 pt-[50px] min-h-screen flex-col items-center`}>
                <LinkButton text='К делам' path='/' />
                <form onSubmit={handleSubmit} className="flex gap-1 flex-col mt-2">

                    <span className="w-full flex justify-center gap-1">
                    <input type="text"
                        className={`border-2 border-slate-500  rounded-md ${themeTwo ? 'bg-slate-100 text-black' : 'bg-slate-600 text-slate-100'} p-1 pl-3`}
                        value={event.name}
                        onChange={(e) => setEvent({ ...event, id: uuidv4(), name: e.target.value })}
                    />
                    <button className={`p-2 rounded-md ${themeTwo ? 'bg-slate-500 text-white' : 'bg-slate-600 text-slate-100'} text-white font-bold hover:bg-slate-400 duration-300`}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </button>
                    </span>
                    
                    
                    <span className="w-full flex justify-center gap-3">
                        <input type="date"
                            value={event.date}
                            onChange={(e) => setEvent({ ...event, id: uuidv4(), date: e.target.value })}
                            className={`border-2 border-slate-500  rounded-md ${themeTwo ? 'bg-slate-100 text-black' : 'bg-slate-600 text-slate-100'} p-1 pl-3`}
                        />
                        <input type="time"
                            value={event.time}
                            onChange={(e) => setEvent({ ...event, id: uuidv4(), time: e.target.value })}
                            className={`border-2 border-slate-500  rounded-md ${themeTwo ? 'bg-slate-100 text-black' : 'bg-slate-600 text-slate-100'} p-1 pl-3`}
                        />
                        
                    </span>

                </form>

                <div className={`max-w-lg w-full flex flex-col gap-0 p-2 rounded-md ${themeTwo ? "bg-slate-50" : "bg-slate-800"}`}>
                    <Header count={events.length} />
                    {
                        events.map((e, index) => (
                            <CardEvent key={index} themeTwo={themeTwo} event={e} handleRemove={handleRemove} />
                        ))
                    }
                </div>
            </section>
        </>
    );
}

export default Calendar;