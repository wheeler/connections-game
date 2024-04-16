import classNames from "classnames";
import "./SolvedGroup.scss";

// eslint-disable-next-line react/prop-types
const SolvedGroup = ({ solvedGroup }) => (
  <div className={classNames("solved-group", solvedGroup.className)}>
    <div className={"title"}>{solvedGroup.description}</div>
    <div>{solvedGroup.words.join(", ")}</div>
  </div>
);

export default SolvedGroup;
