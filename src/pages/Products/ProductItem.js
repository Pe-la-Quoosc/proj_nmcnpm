import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
function ProductItem(props) {
  const { item } = props;
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cartReducer);

  const handleAddToCart = () => {
    if (cart.some(itemCart => itemCart.id === item.id)) {
      dispatch(updateQuantity(item.id));
    } else {
      dispatch(addToCart(item.id, item));
    }
  };

  return (
    <>
      <div className="product__item" key={item.id}>
        <img
          className="product__image"
          src={item.thumbnail}
          alt="anh san pham"
        />
        <h3 className="product__title">{item.name}</h3>
        <p className="product__price--new">
          {((item.price * (100 - item.discountPercentage)) / 100).toFixed(0)}
        </p>
        <p className="product__price--old">{item.price}</p>
        <p className="product__percent">{item.discountPercentage}</p>
        <Button onClick={handleAddToCart} type="primary">
          Primary Button
        </Button>
      </div>
    </>
  );
}
export default ProductItem;
