"use client";

import Image from "next/image";
import {Header} from "./components/header"
import {Footer} from "./components/footer"
import {Grid} from "./components/grid"



export default function Home() {
  const HandleNewGame = () => {};

  return (
    <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header onClick ={HandleNewGame}/>
      <Grid/>
      <Footer/>
    </div>
  );
}
