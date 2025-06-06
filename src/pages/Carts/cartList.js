import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";
import { getCart } from "../../services/cartService";
import { setCart } from "../../actions/cart"; // Action để lưu giỏ hàng vào Redux

function CartList() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const cartData = await getCart (); // Lấy giỏ hàng từ backend
        dispatch(setCart(cartData.product)); // Lưu giỏ hàng vào Redux
      } catch (error) {
        console.error("Failed to fetch cart:", error.message);
      }
    };

    fetchCart();
  }, [dispatch]);

  return (
    <div>
      <div className="cart">
        {cart.map((item) => (
          <CartItem item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default CartList;