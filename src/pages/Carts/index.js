import { useDispatch, useSelector } from "react-redux";
import CartList from "./cartList";
import { deleteAll } from "../../actions/cart";

function Carts() {
  const cart = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => {
    const price =
      (item.info.price * (100 - item.info.discountPercentage)) / 100;
    return sum + price * item.quantity;
  }, 0);
  const handleDeleteAll = () => {
    dispatch(deleteAll());
  };

  return (
    <>
      <h2>Gio hang</h2>
      <button onClick={handleDeleteAll}>Xoa all</button>

      {cart.length > 0 ? (
        <>
          <CartList />
          <div className="`cart-list__total">
            Tong tien: <span>{total.toFixed(2)}</span>
          </div>
        </>
      ) : (
        <h3>Gio hang trong</h3>
      )}
    </>
  );
}
export default Carts;
