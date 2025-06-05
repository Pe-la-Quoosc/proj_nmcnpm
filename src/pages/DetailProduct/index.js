import {
  Row,
  Col,
  Image,
  Space,
  Typography,
  Radio,
  Button,
  notification,
  Collapse,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, updateQuantity } from "../../actions/cart";
import { useEffect, useState } from "react";
import { getProductList } from "../../services/productsService";
import { useParams } from "react-router-dom";
import "./DetailProduct.scss";
import ProductItem from "../Products/ProductItem";
import { addToCartDataBase } from "../../services/cartService";
import { getCookie } from "../../helpers/cookie";

const { Title, Text } = Typography;
const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;
const items = [
  {
    key: "1",
    label: "Chi tiet 1",
    children: <p>{text}</p>,
  },
  {
    key: "2",
    label: "Chi tiet 2",
    children: <p>{text}</p>,
  },
  {
    key: "3",
    label: "Chi tiet 3",
    children: <p>{text}</p>,
  },
];
function DetailProduct() {
  const { id } = useParams();
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cartReducer);
  const handleAddToCart = async (product) => {
    if (cart.some((itemCart) => itemCart.id === product.id)) {
      dispatch(updateQuantity(product.id));
    } else {
      dispatch(addToCart(product.id, product));
    }
    notification.success({
      description: "Thêm thành công",
      className: "custom-notification__success",
      placement: "topRight",
      duration: 2,
    });
    const userId = getCookie("id");
    // console.log("userId", userId);
    await addToCartDataBase(parseInt(userId), product, "add");
    console.log(product);
  };
  useEffect(() => {
    const fetchApi = async () => {
      const res = await getProductList();
      const product = res.find((item) => item.id === id);
      // console.log(product);

      setProduct(product);
      const similarProducts = res.filter(
        (item) => item.category === product.category
      );
      setSimilarProduct(similarProducts);
    };
    fetchApi();
    // console.log(product);
  }, [id]);

  return (
    <>
      <div className="section1">
        <Row gutter={[60, 16]} className="detail-product">
          {/* Image Section */}
          <Col span={14} className="detail-product__img">
            <Row gutter={[3, 3]}>
              <Col span={4} className="thumbnail-gallery">
                <Space
                  direction="vertical"
                  size="middle"
                  className="thumbnail-images"
                >
                  {(product.subimg || []).map((img, index) => (
                    <Image
                      className="thumbnail-image"
                      key={index}
                      preview={false}
                      src={img}
                      onClick={() => setMainImgIndex(index)}
                    />
                  ))}
                </Space>
              </Col>
              <Col span={20} className="main-image-wrapper">
                <Image
                  className="main-image"
                  preview={false}
                  width="100%"
                  src={product.subimg?.[mainImgIndex] || product.thumbnail}
                />
              </Col>
            </Row>
          </Col>

          {/* Product Details Section */}
          <Col span={10} className="detail-product__info">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={3} className="product-title">
                  {" "}
                  {product.title}
                </Title>
              </Col>

              <Col span={24} className="product-price">
                <Text strong>{product.price}</Text>
              </Col>
              <Col span={24} className="color-label">
                {product.pro_attribute &&
                Object.keys(product.pro_attribute).length > 0
                  ? Object.entries(product.pro_attribute).map(
                      ([attrName, options]) => (
                        <div key={attrName} style={{ marginBottom: 12 }}>
                          <div className="tag">{attrName}:</div>
                          <Radio.Group className="attribute-selector">
                            <Space>
                              {options.map((option, idx) => (
                                <Radio.Button
                                  className="attribute-option"
                                  key={idx}
                                  value={option.value}
                                >
                                  {option.value}
                                </Radio.Button>
                              ))}
                            </Space>
                          </Radio.Group>
                        </div>
                      )
                    )
                  : null}
              </Col>
              <Col span={24}>
                {/* Add to Cart Button */}
                <Button
                  type="primary"
                  block
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(product)}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Col>
              <Col span={24}>
                <Space
                  className="additional-info"
                  style={{ marginTop: "16px" }}
                >
                  <Text className="info-text">100% Original Products</Text>
                </Space>
                <Text className="info-text" style={{ display: "block" }}>
                  Pay on delivery might be available
                </Text>
                <Text className="info-text" style={{ display: "block" }}>
                  Easy 14 days returns & exchanges
                </Text>
                <Text className="info-text" style={{ display: "block" }}>
                  Try & Buy might be available
                </Text>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <Collapse
        defaultActiveKey={["1"]}
        items={items}
        className="detail-product-3"
      />
      <div className="section3-title">Sản Phẩm Tương Tự</div>
      <Row gutter={[20, 20]} className="similar-products">
        {similarProduct.slice(0, 5).map((item) => (
          <Col span={4} key={item.id} className="product-item">
            <ProductItem item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
}
export default DetailProduct;
