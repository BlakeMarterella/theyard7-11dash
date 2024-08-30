
export default function Header() {
    return (
        // bg-[url("./assets/images/header-bg.png")]
        <header className='flex justify-center items-center space-x-5 p-10 text-2xl text-white bg-711-green'>
            <h1 className="font-bold animate-fade-up animate-ease-out animate-delay-100">
                    The Yard
            </h1>
            <img className="w-12 h-12 animate-fade-down animate-ease-out animate-delay-100" src={"assets/images/7-eleven-logo.png"} alt="7-Eleven Logo"/>
            <h1 className="font-bold animate-fade-up animate-ease-out animate-delay-100">
                Dash
            </h1>
        </header>
    );
}