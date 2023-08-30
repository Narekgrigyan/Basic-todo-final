import Card from "../../components/ProjectCard";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { collection, addDoc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase.config";
import { Spin, Empty, Button, Modal, Form, Input, DatePicker } from "antd";
import { projectsConverter } from "../../utils/projectsConverter";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const Home = () => {
  const [value, loading, error] = useCollectionData(
    collection(db, "projects").withConverter(projectsConverter),
    {
      snapshotListenOptions: { includeMetadataChanges: true },
    }
  );
  const [modalOpened, setModalOpened] = useState(false);

  const addDocToFirebase = async ({ name, author, image, date }) => {
    try {
      await addDoc(collection(db, "projects"),  {
        name,
        author,
        image,
        date: date.toDate(),
      });
    } catch (error) {
      console.error(error)
    }
  };

  const handleFinish = async (values) => {
    console.log(values);
    await addDocToFirebase(values)
  };
  return (
    <Spin style={{ width: "100%" }} spinning={loading}>
      <Modal
        destroyOnClose
        closable={false}
        open={modalOpened}
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
        <Form layout="vertical" onFinish={handleFinish} id="project-form">
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
      <Button
        onClick={() => {
          setModalOpened(true);
        }}
        type="primary"
        shape="circle"
        icon={<PlusOutlined />}
      />
      <div
        style={{
          display: "grid",
          width: "100%",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        }}
      >
        {value?.length ? (
          value.map((v) => <Card key={v.id} {...v} />)
        ) : (
          <Empty description={"There are no projects yet."} />
        )}
      </div>
    </Spin>
  );
};

export default Home;
