import { Row, Col } from "antd";
import { Outlet, NavLink, useLocation } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";
import "../../styles/LayoutDefault.scss";
import logo from "../../assets/images/logo-nav.png";
import Cart1 from "../../Cart_1";
import User1 from "../../User_1";
import { useState, useEffect, useRef } from "react";
import { RightSquareOutlined } from "@ant-design/icons";
import {
  TwitterOutlined,
  FacebookOutlined,
  InstagramOutlined,
  YoutubeOutlined,
} from "@ant-design/icons";

const footerData = {
  contact: {
    title: "GYMBE",
    items: [
      "268 St. South New York/NY 98944, United States.",
      "+222-1800-2628",
      "gymbeexclusive@gmail.com",
    ],
    socials: [
      { icon: <TwitterOutlined />, link: "https://www.facebook.com/tri.minh.568702" },
      { icon: <FacebookOutlined />, link: "https://www.facebook.com/tri.minh.568702" },
      { icon: <InstagramOutlined />, link: "https://www.facebook.com/tri.minh.568702" },
      { icon: <YoutubeOutlined />, link: "https://www.facebook.com/tri.minh.568702" },
    ],
  },
  categories: [
    "Special Offers",
    "Performance",
    "T-Shirts",
    "Underwear",
    "Top Brands",
    "Online Exclusive",
  ],
  customerService: [
    "Chính sách bảo mật",
    "Điều khoản dịch vụ",
    "Hướng dẫn mua hàng",
    "Liên hệ hỗ trợ",

  ],
};

function LayoutDefault() {
  const token = getCookie("token");
  const location = useLocation();
  const menuRef = useRef(null);
    const [menuOpen, setMenuOpen] = useState(false);
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";


  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <header className="layout-default">
        <NavLink className="layout-default__logo" to="/">
          <div className="layout-default__logo">
            <img className="img" src={logo} alt="logo" />
            <div>Logo</div>
          </div>
        </NavLink>

        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          <RightSquareOutlined />
        </div>

        <div ref={menuRef} className={`layout-default__menu ${menuOpen ? "menu-open" : ""}`}>
          <NavLink className="NavLink" to="/">
            Trang chủ
          </NavLink>
          {token ? (
            <>
              <NavLink className="NavLink" to="/products">
                Sản phẩm
              </NavLink>
              <NavLink className="NavLink" to="/exercise">
                Bai tap
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="NavLink" to="/login">
                Sản phẩm
              </NavLink>
              <NavLink className="NavLink" to="/login">
                Bai tap
              </NavLink>
            </>
          )}

          <NavLink className="NavLink" to="/knowledge">
            Kiến thức
          </NavLink>
          <NavLink className="NavLink" to="/about">
            Giới thiệu
          </NavLink>
          <NavLink className="NavLink" to="/contact">
            Liên hệ
          </NavLink>
        </div>
        <div className="layout-default__account">
          {token ? (
            <>
              <Cart1 />
              <User1 />
            </>
          ) : (
            <>
              <NavLink className="NavLink" to="/login">
                Dang Nhap
              </NavLink>
              <NavLink className="NavLink" to="/register">
                Dang ki
              </NavLink>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
      {!hideFooter && (
        <footer className="ava-footer gymbe-footer">
          <div className="container">
            <Row gutter={[32, 32]} className="footer-content">
              {/* Contact & Social */}
              <Col xs={24} sm={12} md={8} lg={7}>
                <div className="footer-section">
                  <h3 className="footer-logo">{footerData.contact.title}</h3>
                  <div className="contact-info">
                    <p>{footerData.contact.items[0]}</p>
                    <p>{footerData.contact.items[1]}</p>
                    <p>{footerData.contact.items[2]}</p>
                  </div>
                  <div className="footer-socials">
                    {footerData.contact.socials.map((s, idx) => (
                      <a key={idx} href={s.link} target="_blank" rel="noopener noreferrer">
                        {s.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </Col>
              {/* Hot Categories */}
              <Col xs={24} sm={12} md={6} lg={5}>
                <div className="footer-section">
                  <h4>Sản Phẩm</h4>
                  <ul>
                    {footerData.categories.map((item, i) => (
                      <li key={i}>
                        <a href="https://www.facebook.com/">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              {/* Customer Service */}
              <Col xs={24} sm={12} md={6} lg={6}>
                <div className="footer-section">
                  <h4>Hỗ trợ khách hàng</h4>
                  <ul>
                    {footerData.customerService.map((item, i) => (
                      <li key={i}>
                        <a href="https://www.facebook.com/">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
              </Col>
              {/* Newsletter */}
              <Col xs={24} sm={12} md={8} lg={6}>
                <div className="footer-section">
                  <h4>Đăng Ký Nhận Tin</h4>
                  <form className="footer-newsletter">
                    <input type="email" placeholder="Enter your email..." />
                    <button type="submit">Đăng Ký</button>
                  </form>
                </div>
              </Col>
            </Row>
          </div>
        </footer>
      )}
    </div>
  );
}

export default LayoutDefault;