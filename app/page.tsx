"use client";

import Image from "next/image";
import {Header} from "./components/header"
import {Footer} from "./components/footer"
import {Grid} from "./components/grid"
import {generatePuzzle} from "./sudoku_generator"
import {useState, useEffect} from "react"



export default function Home() {
  const [puzzle, setPuzzle] = useState<string[][]>([]);
  const [clues, setClues] = useState<boolean[][]>([]);
  const [solution, setSolution] = useState<number[][]>([]);

  useEffect(() => {
    handleNewGame();
    }, []);

  const handleNewGame = () => {
    const { puzzle: newPuzzle, solution: newSolution } = generatePuzzle() as {puzzle: string[][]; solution: number[][]};
    setPuzzle(newPuzzle);
    setSolution(newSolution);
    setClues(newPuzzle.map(row => row.map(cell => cell !== "")));
  };

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header onClick={handleNewGame}/>
      <Grid puzzle={puzzle} setPuzzle={setPuzzle} clues={clues} solution={solution}/>
      <Footer/>
    </div>
  );
}
