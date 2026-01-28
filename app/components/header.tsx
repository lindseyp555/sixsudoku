type HeaderProps = {
    onClick: () => void
}

export const Header = (props: HeaderProps) => {
   return (
    <div className="flex flex-row p-10">
        <h1 className="pr-30 text-4xl">
            6x6 Sudoku
        </h1>
        <h2 className="text-2xl"
            onClick={props.onClick}>
            New Game
        </h2>
    </div>
    )
}