import { Button, notification } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
import { NavLink } from "react-router-dom";
// import { getCookie } from "../../helpers/cookie";
function ProductItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const cart = useSelector((state) => state.cartReducer);
  return (
    <>
      <div className="product" key={item._id}>
        <NavLink to={item._id ? `/products/${item._id}` : "#"}>
          <img
            className="product__image"
            src={item.images[0]}
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
      </div>
    </>
  );
}
export default ProductItem;
