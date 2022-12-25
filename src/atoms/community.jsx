import { atom } from "recoil";

export const defaultCommunity = {
    id: "",
    creatorId: "",
    numberOfMembers: 0,
    privacyType: "public",
  };
  
  export const defaultCommunityState = {
    mySnippets: [],
    initSnippetsFetched: false,
    visitedCommunities: {},
    currentCommunity: defaultCommunity,
  };
  
  export const communityState = atom({
    key: "communitiesState",
    default: defaultCommunityState,
  });