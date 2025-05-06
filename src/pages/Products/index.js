import { useEffect, useState } from "react";
import { getProductList } from "../../services/productsService";
import "./Products.scss";
import ProductItem from "./ProductItem";
function Product() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getProductList();
      // console.log(res);
      setProducts(res);
    };
    fetchApi();
  }, []);
  console.log(products);
  return (
    <>
      <h2>Danh sach san pham</h2>
      <div className="product">
        {products.map((item) => (
          <ProductItem item={item} key={item.id} />
        ))}
      </div>
    </>
  );
}
export default Product;
