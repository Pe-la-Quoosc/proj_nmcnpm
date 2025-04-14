import { Button, Checkbox, Form, Input, notification } from "antd";
import { login } from "../../services/usersServices";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../helpers/cookie";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (e) => {
    const response = await login(e.username, e.password);
    if (response.length > 0) {
        // console.log(response);
      setCookie("user", response[0].username, 1);
      setCookie("id", response[0].id, 1);
      setCookie("token", response[0].token, 1);
      setCookie("email", response[0].email, 1);
      notification.success({
        message: "Login successful",
        description: "Welcome back!",
        className: "custom-notification__success",
        placement: "topRight",
        duration: 1,
      });
      dispatch(checkLogin(true));
      navigate("/");
    } else {
      notification.error({
        message: "Login failed",
        description: "Username or password is incorrect",
        className: "custom-notification__error",
        placement: "topRight",
        duration: 2,
      });
    }
  };
  return (
    <>
      <div>Login</div>
      <div>
        <Form
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Dang nhap
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Login;
