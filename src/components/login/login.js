import React from 'react'
import "../../App.css";
import { Button, Form, Input, Select, Checkbox, message } from "antd";
import loginImg from "../../../src/login.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {useNavigate} from "react-router-dom";

function LoginFrom() {

    const [form] = Form.useForm();
    let navigate = useNavigate()
  
    const onFinish = (values) => {
      console.log(values);
      if(values?.username === "admin" 
      && values?.password === "admin"){
        navigate("/dashboard")
  
      }else{
        message.info('Sai tài khoản mật khẩu vui lòng xem lại !');
      }
    };

  return (
    <div className="lContainer">
    <div className="lItem">
      <div className="loginImage">
        <img
          src={loginImg}
          width="300"
          style={{ position: "relative" }}
          alt="login"
        />
      </div>
      <div className="loginForm">
        <h2>Login</h2>
        <Form
          name="nest-messages"
          onFinish={onFinish}
          layout="vertical"
          scrollToFirstError
          className="login-form"
        >
          <Form.Item
            name={["username"]}
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input placeholder="Username"  prefix={<UserOutlined />} />
          </Form.Item>
          <Form.Item
            name={["password"]}
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" prefix={<LockOutlined />} />
          </Form.Item>
          <Form.Item>
            <Checkbox>Remember me</Checkbox>
            <Button
              type="primary"
              htmlType="submit"
              className="margin-lr-10 width-80"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  </div>
  )
}

export default LoginFrom