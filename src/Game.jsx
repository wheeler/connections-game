import { useState } from "react";
import Board from "./Board.jsx";

// GameData
// Groups: description, words
const fakeGameData = {
  groups: [
    {
      description: "one type words",
      words: ["oneaye", "onebee", "onesea", "onedee"],
    },
    {
      description: "two type words",
      words: ["twoaye", "twobee", "twosea", "twodee"],
    },
    {
      description: "three type words",
      words: ["threeaye", "threebee", "threesea", "threedee"],
    },
    {
      description: "four type words",
      words: ["fouraye", "fourbee", "foursea", "fourdee"],
    },
  ],
};

const fakeWords = [
  "Taco",
  "Shoe",
  "Ball",
  "Door",
  "Atom",
  "Tiny",
  "Burrito",
  "Turtle",
  "Canada",
  "Donut",
  "Popcorn",
  "Cookie",
  "Knife",
  "Spoon",
  "Bed",
  "Lamp",
];

// const initialState = Array(fakeWords.length).fill(false);
const initialSelected = Array(16).fill(false);
const Game = () => {
  const [selected, setSelected] = useState(initialSelected);
  const [correctGroups, setCorrectGroups] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [mistakesLeft, setMistakesLeft] = useState(4);

  if (mistakesLeft === -1) return <>you lose</>;

  let selectedCount = 0;
  selected.forEach((v) => {
    if (v) selectedCount++;
  });

  // let mistakeDots = [];
  // for (let i = 0; i < mistakesLeft; i += 1) mistakeDots += <>&#9679;</>;

  return (
    <>
      <div className={"card"}>Create four groups of four</div>
      <div>
        <Board
          words={fakeWords}
          selected={selected}
          setSelected={setSelected}
        />

        <div className={"card"}>
          mistakes remaining:{" "}
          {Array(mistakesLeft)
            .fill(null)
            .map((v, i) => (
              <span key={"dot" + i}>&#9679; </span>
            ))}
        </div>
        <div>
          <button onClick={() => alert("shuffle not implemented yet")}>
            Shuffle
          </button>{" "}
          <button
            disabled={selectedCount === 0}
            onClick={() => setSelected(initialSelected)}
          >
            Deselect All
          </button>{" "}
          <button
            disabled={selectedCount < 4}
            onClick={() => {
              console.log("selected", selected);
              setMistakesLeft((n) => n - 1);
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
};

export default Game;
