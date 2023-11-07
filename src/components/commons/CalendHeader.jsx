const Header = ({ count, date }) => {
    return (
        <div className={`text-white bg-green-500 mb-2 p-2 px-4 flex justify-between rounded-md w-full max-w-lg  font-medium`}>
            {date}
            <div className="bg-white text-slate-500 rounded-[50%] w-[25px] h-[25px] flex justify-center">
                {count}
            </div>
        </div>
    )
}

export default Header;