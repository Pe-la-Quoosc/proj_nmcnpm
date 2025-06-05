import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart";
import { useRef } from "react";
import { addToCartDataBase } from "../../services/cartService";
import { getCookie } from "../../helpers/cookie";
import "./Carts.scss";
function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const price = (
    (item.info.price * (100 - item.info.discountPercentage)) /
    100
  ).toFixed(0);
  const handleUp = async () => {
    dispatch(updateQuantity(item.id));
    inputRef.current.value = parseInt(inputRef.current.value) + 1;
    const userId = getCookie("id");
    await addToCartDataBase(parseInt(userId), item.info, "add");
  };
  const handleDown = async () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, -1));
      inputRef.current.value = parseInt(inputRef.current.value) - 1;
      const userId = getCookie("id");
      await addToCartDataBase(parseInt(userId), item.info, "decrease");
    }
  };
  const handleDelete = async () => {
    dispatch(deleteItem(item.id));
    const userId = getCookie("id");
    await addToCartDataBase(parseInt(userId), item.info, "remove");
  };


  return (
    <>
      <div className="cart__item" key={item.id}>
        <img src={item.info.thumbnail} alt={item.info.title} />

        <div className="cart__title">{item.info.title}</div>

        <div className="cart__price">
          <div className="cart__price--old">{price}</div>
          <div className="cart__price--new">{price}</div>
        </div>
        <div className="cart__quantity">
          <button onClick={handleDown} disabled={item.quantity <= 1}>
            -
          </button>
          <input
            ref={inputRef}
            min={1}
            value={item.quantity}
            onChange={handleChangeTotal}
          />
          <button onClick={handleUp}>+</button>
        </div>
        <div className="cart__total">{price * item.quantity}</div>
        <div className="cart__remove">
          <button onClick={handleDelete}>Xoa</button>
        </div>
      </div>
    </>
  );
}
export default CartItem;
