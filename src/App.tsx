import "./App.css";
import Game from "./Game.tsx";
import { gameData } from "./gameData.ts";

function App() {
  return (
    <>
      <h1>Connections Game</h1>
      <div>
        <Game gameData={gameData} />
      </div>
      <br />
      <br />
      <p className="foot-disclaimer">
        Original game here:{" "}
        <a href="https://www.nytimes.com/games/connections">
          NY Times Connections
        </a>
        .<br />
        made by <a href="https://github.com/wheeler">@wheeler</a> while very
        rusty.
        <br />
        Created as an exercise. I claim no ownership.
      </p>
    </>
  );
}

export default App;
