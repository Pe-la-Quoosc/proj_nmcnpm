import { useDispatch } from "react-redux";
import { deleteItem, updateQuantity } from "../../actions/cart";
import { useRef } from "react";
import { saveCartToDatabase } from "../../services/cartService";
import "./Carts.scss";

function CartItem(props) {
  const { item } = props;
  const dispatch = useDispatch();
  const inputRef = useRef();
  const price = (
    (item.info.price * (100 - item.info.discountPercentage)) / 100
  ).toFixed(0);

  const syncCartWithBackend = async () => {
    try {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      await saveCartToDatabase(cart); // Đồng bộ giỏ hàng với backend
    } catch (error) {
      console.error("Failed to sync cart with backend:", error.message);
    }
  };

  const handleUp = async () => {
    dispatch(updateQuantity(item.id, 1)); // Cập nhật Redux
    inputRef.current.value = parseInt(inputRef.current.value) + 1;
    await syncCartWithBackend(); // Đồng bộ với backend
  };

  const handleDown = async () => {
    if (item.quantity > 1) {
      dispatch(updateQuantity(item.id, -1)); // Cập nhật Redux
      inputRef.current.value = parseInt(inputRef.current.value) - 1;
      await syncCartWithBackend(); // Đồng bộ với backend
    }
  };

  const handleDelete = async () => {
    dispatch(deleteItem(item.id)); // Xóa khỏi Redux
    await syncCartWithBackend(); // Đồng bộ với backend
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
            readOnly
          />
          <button onClick={handleUp}>+</button>
        </div>
        <div className="cart__total">{price * item.quantity}</div>
        <div className="cart__remove">
          <button onClick={handleDelete}>Xóa</button>
        </div>
      </div>
    </>
  );
}

export default CartItem;