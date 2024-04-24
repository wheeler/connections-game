import "./App.css";
import Game from "./Game.tsx";
import { gameData } from "./gameData.ts";

function App() {
  return (
    <>
      <h1>Connections Dub</h1>
      <div>
        <Game gameData={gameData} />
      </div>
      <p className="foot-disclaimer">written by mark while very rusty</p>
    </>
  );
}

export default App;
