import { useState } from "react";
import Board from "./Board.tsx";
import shuffle from "lodash.shuffle";
import type { GameData } from "./gameData.ts";

export type WordGroup = {
  description: string;
  className?: string;
  words: string[];
};

const Game = ({ gameData }: { gameData: GameData }) => {
  const [remainingWords, setRemainingWords] = useState(gameData.words);
  const shuffleWords = () => {
    setRemainingWords(shuffle(remainingWords));
  };

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
              <button onClick={shuffleWords}>Shuffle</button>{" "}
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
                  // do the selected words match a word group?
                  // todo: minor improvement ~ skip already correct groups
                  const matchedGroup = gameData.groups.find(({ words }) =>
                    words.every((word) => selected.includes(word)),
                  );
                  if (matchedGroup) {
                    setSelected([]);
                    setSolvedGroups([
                      ...solvedGroups,
                      matchedGroup.description,
                    ]);

                    // Re-order the remaining words on the top row into the spots made vacant by the selected words.
                    //   This results in a slick-minimal animation of only the top words moving down.
                    // First get the remaining top row words
                    const topRowWords = remainingWords
                      .slice(0, 4)
                      .filter((word) => !matchedGroup.words.includes(word));
                    // Now take the bottom words and use map to...
                    const bottomWords = remainingWords.slice(4).map((word) => {
                      // Replace words that are being removed with top row words
                      if (matchedGroup.words.includes(word)) {
                        return topRowWords.shift()!;
                      } else return word; // do nothing to other words
                    });

                    setRemainingWords(bottomWords);
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
