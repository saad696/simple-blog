/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { Button, List, message } from "antd";
import { MessageOutlined } from "@ant-design/icons";
import { AddComment, ListComments } from ".";
import { apiService } from "../api/apiService";

const PostsList = ({ posts, getPosts }) => {
  const [showAddComment, setShowAddComment] = useState({
    show: false,
    id: null,
  });

  const [comments, setComments] = useState({ id: null, commentsData: [] });

  const toggleComments = (postId) => {
    if (postId === showAddComment.id) {
      setShowAddComment({ show: false, id: null });
    } else {
      setShowAddComment({ show: true, id: postId });
    }
  };

  const getPostComments = async (postId) => {
    if (comments.id && comments.id === postId) {
      return setComments({ id: null, commentsData: [] });
    }
    try {
      const { data } = await apiService.getComments(postId);

      if (data.length === 0) {
        return message.info("No Comments on this post");
      }

      setComments({ id: postId, commentsData: data });
    } catch (error) {
      message.error("Something went wrong!");
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
              <Button
                className="flex items-center space-x-2"
                onClick={() => {
                  getPostComments(item.id);
                }}
              >
                <MessageOutlined />
                <span>2</span>
              </Button>
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
            {comments.commentsData.length > 0 && comments.id === item.id && (
              <div className="p-4">
                <ListComments comments={comments.commentsData} />
              </div>
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default React.memo(PostsList);
