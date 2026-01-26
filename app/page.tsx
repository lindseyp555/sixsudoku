import Image from "next/image";
import {Header} from "./components/header"
import {Footer} from "./components/footer"


export default function Home() {
  const HandleNewGame = () => {};

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <Header onClick ={HandleNewGame}/>
      <Footer/>
    </div>
  );
}
