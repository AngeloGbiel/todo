import { CSSreset } from "./components/CSSreset";
import HomePage from "./page";

export default function App(){
  return(
    <>
      <CSSreset/>
      <p className="title">Todo List</p>
      <HomePage/>
    </>
  )
}