// import "./LayoutDefault.scss";
import { Outlet, NavLink } from "react-router-dom";
import { getCookie } from "../../helpers/cookie";
import { useSelector } from "react-redux";

function LayoutDefault() {
  const token = getCookie("token");
  const isLogin = useSelector((state) => state.loginReducer);
  // console.log(token);
  console.log(isLogin);
  return (
    <div>
      <header>
        <div className="layout-default__menu">
          <div className="layout-default__logo">
            Logo
          </div>
          <NavLink to="/">Trang chủ</NavLink>
          {token ? (
            <>
              <NavLink to="/products">Sản phẩm</NavLink>
              <NavLink to="/exercise">Bai tap</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Sản phẩm</NavLink>
              <NavLink to="/login">Bai tap</NavLink>
            </>
          )}

          <NavLink to="/blog">Blog</NavLink>
          <NavLink to="/about">Giới thiệu</NavLink>
          <NavLink to="/contact">Liên hệ</NavLink>
        </div>
        <div className="layout-default__manager">
          {token === "admin" && <NavLink to="/manager">Quan li</NavLink>}
        </div>
        <div className="layout-default__account">
          {token ? (
            <>
              <NavLink to="/logout">Dang xuat</NavLink>
            </>
          ) : (
            <>
              <NavLink to="/login">Dang Nhap</NavLink>
              <NavLink to="/register">Dang ki</NavLink>
            </>
          )}
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default LayoutDefault;
