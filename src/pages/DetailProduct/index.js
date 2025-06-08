import {
  Row,
  Col,
  Image,
  Space,
  Typography,
  Radio,
  Button,
  Collapse,
  Tag,
  Rate,
  notification,
} from "antd";
import { useEffect, useState } from "react";
import { getProductList } from "../../services/productsService";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./DetailProduct.scss";
import ProductItem from "../Products/ProductItem";
import ProductReviews from "./productReviews";
import { addToCart } from "../../services/cartService";
import { getCategoryAttributes } from "../../services/productsService";
import { addToCart as addToCartAction, updateCartItemQuantity } from "../../actions/cart";

const { Title, Text } = Typography;

function DetailProduct() {
  const dispatch=useDispatch();
  const { id } = useParams();
  const [mainImgIndex, setMainImgIndex] = useState(0);
  const [product, setProduct] = useState({});
  const [similarProduct, setSimilarProduct] = useState([]);
  const [images, setImages] = useState([]);
  const [attributes, setAttributes] = useState([]);
  const [selectedAttributes, setSelectedAttributes] = useState({});

  const handleAttributeChange = (attributeName, value) => {
    console.log("Value", value);
    setSelectedAttributes((prev) => ({
      ...prev,
      [attributeName]: value,
    }));
  };

  const handleAddToCart = async () => {
    try {
      const payload = {
        productId: product._id,
        quantity: 1,
        selectedAttributes,
      };
      const response = await addToCart(
        payload.productId,
        payload.quantity,
        payload.selectedAttributes
      ); 
      dispatch(addToCartAction(product, selectedAttributes, 1))
      notification.success({
        description: "Thêm sản phẩm vào giỏ hàng thành công!",
        className: "custom-notification__success",
        placement: "topRight",
        duration: 2,
      });
    } catch (error) { }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getProductList();
        const product = res.find((item) => item._id === id);
        setProduct(product);
        if (product.images && product.images.length > 0) {
          setImages(product.images);
        }
        const similarProducts = res.filter(
          (item) =>
            item.category?._id === product.category?._id && item._id !== id
        );
        setSimilarProduct(similarProducts.slice(0, 5));
      } catch (error) {}
    };
    fetchProduct();
  }, [id]);
  useEffect(() => {
    const fetchAttributes = async () => {
      if (product.category?._id) {
        try {
          const response = await getCategoryAttributes(product.category._id);
          setAttributes(response || []);
        } catch (error) {}
      }
    };
    fetchAttributes();
  }, [product.category]);
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
                  {images.map((img, index) => (
                    <Image
                      className="thumbnail-image"
                      key={index}
                      preview={false}
                      src={img}
                      onClick={() => setMainImgIndex(index)} // Đặt hình ảnh chính khi click
                    />
                  ))}
                </Space>
              </Col>
              <Col span={20} className="main-image-wrapper">
                <Image
                  className="main-image"
                  preview={false}
                  width="100%"
                  src={images[mainImgIndex] || images[0]} // Hiển thị hình ảnh chính
                />
              </Col>
            </Row>
          </Col>
          {/* Product Details Section */}
          <Col span={10} className="detail-product__info">
            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Title level={3} className="product-title">
                  {product.title}
                </Title>
              </Col>

              <div className="product-description">
                <Text>Đã bán: {product.sold}</Text>
                <Text strong style={{ fontSize: "16px", marginRight: "10px" }}>
                  Đánh giá:
                </Text>
                <Rate
                  allowHalf
                  disabled
                  value={parseFloat(product.totalrating)}
                />
                <Text style={{ marginLeft: "10px" }}>
                  {product.totalrating} / 5
                </Text>
              </div>

              <Col span={24} className="product-price">
                <Text strong style={{ color: "red", fontSize: "24px" }}>
                  {(
                    (product.price * (100 - product.discountPercentage)) /
                    100
                  ).toFixed(0)}{" "}
                  VND
                </Text>
                <br />
                <Text delete style={{ color: "gray", fontSize: "18px" }}>
                  {product.price} VND
                </Text>
                <br />
                <Tag color="red" style={{ fontSize: 14 }}>
                  Giảm: {product.discountPercentage}%
                </Tag>
              </Col>

              <Col span={24} className="product-attributes">
                {attributes.map((attribute, index) => (
                  <div key={index} className="attribute-group">
                    <Text strong style={{ fontSize: "16px" }}>
                      {attribute.name}:
                    </Text>
                    <Radio.Group
                      style={{ marginLeft: "10px" }}
                      onChange={(e) =>
                        handleAttributeChange(attribute.name, e.target.value)
                      }
                    >
                      {attribute.values.map((value, idx) => (
                        <Radio key={idx} value={value}>
                          {value}
                        </Radio>
                      ))}
                    </Radio.Group>
                  </div>
                ))}
              </Col>

              <Col span={24}>
                <Button
                  type="primary"
                  block
                  className="add-to-cart-btn"
                  onClick={handleAddToCart}
                >
                  Thêm vào giỏ hàng
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>

      <Collapse
        defaultActiveKey={["1"]}
        items={
          product.description?.map((desc, index) => ({
            key: `${index + 1}`,
            label: `Chi tiết ${index + 1}`,
            children: <p>{desc.content || desc}</p>,
          })) || []
        }
        className="detail-product-3"
      />

      <ProductReviews
        reviews={product.review || []}
        onSubmitReview={(newReview) => {
          const updatedReviews = [
            ...product.review,
            { ...newReview, createdAt: new Date().toISOString() },
          ];
          setProduct({ ...product, review: updatedReviews });
        }}
      />

      <div className="section3-title">Sản Phẩm Tương Tự</div>
      <Row gutter={[20, 20]} className="similar-products">
        {similarProduct.map((item) => (
          <Col span={4} key={item._id} className="product-item">
            <ProductItem item={item} />
          </Col>
        ))}
      </Row>
    </>
  );
}

export default DetailProduct;
