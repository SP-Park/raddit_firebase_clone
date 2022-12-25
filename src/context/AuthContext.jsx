import React, { createContext, useContext, useState, useEffect } from "react";
import { getRecommendationCommunity, getAllCommunities, getUserFeed, getNoUserFeed, onDeleteComment, getCommnets, onCreateComment, getMyVote, onVote, changeImage, deletePost, getPosts, createPost, joinCommunity, leaveCommunity, getMySnippets, signup, login, onUserChange, logout, loginWithG, resetPassword, addFirestore, getCommunity } from '../apis/firebase'

const AuthContext = createContext()
export function AuthContextProvider({ children }) {
    const [user, setUser] = useState()
    const [error, setError] = useState()
    const [communityState, setCommunityState] = useState()
    const [voteState, setVoteState] = useState()
    const [postState, setPostState] = useState()
    const [postVote, setPostVote] = useState({
        id: '',
        postId: '',
        communityId: '',
        voteValue: 0
    })
    const [comments, setCommnets] = useState([])

    useEffect(() => {
        onUserChange((user) => {
            console.log(user)
            setUser(user)
        })
    }, [])

    useEffect(() => {
        getMySnippets(user)
        .then((snippets) => {
            if(snippets) {
                console.log(snippets)
                setCommunityState(snippets)
                return
            } else {
                return
            }
        })
        getMyVote(user)
        .then((snippets) => {
            if(snippets) {
                console.log(snippets)
                setVoteState(snippets) // firebase : PostVotes =  react: voteState
                return
            } else {
                return
            }
        })
    },[user])

    // console.log('voteState', voteState)
    return (
        <AuthContext.Provider 
            value={{ 
                user, 
                error, 
                setError,
                communityState,
                setCommunityState,
                postState,
                setPostState,
                postVote,
                setPostVote,
                voteState,
                setVoteState,
                signup, 
                login, 
                logout, 
                loginWithG, 
                resetPassword, 
                addFirestore, 
                getCommunity,
                getMySnippets,
                leaveCommunity,
                joinCommunity,
                createPost,
                getPosts,
                deletePost,
                changeImage,
                onVote,
                onCreateComment,
                getCommnets,
                onDeleteComment,
                getNoUserFeed,
                getUserFeed,
                getAllCommunities,
                getRecommendationCommunity
            }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuthContext() {
    return useContext(AuthContext)
}