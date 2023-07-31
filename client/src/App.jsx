import { useState } from 'react';
import { PostCreate, PostsList } from './components';
import { Col, Row, message } from 'antd';
import { apiService } from './api/apiService';

const App = () => {
    const [posts, setPosts] = useState([]);

    const getPosts = async () => {
        try {
            const {data} = await apiService.getPosts();
            console.log(data)
            setPosts([...data]);
        } catch (error) {
            console.log(error)
            message.error(error || 'Something went wrong');
        }
    };

    return (
        <>
            <div className='m-8'>
                <Row justify={'center'}>
                    <Col xs={24} lg={12}>
                        <PostCreate getPosts={getPosts} />
                    </Col>
                </Row>
                <Row justify={'center'}>
                    <Col xs={24} lg={18}>
                        <PostsList posts={posts} getPosts={getPosts} />
                    </Col>
                </Row>
            </div>
        </>
    );
};

export default App;
