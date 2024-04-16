import "./Board.scss";
import Item from "./Item.jsx";
import SolvedGroup from "./SolvedGroup.jsx";

// boardData: {
//   solvedGroups: [],
//   words: [],
//   selectWord: fn()
// }

// eslint-disable-next-line react/prop-types
const Board = ({ words, selected, setSelected }) => {
  return (
    <div className={"board"}>
      <SolvedGroup solvedGroup={{ description: "hi", words: ["a", "b"] }} />
      {selected.map((data, index) => (
        <Item
          itemOnClick={() => {
            let selectedCount = 0;
            selected.forEach((v) => {
              if (v) selectedCount++;
            });
            if (selected[index] === false && selectedCount >= 4) return; // max 4 selected at a time

            const newState = [...selected];
            newState[index] = !newState[index];
            setSelected(newState);
          }}
          selected={selected[index]}
          key={index}
        >
          {words[index]}
        </Item>
      ))}
    </div>
  );
};

export default Board;
