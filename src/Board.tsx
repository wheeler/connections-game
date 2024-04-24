import { useAutoAnimate } from "@formkit/auto-animate/react";

import "./Board.scss";
import Item from "./Item.tsx";
import SolvedGroup from "./SolvedGroup.tsx";
import type { WordGroup } from "./Game.tsx";

type BoardProps = {
  words: string[];
  selected: string[];
  toggleSelected: (value: string) => void;
  solvedGroupData: WordGroup[];
};

const Board = ({
  words,
  selected,
  solvedGroupData,
  toggleSelected,
}: BoardProps) => {
  const [parent] = useAutoAnimate({ duration: 400 });

  return (
    <div ref={parent} className={"board"}>
      {solvedGroupData.map((item) => (
        <SolvedGroup key={item.description} solvedGroup={item} />
      ))}
      {words.map((word) => (
        <Item
          key={word}
          itemOnClick={() => {
            toggleSelected(word);
          }}
          selected={selected.includes(word)}
        >
          {word}
        </Item>
      ))}
    </div>
  );
};

export default Board;
