import classNames from "classnames";
import "./Item.scss";
const Item = ({ children, selected, itemOnClick }) => (
  <div className={classNames("item", { selected })}>
    <button onClick={itemOnClick}>{children}</button>
  </div>
);

export default Item;
