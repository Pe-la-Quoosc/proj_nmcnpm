import { NavLink, useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import { checkExistUser, register } from "../../services/usersServices";
import { Row, Col, Button, Form, Input, notification } from "antd";
import "../../styles/SignUp.scss";
function Register() {
  const navigate = useNavigate();

  const onFinish = async (e) => {
    const username = e.username;
    const password = e.password;
    const email = e.email;

    const checkExist = await checkExistUser("username", username);
    if (checkExist.length > 0) {
      notification.error({
        message: "Register failed",
        description: "Username already exists",
        className: "custom-notification__error",
        placement: "topRight",
        duration: 2,
      });
    } else {
      const options = {
        username: username,
        password: password,
        email: email,
        token: generateToken(),
      };
      const response = await register(options);
      // console.log(response);
      if (response) {
        notification.success({
          message: "Register successful",
          description: "Welcome!",
          className: "custom-notification__success",
          placement: "topRight",
          duration: 1,
        });
        navigate("/login");
      }
    }
  };
  return (
    <>
      <div className="signup">
        <div className="signup-container">
          <Row gutter={[20, 20]}>
            <Col span={12} className="signup-header">
              <h1> Tên tiêu đề</h1>
              <p> Nội dung :.....</p>
            </Col>
            <Col span={12} className="signup-form">
              <h1>Đăng kí </h1>
              <Form name="basic" onFinish={onFinish} >
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

                <Form.Item className="signup-form__button">
                  <Button type="primary" htmlType="submit" className="button">
                    Dang ky
                  </Button>
                </Form.Item>
              </Form>
              <div> Already have an account? <NavLink to='/login'><b>Sign Up</b></NavLink></div>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
}
export default Register;
