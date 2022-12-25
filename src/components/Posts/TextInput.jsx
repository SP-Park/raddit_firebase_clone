import React from 'react'

export default function TextInput({ text, setText, loading, error, setError, handleCreatePost }) {
  const handleChange = (e) => {
    const { name, value } = e.target
    setError('')
    setText((it) => ({ ...it, [name]: value }))
  }
  return (
    <div className='flex flex-col w-full p-4'>
        <div className='border-2 w-full mb-2 rounded-md'>
            <input 
              placeholder='Title' 
              name='title' 
              className='text-md p-2 w-full'
              value={text.title ?? ''}
              onChange={handleChange}
            />
        </div>
        {error && <p className='text-red-500 mb-1'>{error}</p>}
        <div className='border-2 w-full mb-2 rounded-md'>
            <textarea 
              className='w-full p-2' 
              style={{ resize: 'none' }} 
              name='body' 
              placeholder='Text (Optional)'
              value={text.body ?? ''}
              onChange={handleChange}
            />
        </div>
        <div className='flex py-1 justify-end'>
            <button 
              className='bg-brand text-white rounded-full px-4 py-1 cursor-pointer'
              disabled={loading}
              onClick={handleCreatePost}
            >
              Post
            </button>
        </div>
    </div>
  )
}

