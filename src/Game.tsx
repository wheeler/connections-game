import { useState } from "react";
import Board from "./Board.tsx";

export type WordGroup = {
  description: string;
  className?: string;
  words: string[];
};

type GameData = {
  words: string[];
  groups: WordGroup[];
};

const gameData: GameData = {
  words: [
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
  ],
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

const Game = () => {
  // used to prevent double submission
  const [submitLocked, setSubmitLocked] = useState(false);

  // represents which words the player has selected to guess
  const [selected, setSelected] = useState<string[]>([]); // none selected
  const toggleSelected = (value: string) => {
    if (selected.includes(value)) {
      // remove if already selected
      setSelected(selected.filter((v) => v !== value));
      setSubmitLocked(false);
    } else {
      // add if not selected unless already full
      if (selected.length === 4) return;
      setSelected([...selected, value]);
      setSubmitLocked(false);
    }
  };

  // contains which groups the player has guessed correctly
  const [solvedGroups, setSolvedGroups] = useState<string[]>([]); // none solved
  const solvedGroupData = gameData.groups.filter(({ description }) =>
    solvedGroups.includes(description),
  );

  // all the words contained in the solved groups
  let solvedWords: string[] = [];
  solvedGroupData.forEach(({ words }) => {
    solvedWords = solvedWords.concat(words);
  });
  // all the words not contained in solved groups
  const remainingWords = gameData.words.filter(
    (word) => !solvedWords.includes(word),
  );

  // how many tries the user still has to guess
  const [mistakesLeft, setMistakesLeft] = useState(4);
  if (mistakesLeft === 0) return <>you lose</>;

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
                .map((_v, i) => (
                  <span key={"dot" + i}>&#9679; </span>
                ))}
            </div>
            <div>
              <button onClick={() => alert("shuffle not implemented yet")}>
                Shuffle
              </button>{" "}
              <button
                disabled={selected.length === 0}
                onClick={() => {
                  setSelected([]);
                  setSubmitLocked(false);
                }}
              >
                Deselect All
              </button>{" "}
              <button
                disabled={submitLocked || selected.length < 4}
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
                    setSubmitLocked(true);
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
