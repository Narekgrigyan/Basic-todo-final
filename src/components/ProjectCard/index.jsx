import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Avatar, Card, Skeleton, Modal, Form, Input, DatePicker } from "antd";
import { formatDate } from "../../utils/formatDate";
import { doc, deleteDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { useState } from "react";
import dayjs from 'dayjs'

const { Meta } = Card;
const { confirm } = Modal;
const {useForm} = Form;

const ProjectCard = ({ name, author, image, date, id }) => {
  const [form ] = useForm()
  const handleDelete = async () => {
    confirm({
      title: "Are you sure delete this project?",
      okText: "Yes",
      okButtonProps: {
        danger: true,
      },
      icon: <DeleteOutlined />,
      cancelText: "No",
      onCancel: () => {},
      onOk: async () => {
        await deleteDoc(doc(db, "projects", id));
      },
    });
  };
  const [modalOpened, setModalOpened] = useState(false);

  const handleFinish = async ({name, date, author, image}) => {
    try {
      await setDoc(doc(db, "projects", id), {
        name,
        author,
        image,
        date: date.toDate()
      })
    } catch (error) {
      
    }
  };

  const handleEdit = () => {
      setModalOpened(true);
      form.setFieldsValue({
        name,
        date: dayjs(date.toDate()),
        author,
        image
      })
  }
  return (
    <>
      <Modal
        destroyOnClose
        closable={false}
        open={modalOpened}
        okText="Save"
        onCancel={() => {
          setModalOpened(false);
        }}
        onOk={() => {
          setModalOpened(false);
        }}
        okButtonProps={{
          htmlType: "submit",
          form: "project-form",
        }}
      >
        <Form form={form} layout="vertical" onFinish={handleFinish} id="project-form">
          <Form.Item name={"name"} label={"Name"}>
            <Input />
          </Form.Item>
          <Form.Item name={"author"} label={"Author"}>
            <Input />
          </Form.Item>
          <Form.Item name={"image"} label={"Image Url"}>
            <Input />
          </Form.Item>
          <Form.Item name={"date"} label={"Date"}>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
      <Card
        style={{ width: 300, marginTop: 16 }}
        actions={[
          <EditOutlined
            onClick={handleEdit}
            key="edit"
          />,
          <DeleteOutlined onClick={handleDelete} key="ellipsis" />,
        ]}
      >
        <Skeleton loading={false} avatar active>
          <Meta
            avatar={<Avatar src={image} />}
            title={name}
            description={
              <div>
                <p>Author: {author}</p>
                <time>{formatDate(date.toDate())}</time>
              </div>
            }
          />
        </Skeleton>
      </Card>
    </>
  );
};

export default ProjectCard;
