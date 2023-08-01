import axios from "axios";

export const apiService = {
  createPost: async (body) => {
    const { data } = await axios.post("http://localhost:4000/posts", {
      data: body,
    });
    return data;
  },
  getPosts: async () => {
    const { data } = await axios.get("http://localhost:4002/posts");
    return data;
  },
  addComment: async (body, postId) => {
    const { data } = await axios.post(
      `http://localhost:4001/posts/${postId}/comments`,
      {
        data: body,
      }
    );
    return data;
  },
  // getComments: async (postId) => {
  //   const { data } = await axios.get(
  //     `http://localhost:4001/posts/${postId}/comments`
  //   );
  //   return data;
  // },
};
