"use client";

import Image from "next/image";
import {Header} from "./components/header"
import {Footer} from "./components/footer"
import {Grid} from "./components/grid"
import {generatePuzzle} from "./sudoku_generator"
import {useState, useEffect} from "react"



export default function Home() {
  const [puzzle, setPuzzle] = useState<string[][]>([]);
  useEffect(() => {
    setPuzzle(generatePuzzle());
    }, []);
  const clues = puzzle.map(row => row.map(cell => cell !== ""));

  const handleNewGame = () => {
    setPuzzle(generatePuzzle());
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header onClick={handleNewGame}/>
      <Grid puzzle={puzzle} setPuzzle={setPuzzle} clues={clues}/>
      <Footer/>
    </div>
  );
}
