import { useEffect } from "react";
import { deleteAllCookies } from "../../helpers/cookie";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";

function LogOut() {
    const navigate = useNavigate();
    const dispatch=useDispatch();
    
    deleteAllCookies();
    useEffect(() => {
        dispatch(checkLogin(false));
        navigate("/login");
    }, []);
  return (
    <></>
  );
}
export default LogOut;