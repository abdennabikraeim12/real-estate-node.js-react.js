import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  const query = request.url.split("?")[1]; //http://localhost:5173/list?type=buy&city=london&minPrice=100&maxPrice=1000
  const postPromise = apiRequest("/posts?" + query);
  return defer({
    postResponse: postPromise, //type=buy&city=london&minPrice=100&maxPrice=1000
  });
};

export const profilePageLoader = async () => {
  const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,//userPosts et savedPosts : les posts de user
    chatResponse: chatPromise,// les chats de users
  });
};