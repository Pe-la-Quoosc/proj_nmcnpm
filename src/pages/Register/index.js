import { useNavigate } from "react-router-dom";
import { generateToken } from "../../helpers/generateToken";
import {  checkExistUser, register } from "../../services/usersServices";
import { Button, Form, Input, notification } from "antd";

function Register() {
  const navigate = useNavigate();

  const onFinish = async (e) => {
    const username = e.username;
    const password = e.password;
    const email = e.email;

    const checkExist=await checkExistUser("username",username);
    if (checkExist.length > 0) {
        notification.error({
            message: "Register failed",
            description: "Username already exists",
            className: "custom-notification__error",
            placement: "topRight",
            duration: 2,
        });
    }else{
        const options={
            username: username,
            password: password,
            email: email,
            token:generateToken(),
        }
        const response = await register(options);
        // console.log(response);
        if(response) {
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
    <div>Đăng kí </div>
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
              Dang ky
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
export default Register;
