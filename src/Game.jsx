import { useState } from "react";
import Board from "./Board.jsx";

// GameData
// Groups: description, words
const gameData = {
  groups: [
    {
      description: "Foods",
      className: "easy",
      words: ["Taco", "Donut", "Popcorn", "Burrito"],
    },
    {
      description: "Utensils",
      className: "medium",
      words: ["Fork", "Spoon", "Chopsticks", "Fingers"],
    },
    {
      description: "Things found in a bedroom",
      className: "hard",
      words: ["Pillow", "Pyjama", "Bed", "Lamp"],
    },
    {
      description: "Ones that don't fit the rest",
      className: "tricky",
      words: ["Shoe", "Ball", "Door", "Canada"],
    },
  ],
};

const initialWords = [
  "Taco",
  "Shoe",
  "Ball",
  "Door",
  "Fingers",
  "Pillow",
  "Burrito",
  "Pyjama",
  "Chopsticks",
  "Donut",
  "Popcorn",
  "Canada",
  "Fork",
  "Spoon",
  "Bed",
  "Lamp",
];

const Game = () => {
  const [selected, setSelected] = useState([]); // none selected
  const toggleSelected = (value) => {
    if (selected.includes(value)) {
      // remove if already selected
      setSelected(selected.filter((v) => v !== value));
    } else {
      // add if not selected unless already full
      if (selected.length === 4) return;
      setSelected([...selected, value]);
    }
  };

  const [solvedGroups, setSolvedGroups] = useState([]); // none solved
  const solvedGroupData = gameData.groups.filter(({ description }) =>
    solvedGroups.includes(description),
  );

  let solvedWords = [];
  solvedGroupData.forEach(({ words }) => {
    solvedWords = solvedWords.concat(words);
  });
  const remainingWords = initialWords.filter(
    (word) => !solvedWords.includes(word),
  );

  const [mistakesLeft, setMistakesLeft] = useState(4);
  if (mistakesLeft === -1) return <>you lose</>;

  return (
    <>
      {solvedGroups.length < 4 && (
        <div className={"card"}>Create four groups of four</div>
      )}
      <div>
        <Board
          words={remainingWords}
          selected={selected}
          solvedGroupData={solvedGroupData}
          toggleSelected={toggleSelected}
        />

        {solvedGroups.length < 4 ? (
          <>
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
                disabled={selected.length === 0}
                onClick={() => setSelected([])}
              >
                Deselect All
              </button>{" "}
              <button
                disabled={selected.length < 4}
                onClick={() => {
                  const matchedGroup = gameData.groups.find(({ words }) =>
                    words.every((word) => selected.includes(word)),
                  );
                  if (matchedGroup) {
                    setSelected([]);
                    setSolvedGroups([
                      ...solvedGroups,
                      matchedGroup.description,
                    ]);
                  } else {
                    setMistakesLeft((n) => n - 1);
                  }
                }}
              >
                Submit
              </button>
            </div>
          </>
        ) : (
          <>
            <br />
            <br />
            Congratulations, you win.
            <br />
            <br />
          </>
        )}
      </div>
    </>
  );
};

export default Game;
