import { Typography, Form, Button, Input } from "antd";
import { useSignInWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";

const { Title } = Typography;
const { Item } = Form;
const { Password } = Input;

const SignIn = () => {
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);

  const navigate = useNavigate();
  const handleFinish = (values) => {
    signInWithEmailAndPassword(values.email, values.password);
  };

  useEffect(() => {
    if (user && !error) {
      navigate("/");
    }
  }, [user, error]);

  useEffect(() => {
    if(error) {
        message.error(error.message)
    }
  }, [error])
  return (
    <div style={{ width: 600 }}>
      <Title level={2}>Sign In</Title>
      <Form onFinish={handleFinish} layout="vertical">
        <Item
          rules={[
            {
              required: true,
              message: "Please type your email.",
            },
            {
              type: "email",
              message: "Please type valid email.",
            },
          ]}
          label="Email"
          name={"email"}
        >
          <Input />
        </Item>
        <Item
          rules={[
            {
              required: true,
              message: "Please type your password.",
            },
            {
              min: 8,
              message: "Password shoud be at least 8 characters.",
            },
          ]}
          label="Password"
          name={"password"}
        >
          <Password />
        </Item>
        <Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Login
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default SignIn;
