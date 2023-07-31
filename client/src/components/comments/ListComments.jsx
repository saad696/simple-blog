import { Avatar, List } from "antd";
import React from "react";

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
            <List.Item.Meta
              avatar={
                <Avatar
                  src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${idx}`}
                />
              }
              title={<b>{item.id}</b>}
              description={item.comment}
            />
          </List.Item>
        )}
      />
    </>
  );
};

export default ListComments;
