/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, List } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { AddComment, ListComments } from ".";

const PostsList = ({ posts, getPosts }) => {
  const [showAddComment, setShowAddComment] = useState({
    show: false,
    id: null,
  });

  const toggleComments = (postId) => {
    if (postId === showAddComment.id) {
      setShowAddComment({ show: false, id: null });
    } else {
      setShowAddComment({ show: true, id: postId });
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <>
      <h1 className="text-3xl text-center my-12">List Posts</h1>
      <List
        className="h-[300px] overflow-auto p-2"
        itemLayout="vertical"
        size="large"
        dataSource={posts}
        renderItem={(item) => (
          <List.Item className="border-2 mb-2" key={item.title}>
            <List.Item.Meta
              title={<b>{item.title}</b>}
              description={item.content}
            />
            <div className="flex items-center space-x-6">
              {/* view comments */}
              <span className="flex items-center space-x-2">
                <MessageOutlined />
                <span>{item.comments.length}</span>
              </span>
              {/* view comments */}
              <div>
                <Button
                  htmlType="button"
                  onClick={() => {
                    toggleComments(item.id);
                  }}
                >
                  {showAddComment.show && showAddComment.id === item.id
                    ? "Close"
                    : "Add"}{" "}
                  Comment
                </Button>
              </div>
              {/* add comments */}
            </div>
            {showAddComment.show && showAddComment.id === item.id && (
              <div className="mt-4">
                <AddComment postId={item.id} />
              </div>
            )}
            {item.comments.length > 0 && (
              <div className="p-4">
                <ListComments comments={item.comments} />
              </div>
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default React.memo(PostsList);
