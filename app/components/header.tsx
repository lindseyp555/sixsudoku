type HeaderProps = {
    onClick: () => void
}

export const Header = (props: HeaderProps) => {
   return (
    <header>
        <h1>6x6 Sodoku</h1>
        <h2 onClick={props.onClick}>
            New Game
        </h2>
    </header>
    )
}