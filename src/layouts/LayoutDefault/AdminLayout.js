import React from "react";
import { NavLink, Outlet } from "react-router-dom";
// import "./AdminLayout.css"; // Tạo file này để style nếu muốn

const AdminLayout = () => {
  return (
    <div className="admin-layout" style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: 220, background: "#222", color: "#fff", padding: 20 }}>
        <h2>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <NavLink to="/admin" end style={({ isActive }) => ({ color: isActive ? "#ffd700" : "#fff" })}>
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/users" style={({ isActive }) => ({ color: isActive ? "#ffd700" : "#fff" })}>
                Quản lý người dùng
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/products" style={({ isActive }) => ({ color: isActive ? "#ffd700" : "#fff" })}>
                Quản lý sản phẩm
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/orders" style={({ isActive }) => ({ color: isActive ? "#ffd700" : "#fff" })}>
                Quản lý đơn hàng
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/blogs" style={({ isActive }) => ({ color: isActive ? "#ffd700" : "#fff" })}>
                Quản lý bài viết
              </NavLink>
            </li>
            {/* Thêm các mục khác nếu cần */}
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: 32, background: "#f4f6f8" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;