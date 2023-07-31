/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { Button, List } from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import { AddComment } from '.';

const PostsList = ({ posts, getPosts }) => {
    const [showAddComment, setShowAddComment] = useState(false);

    const toggleComments = () => setShowAddComment(!showAddComment);

    useEffect(() => {
        getPosts();
    }, []);

    return (
        <>
            <h1 className='text-3xl text-center my-12'>List Posts</h1>
            <List
                className='h-[300px] overflow-auto'
                itemLayout='vertical'
                size='large'
                dataSource={posts}
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        actions={[
                            <>
                                <a
                                    className='flex items-center space-x-2'
                                    key={1}
                                >
                                    <MessageOutlined />
                                    <span>2</span>
                                </a>
                            </>,
                        ]}
                    >
                        <List.Item.Meta
                            className='border p-6'
                            title={<b>{item.title}</b>}
                            description={item.content}
                        />
                        <div className={showAddComment ? 'border p-6' : 'p-0'}>
                            <Button
                                htmlType='button'
                                onClick={toggleComments}
                                className='mb-4'
                            >
                                {showAddComment ? 'Close' : 'Add'} Comment
                            </Button>
                            {showAddComment && <AddComment key={2} postId={item.id}/>}
                        </div>
                    </List.Item>
                )}
            />
        </>
    );
};

export default React.memo(PostsList);
