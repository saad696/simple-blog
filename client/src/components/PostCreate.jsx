/* eslint-disable react/prop-types */
import { useState } from "react";
import { Button, Form, Input, message } from "antd";
import { apiService } from "../api/apiService";

const PostCreate = ({ getPosts }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const onPost = async (formData) => {
    setLoading(true);
    try {
      const data = await apiService.createPost(formData);
      message.success(data.message);
      form.resetFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      message.error("Something went wrong!");
    }
    getPosts();
  };

  return (
    <>
      <h1 className="text-3xl text-center my-12">Create Posts</h1>
      <Form
        form={form}
        name="post-form"
        layout="vertical"
        onFinish={onPost}
        autoComplete="off"
      >
        <Form.Item
          label="Post Title"
          name="title"
          rules={[
            {
              required: true,
              message: "This is a required field",
            },
          ]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          label="Post Content"
          name="content"
          rules={[
            {
              required: true,
              message: "This is a required field",
            },
          ]}
        >
          <Input.TextArea showCount allowClear maxLength={250} />
        </Form.Item>
        <Button htmlType="submit" loading={loading} disabled={loading}>
          Create
        </Button>
      </Form>
    </>
  );
};

export default PostCreate;
