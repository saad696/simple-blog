import { Alert, Avatar, List } from "antd";
import React from "react";

const COMMENT_STATE = {
  Pending: {
    description: "This comment is under moderation.",
    type: "warning",
  },
  Rejected: {
    description: "This comment has been rejected in moderation.",
    type: "error",
  },
};

const ListComments = ({ comments }) => {
  return (
    <>
      <List
        className="max-h-[300px] overflow-auto p-2"
        itemLayout="vertical"
        size="small"
        dataSource={comments}
        renderItem={(item, idx) => (
          <List.Item className="border-2 mb-2" key={item.title}>
            {item.status === "Approved" ? (
              <List.Item.Meta
                avatar={
                  <Avatar
                    src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${idx}`}
                  />
                }
                title={<b>{item.id}</b>}
                description={item.comment}
              />
            ) : (
              <Alert
                message="Comment State"
                description={COMMENT_STATE[item.status].description}
                type={COMMENT_STATE[item.status].type}
              />
            )}
          </List.Item>
        )}
      />
    </>
  );
};

export default ListComments;
