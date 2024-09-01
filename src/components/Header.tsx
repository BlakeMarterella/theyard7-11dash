interface HeaderProps {
    text?: string;
}

export default function Header(props: HeaderProps) {
    const a = props.text;
    console.log(a);

    const renderHeaderContent = () => {
        if (props.text) {
            return (
                <div className='flex justify-center items-center space-x-5 p-10 pb-15 mb-10 text-3xl sm:text-xl md:text-2xl text-white'>
                    <h1 className="font-bold animate-fade-up animate-ease-out animate-delay-100">
                        {props.text}
                    </h1>
                </div>    
            );
        }   
        else {
            return (
                <div className='flex justify-center items-center space-x-5 p-10 pb-15 mb-10 text-3xl sm:text-xl md:text-2xl text-white'>
                    <h1 className="font-bold animate-fade-up animate-ease-out animate-delay-100">
                        The Yard
                    </h1>
                    <img className="w-12 h-12 animate-fade-down animate-ease-out animate-delay-100" src={"assets/images/7-eleven-logo.png"} alt="7-Eleven Logo"/>
                    <h1 className="font-bold animate-fade-up animate-ease-out animate-delay-100">
                        Dash
                    </h1>
                </div>
            );
        }
    }


    return (
        <header className="bg-711-green h-40">
            {renderHeaderContent()}
        </header>
    );
}