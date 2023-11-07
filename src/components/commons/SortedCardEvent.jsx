const SortedCardEvent = ({themeTwo, handleRemove, time, name, id}) => {
    return (
        <div className={`shadow-md flex mt-2 p-2 py-4 ${themeTwo ? 'text-black' : 'text-white bg-slate-900'} justify-between rounded-md`}>
            <span className="flex items-center">
                <span className={`flex gap-3 ${themeTwo ? 'text-slate-800' : 'text-white bg-slate-900'} font-semibold`}>
                    {name}
                </span>
            </span>
            <span className="flex items-center">
                <span className="flex text-slate-400 ml-2 font-medium">{time}</span>
                <button className="pl-3" onClick={() => handleRemove(id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </button>
            </span>
        </div>
    );
}

export default SortedCardEvent;