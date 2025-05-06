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
const footerData = {
  contact: {
    title: "AVA",
    items: [
      "Lorem ipsum, 235 Simply,",
      "printing, Pin 309 300",
      "roturpastol0075@gmail.com",
      "+1 00000 00000",
    ],
  },
  sections: [
    {
      title: "Information",
      items: ["Men", "Women", "Kids", "Home & Living", "Beauty"],
    },
    {
      title: "Explore",
      items: ["Blog", "Gift Cards", "Financing", "Reviews"],
    },
    {
      title: "Contact Us",
      items: ["FAQ", "Track Orders", "Shipping", "Cancellation", "Returns"],
    },
    {
      title: "Support",
      items: ["Help Center", "News", "Career", "Terms of Use"],
    },
  ],
};
function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);
  const location = useLocation();
  const menuRef = useRef(null);
  // console.log(token);
  // console.log(isLogin);
  const hideFooter =
    location.pathname === "/login" || location.pathname === "/register";
  const [menuOpen, setMenuOpen] = useState(false);

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

          <NavLink className="NavLink" to="/blog">
            Blog
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
        <footer className="ava-footer">
          <div className="container">
            <Row gutter={[32, 32]} className="footer-content">
              <Col xs={24} sm={12} md={6} lg={5}>
                <div className="footer-section">
                  <h3 className="footer-logo"> {footerData.contact.title}</h3>
                  <div className="contact-info">
                    {footerData.contact.items.map((item, index) => (
                      <p key={index}>{item}</p>
                    ))}
                  </div>
                </div>
              </Col>
              {footerData.sections.map((section, index) => (
                <Col
                  key={index}
                  xs={24}
                  sm={12}
                  md={6}
                  lg={index === 3 ? 5 : 4}
                >
                  <div className="footer-section">
                    <h4>{section.title}</h4>
                    <ul>
                      {section.items.map((item, i) => (
                        <li key={i}>
                          <a href="#">{item}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Col>
              ))}
            </Row>

            {/* Bottom Footer */}
            <Row
              className="footer-bottom"
              justify="space-between"
              align="middle"
            >
              <Col>
                <p>© 2023 AVA, All Rights Reserved.</p>
              </Col>
              <Col>
                <div className="legal-links">
                  <a href="#">Privacy Policy</a>
                  <a href="#">Terms & Conditions</a>
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
