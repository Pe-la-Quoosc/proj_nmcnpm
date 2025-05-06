import { Dropdown } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import "./User1.scss";
function User1() {
  const items = [
    {
      key: "1",
      label: (
        <NavLink className="NavLink" to="/user">
          Thong tin ca nhan
        </NavLink>
      ),
    },
    {
      key: "2",
      label: (
        <NavLink className="NavLink" to="/manager">
          Quan li
        </NavLink>
      ),
    },
    {
      key: "3",
      label: (
        <NavLink className="NavLink" to="/logout">
          Dang xuat
        </NavLink>
      ),
    },
  ];
  return (
    <>
      <Dropdown className="Icon" menu={{ items }} placement="bottom"  arrow>
        <FontAwesomeIcon className="Icon__user" icon={faCircleUser} style={{ fontSize: "25px" }} />
      </Dropdown>
    </>
  );
}
export default User1;
