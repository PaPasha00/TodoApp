const Header = ({ count }) => {
    return (
        <div className={`text-white bg-green-500 p-2 px-4 flex justify-between rounded-md w-full max-w-lg  font-medium`}>
            Мои мероприятия
            <div className="bg-white text-slate-500 rounded-[50%] w-[25px] h-[25px] flex justify-center">
                {count}
            </div>
        </div>
    )
}

export default Header;