/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect } from 'react';
import { List } from 'antd';
import { MessageOutlined } from '@ant-design/icons';

const PostsList = ({ posts, getPosts }) => {
    useEffect(() => {
        getPosts();
        console.log('test');
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
                            {/* <h1 className='text-lg mb-4 font-semibold'>Comments</h1> */}
                                <div
                                    className='flex items-center space-x-2'
                                    key={1}
                                >
                                    <MessageOutlined />
                                    <span>2</span>
                                </div>
                            </>,
                        ]}
                    >
                        <List.Item.Meta
                        className='border p-6'
                            title={<b>{item.title}</b>}
                            description={item.content}
                        />
                    </List.Item>
                )}
            />
        </>
    );
};

export default React.memo(PostsList);
