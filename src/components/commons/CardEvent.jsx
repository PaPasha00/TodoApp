const CardEvent = ({ themeTwo, event, handleRemove }) => {
    let changesDate = {
        'Mon': 'Понедельник',
        'Tue': 'Вторник',
        'Wed': 'Среда',
        'Thu': 'Четверг',
        'Fri': 'Пятница',
        'Sat': 'Суббота',
        'Sun': 'Воскресенье',
        'Dec': 'Декабря',
        'Jan': 'Января',
        'Feb': 'Февраля',
        'Mar': 'Марта',
        'Apr': 'Апреля',
        'May': 'Мая',
        'Jun': 'Июня',
        'Jul': 'Июля',
        'Aug': 'Августа',
        'Sep': 'Сентября',
        'Oct': 'Октября',
        'Nov': 'Ноября',
    }
    let normalizeDate = (date) => {
        let dateF = String(date).split('-');
        let year = dateF[0];
        let month = String(Number(dateF[1]) - 1);
        let day = dateF[2];
        let nD = new Date(year, month, day)
        let newDate = nD.toDateString().split(' ')
        return `${newDate[2]} ${changesDate[newDate[1]]}, ${changesDate[newDate[0]]}`
    }

    let timeEditor = (time = "00:00") => {
        return time.substring(0, time.length);
    }

    return (
        <div className={`relative w-full flex justify-between p-4 mt-3 shadow-md ${themeTwo ? 'text-black' : 'text-white bg-slate-900'} rounded-md`}>
            <span className="flex flex-col gap-1">
                <p>{event.name}</p>
                <span className="flex gap-3 text-slate-400 font-medium">
                    <p >{`${normalizeDate(event.date)}`}</p>
                    <p>{`${timeEditor(event.time)}`}</p>
                    <p>{`${String(event.date).split('-')[0]}`}</p>
                </span>

            </span>

            <button className="" onClick={() => handleRemove(event.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </button>
        </div>
    );
}

export default CardEvent;