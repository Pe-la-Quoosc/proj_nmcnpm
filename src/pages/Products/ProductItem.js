import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
import { NavLink } from "react-router-dom";
import { addToCartDataBase } from "../../services/cartService";
import { getCookie } from "../../helpers/cookie";
function ProductItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer);

  const handleAddToCart = async () => {
    if (cart.some((itemCart) => itemCart.id === item.id)) {
      dispatch(updateQuantity(item.id));
    } else {
      dispatch(addToCart(item.id, item));
    }
    notification.success({
      description: "Thêm thành công",
      className: "custom-notification__success",
      placement: "topRight",
      duration: 2,
    });
    const userId = getCookie("id");
    await addToCartDataBase(userId, item, "add");
  };

  return (
    <>
      <div className="product" key={item.id}>
        <NavLink to={`/products/${item.id}`}>
          <img
            className="product__image"
            src={item.thumbnail}
            alt="anh san pham"
          />
          <div className="product__title"> {item.title}</div>
          <h3 className="product__title">{item.name}</h3>
          <p className="product__price--new">
            Giá:{" "}
            {((item.price * (100 - item.discountPercentage)) / 100).toFixed(0)}
          </p>
          <p className="product__price--old">{item.price}</p>
          <p className="product__percent">{item.discountPercentage}</p>
         </NavLink>
        <Button className="button" onClick={handleAddToCart} type="primary">
          Thêm
        </Button>
      </div>
    </>
  );
}
export default ProductItem;
