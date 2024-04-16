import "./Board.scss";
import Item from "./Item.jsx";
import SolvedGroup from "./SolvedGroup.jsx";

// eslint-disable-next-line react/prop-types
const Board = ({ words, selected, solvedGroupData, toggleSelected }) => {
  return (
    <div className={"board"}>
      {solvedGroupData.map((item, index) => (
        <SolvedGroup key={index} solvedGroup={item} />
      ))}
      {words.map((data, index) => (
        <Item
          key={index}
          itemOnClick={() => {
            toggleSelected(data);
          }}
          selected={selected.includes(data)}
        >
          {data}
        </Item>
      ))}
    </div>
  );
};

export default Board;
