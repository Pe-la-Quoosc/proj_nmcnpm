import { Carousel, Button, Col, Row } from "antd";
import "../../styles/Home.scss";
import { NavLink } from "react-router-dom";
import React from "react";
import tpbs_img from "../../assets/images/Australia's Leading Online Bodybuilding Supplements Store.jpg";
import dc_img from "../../assets/images/Premium Photo _ Flat lay arrangement with sports items and airpods.jpg";
import qa_img from "../../assets/images/tải xuống.jpg";
import subimg from "../../assets/images/Dumbbell An Old Gym Setting With Dumbbells Backgrounds _ JPG Free Download - Pikbest.jpg";
import home_img from "../../assets/images/home-img.png";
import bung from "../../assets/images/bung.png";
import chan from "../../assets/images/chan.png";
import tay from "../../assets/images/tay.png";
import vai from "../../assets/images/vai.png";
import lung from "../../assets/images/lung.png";

const section4Images = [
  { src: bung, alt: "bung", title: "Bung" },
  { src: chan, alt: "chan", title: "Bung" },
  { src: tay, alt: "tay", title: "Bung" },
  { src: vai, alt: "vai", title: "Bung" },
  { src: lung, alt: "lung", title: "Bung" },
  { src: lung, alt: "nguc", title: "Bung" },
];
const carouselItems = [
  { src: tpbs_img, alt: "Suplements", title: "Thuc pham bo sung" },
  { src: dc_img, alt: "Equipment", title: "Dung cu tap luyen" },
  { src: qa_img, alt: "Clothing", title: "Quan ao" },
];
const blogPosts = [
  {
    id: 1,
    image: qa_img,
    title: "Kỹ thuật tập luyện đúng cách",
    description:
      "Hướng dẫn chi tiết các động tác cơ bản đến nâng cao để tránh chấn thương và đạt hiệu quả tối đa.",
  },
  {
    id: 2,
    image: qa_img,
    title: "Dinh dưỡng thể hình",
    description:
      "Chế độ ăn khoa học cho từng mục tiêu: tăng cơ, giảm mỡ hay duy trì thể lực.",
  },
  {
    id: 3,
    image: qa_img,
    title: "Lịch tập cá nhân hóa",
    description:
      "Thiết kế lịch tập phù hợp với thể trạng và mục tiêu cá nhân của bạn.",
  },
];
function Home() {
  return (
    <>
      <div className="home-page">
        {/* Section1 */}
        <section className="home-section">
          <img className="home-bg" src={subimg} alt="background" />
          <div className="home-section__content">
            <Row gutter={[30, 30]} align={"middle"}>
              <Col xs={24} md={12} className="home-content">
                <h1 className="home-title">Nội dung chính</h1>
                <p className="home-description">
                  Chào mừng bạn đến với trang web của chúng tôi! Tại đây, bạn sẽ
                  tìm thấy những thông tin hữu ích và các sản phẩm chất lượng
                  nhất. Hãy khám phá ngay!
                </p>
                <Button className="cta-button" type="primary" size="large">
                  <NavLink to="/login">Kham Pha Ngay</NavLink>
                </Button>
              </Col>
              <Col xs={24} md={12} className="home-image">
                <img src={home_img} alt="Fitness motivation" loading="lazy" />
              </Col>
            </Row>
          </div>
        </section>
        {/* Product section */}
        <section className="products-section">
          <div className="container">
            <h2 className="section-title">San pham & dich vu</h2>
            <Row gutter={[30, 30]}>
              <Col xs={24} lg={6} className="products-intro">
                <h3 className="section-subtitle">Giai phap toan dien</h3>
                <p className="products-section__description">
                  Chúng tôi cung cấp mọi thứ bạn cần cho quá trình tập luyện từ
                  thiết bị chất lượng cao, thực phẩm bổ sung đạt chuẩn đến trang
                  phục thể thao chuyên nghiệp.
                </p>
              </Col>
              <Col xs={24} lg={18}>
                <Carousel
                  arrows
                  infinite={true}
                  autoplay={{ dotDuration: true }}
                  autoplaySpeed={3000}
                  className="product-carousel"
                >
                  {carouselItems.map((item, index) => (
                    <div key={index} className="carousel-item">
                      <img src={item.src} alt={item.alt} loading="lazy" />
                      <div className="carousel-caption">{item.title}</div>
                    </div>
                  ))}
                </Carousel>
              </Col>
            </Row>
          </div>
        </section>
        {/* Blog Section */}
        <section className="blog-section">
          <div className="container">
            <h2 className="section-title">Kien thuc the hinh</h2>
            <div class="section-divider"></div>
            <Row className="blog-posts" wrap={false}>
              {blogPosts.map((item, _) => (
                <Col key={item.id} xs={24} md={8} className="blog-card">
                  <img
                    src={item.image}
                    alt={`Blog pasr ${item.id}`}
                    loading="lazy"
                  />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </Col>
              ))}
            </Row>
          </div>
        </section>
        {/* Excercises Section */}
        <section className="excercise-section">
          <div className="container">
              <div className="section-title"> Bài tập theo nhóm cơ </div>
              <div className="section-divider"></div>
              <div className="section-description">
                Hệ thống bài tập được phân loại theo từng nhóm cơ giúp bạn dễ
                dàng lựa chọn và tập trung phát triển các vùng cơ thể mong muốn.
              </div>
            <Row gutter={[20,20]} className="excercise-grid">
              {section4Images.map((item, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={12}
                  md={8}
                  className="excercise-col"
                >
                    <img src={item.src} alt={item.alt} loading="lazy" />
                    <h3>{item.title}</h3>
                </Col>
                
              ))}
            </Row>
          </div>
        </section>
      </div>
    </>
  );
}
export default Home;
