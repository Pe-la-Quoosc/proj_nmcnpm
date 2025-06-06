import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { post } from "../../utils/request";
import { deleteCookie } from "../../helpers/cookie";


function LogOut() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const logout = async () => {
      try {
        await post("api/user/logout");
        deleteCookie("token"); // Xóa cookie "token"
        dispatch(checkLogin(false)); // Cập nhật trạng thái đăng nhập
        navigate("/login"); // Điều hướng về trang đăng nhập
      } catch (error) {
        console.error("Logout failed:", error);
      }
    };
    logout();
  }, [dispatch, navigate]);

  return <></>;
}

export default LogOut;