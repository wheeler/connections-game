import "./App.css";
import Game from "./Game.tsx";

function App() {
  return (
    <>
      <h1>Connections Dub</h1>
      <div>
        <Game />
      </div>
      <p className="foot-disclaimer">written by mark while very rusty</p>
    </>
  );
}

export default App;
