import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart";
import { useRef } from "react";
function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const handleUp = () => {
    dispatch(updateQuantity(item.id));
    inputRef.current.value = parseInt(inputRef.current.value) + 1;
  };
  const handleDown = () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, -1));
      inputRef.current.value = parseInt(inputRef.current.value) - 1;
    }
  };
    const handleDelete = () => {
        dispatch(deleteItem(item.id));
    }

  return (
    <>
      <div className="cart__item" key={item.id}>
        <div className="cart__item--img">
          <img src={item.info.thumbnail} alt={item.info.title} />
        </div>
        <div className="cart__content">
          <h3>{item.info.title}</h3>
          <div className="cart__price--new">
            {(
              (item.info.price * (100 - item.info.discountPercentage)) /
              100
            ).toFixed(0)}
          </div>
          <div className="cart__price--old">{item.info.price}</div>
          <div className="cart__quantity">
            <button onClick={handleDown}>-</button>
            <input ref={inputRef} defaultValue={item.quantity} />
            <button onClick={handleUp}>+</button>
          </div>
          <div className="cart__remove">
            <button onClick={handleDelete}>Xoa</button>
          </div>
        </div>
      </div>
    </>
  );
}
export default CartItem;
