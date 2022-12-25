import { atom } from "recoil";

export const defaultPostState = {
    selectedPost: null,
    posts: [],
    postVotes: [],
    postsCache: {},
    postUpdateRequired: true,
  };
  
  export const postState = atom({
    key: "postState",
    default: defaultPostState,
  });