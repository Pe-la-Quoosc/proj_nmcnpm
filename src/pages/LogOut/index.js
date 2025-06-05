import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import { post } from "../../utils/request";

function LogOut() {
    const navigate = useNavigate();
    const dispatch= useDispatch();

    useEffect(() => {
      const logout = async () => {
        try{
          await post("api/user/logout");
          dispatch(checkLogin(false));
          navigate("/login");
        } catch (error) {
          console.error("Logout failed:", error);
        }
      };
      logout();
    }, [dispatch, navigatedispatch, navigate]);
  return (
    <></>
  );
}
export default LogOut;