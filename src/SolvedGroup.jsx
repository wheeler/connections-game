import classNames from "classnames";
import "./SolvedGroup.scss";
const SolvedGroup = ({ solvedGroup }) => (
  <div className={"solved-group"}>
    <div>{solvedGroup.description}</div>
    <div>{solvedGroup.words.join(", ")}</div>
  </div>
);

export default SolvedGroup;
