import { async } from '@firebase/util'
import React, { useEffect } from 'react'
import { constSelector, useRecoilState } from 'recoil'
import { communityState } from '../atoms/community'
import { useAuthContext } from '../context/AuthContext'
import { joinCommunity, leaveCommunity } from '../apis/firebase'

export default function useCommunity() {
  const { user, getMySnippets } = useAuthContext()
  const [communitiesStateValue, SetCommunitiesStateValue] = useRecoilState(communityState)
 

  const JoinOrLeave = async (communityData, isJoined, user) => {
    // is the user signed in ?
    // if not => open auth modal
    if(isJoined) {
        // leaveCommunity(communityData.name, user)
        // .then((res) => console.log(res))
        const communityId = await leaveCommunity(communityData.name, user)
        if(communityId) {
            SetCommunitiesStateValue((prev) => ({
                ...prev,
                mySnippets: prev.mySnippets.filter(
                    (it) => it.communityId !== communityId
                )
            }))
            return 
        } else {
            console.log('Could not Leave...')
        }
        
    } else {
        // joinCommunity(communityData, user)
        // .then((res) => console.log(res))
        const newSnippet = await joinCommunity(communityData, user)
        console.log('input', communityData)
        console.log('return', newSnippet)
        if(newSnippet) {
            SetCommunitiesStateValue((prev) => ({
                ...prev,
                mySnippets: [ ...prev.mySnippets, newSnippet ]
            }))
            return
        } else {
            console.log('Could not Join...')
        }

        
    }
  }

  const MySnippets = async () => {
    const res = await getMySnippets(user)
    if(res) {
        SetCommunitiesStateValue((prev) => ({
            ...prev,
            mySnippets: res
        }))
        return
    } else {
        console.log('No Snippets')
        return
    }
  }

  useEffect(() => {
    if(!user) return
    MySnippets(user)
  }, [user])


  return {
    // return data and functions
    communitiesStateValue,
    SetCommunitiesStateValue,
    JoinOrLeave
  }
}

