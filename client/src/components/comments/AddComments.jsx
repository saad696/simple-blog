import { Button, Form, Input, message } from 'antd';
import { apiService } from '../../api/apiService';

const AddComments = (postId) => {
    const [form] = Form.useForm();

    const onSubmit = async (formData) => {
        try {
            const data = await apiService.addComment(formData, postId);
            message.success(data.message);
            form.resetFields();
        } catch (error) {
            message.error(error.data.message || 'Something went wrong!');
        }
    };

    return (
        <>
            <Form
                form={form}
                name='comment-form'
                layout='vertical'
                onFinish={onSubmit}
                autoComplete='off'
            >
                <Form.Item
                    label='Add Comment'
                    name='comment'
                    rules={[
                        {
                            required: true,
                            message: 'This is a required field',
                        },
                    ]}
                >
                    <Input allowClear />
                </Form.Item>
                <Button htmlType='submit'>comment</Button>
            </Form>
        </>
    );
};

export default AddComments;
