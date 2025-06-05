import { Button, Form, Input, message } from "antd";
import "./UserPassword.scss";
import { useOutletContext } from "react-router-dom";
import { useState } from "react";
import { updateUserField } from "../../../services/usersServices";
function UserPassword() {
    const [loading, setLoading] = useState(false);
    const{user, updateUser} = useOutletContext();
    // console.log(user);
    const handleSubmit = async (values) => {
        const { oldPassword, newPassword, confirmPassword } = values;
        if(newPassword !== confirmPassword) {
            message.error("Mật khẩu mới và xác nhận mật khẩu không khớp!");
            return;
        }
        setLoading(true);
        if(oldPassword !== user.password) {
            message.error("Mật khẩu cũ không đúng!");}
        await updateUserField(user.id, { password: newPassword });
        updateUser({ ...user, password: newPassword });
        message.success("Đổi mật khẩu thành công!");
        setLoading(false);
    }
  return (
    <>
      <div className="user-password">
        <h2 className="user-password__title">Đổi mật khẩu</h2>
        <p className="user-password__description">
          Để bảo mật tài khoản, vui lòng không chia sẻ mật khẩu cho người khác
        </p>
        <Form layout="vertical" className="user-password__form"
        onFinish={handleSubmit}>
          <Form.Item
            label="Mật khẩu cũ"
            name="oldPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu cũ!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu cũ"
              className="user-password__input"
            />
          </Form.Item>
          <Form.Item
            label="Mật khẩu mới"
            name="newPassword"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu mới!" }]}
          >
            <Input.Password
              placeholder="Nhập mật khẩu mới"
              className="user-password__input"
            />
          </Form.Item>
          <Form.Item
            label="Xác nhận mật khẩu"
            name="confirmPassword"
            rules={[{ required: true, message: "Vui lòng xác nhận mật khẩu!" }]}
          >
            <Input.Password
              placeholder="Xác nhận mật khẩu mới"
              className="user-password__input"
            />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            className="user-password__button"
            loading={loading}
          >
            Xác Nhận
          </Button>
        </Form>
      </div>
    </>
  );
}
export default UserPassword;
