import { Row, Col, Button, Form, Input, notification,Flex } from "antd";
import { login } from "../../services/usersServices";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { checkLogin } from "../../actions/login";
import "../../styles/Login.scss";
function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (e) => {
    try {
      const response = await login(e.username, e.password);
      console.log(response);
        if(!response.token){
          throw new Error("Login failed: No token received");
        }
        document.cookie = `token=${response.token}; path=/; max-age=${60 * 60};`;
        notification.success({
          message: "Login successful",
          description: "Welcome back!",
          className: "custom-notification__success",
          placement: "topRight",
          duration: 1,
        });

      dispatch(checkLogin(true));
      if (response.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/");
      }

      if (!response.token) {
        throw new Error("Login failed: No token received");
      }
      notification.success({
        message: "Login successful",
        description: "Welcome back!",
        className: "custom-notification__success",
        placement: "topRight",
        duration: 1,
      });

      dispatch(checkLogin(true));
      navigate("/");
    } catch (error) {
      notification.error({
        message: "Login failed",
        description: "Username or password is incorrect",
        className: "custom-notification__error",
        placement: "topRight",
        duration: 2,
      });
    }
  };
  const handleSignUp = () => {
    navigate("/register");
  };
  return (
    <>
      <div className="login">
        <div className="login-container">
          <Row gutter={[20, 20]}>
            <Col span={12} className="login-header">
              <h1> Tên tiêu đề</h1>
              <p> Nội dung :.....</p>
            </Col>
            <Col span={12} className="login-form">
              <h1>Đăng nhập</h1>
              <Form name="basic" onFinish={onFinish}>
                <Form.Item
                  label="User"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your username!" },
                  ]}
                >
                  <Input />
                </Form.Item>

                <Form.Item
                  label="Pass"
                  name="password"
                  rules={[
                    { required: true, message: "Please input your password!" },
                  ]}
                >
                  <Input.Password />
                </Form.Item>
                <Flex justify="flex-end" align="center">
                  <NavLink to="/forgot" >Forgot password ?</NavLink>
                </Flex>

                <Form.Item className="login-form__button">
                  <Button type="primary" htmlType="submit" className="button">
                    Đăng Nhập
                  </Button>
                </Form.Item>

                <Form.Item className="login-form__button">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="button"
                    onClick={handleSignUp}
                  >
                    Đăng Kí
                  </Button>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Login;
