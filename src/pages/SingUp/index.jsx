import { Form, Input, Button, Typography, message } from "antd";
import { useCreateUserWithEmailAndPassword } from "react-firebase-hooks/auth";
import { auth } from "../../firebase.config";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const { Item } = Form;
const { Title } = Typography;
const { Password } = Input;

const SignUp = () => {
  const [createUserWithEmailAndPassword, user, loading, error] =
    useCreateUserWithEmailAndPassword(auth);

  const navigate = useNavigate();

  const handleFinish = async (values) => {
    try {
      if (values.password === values.confirm) {
        await createUserWithEmailAndPassword(values.email, values.password);
      } else {
        message.error("Password and Confirm password shoud match!");
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    if(user && !error) {
      navigate("/");
    }
  }, [user, error])

  useEffect(() => {
    if(error) {
      message.error(error.message)
    }
  }, [error])
  
  return (
    <div style={{ width: 600 }}>
      <Title level={2}>Sign Up</Title>
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
          label="Confirm Password"
          name={"confirm"}
        >
          <Password />
        </Item>
        <Item>
          <Button loading={loading} type="primary" htmlType="submit">
            Register
          </Button>
        </Item>
      </Form>
    </div>
  );
};

export default SignUp;
