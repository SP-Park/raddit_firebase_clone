import React from 'react'
import { useRecoilState } from 'recoil'
import { postState } from '../atoms/posts'

export default function usePost() {
  const [postStateValue, setPostStateValue] = useRecoilState(postState)

  const ControlVote = async() => {}

  const onSelect = async() => {}

  const onDelete = async() => {}

  return {
    postStateValue,
    setPostStateValue
  }
}

