import React, { useRef } from 'react'

export default function ImageUpload({ selectedFile, setSelectedFile, setSelectedTab, onSelectImage }) {
  const selectedFileRef = useRef()   
  return (
    <div className='flex items-center justify-center w-full p-4'>
        {selectedFile ? (
            <div className='flex flex-col items-center'>
                <img alt='upload' src={selectedFile} maxwidth='400px' maxheight='400px' />
                <div className='mt-4'>
                    <button 
                        className='mr-2 text-white bg-brand border-2 border-brand font-bold rounded-full py-1 px-4'
                        onClick={() => setSelectedTab('Post')}
                    >
                        Back to Post
                    </button>
                    <button 
                        className='text-brand border-2 border-brand font-bold rounded-full py-1 px-4'
                        onClick={() => setSelectedFile('')}
                    >
                        Remove
                    </button>
                </div>
            </div>
        ) : (
            <div className='flex items-center justify-center p-20 border-2 border-dashed border-gray-300 w-full rounded-md'>
                <button 
                    className='text-brand border-2 border-brand font-bold rounded-full py-1 px-4'
                    onClick={() => selectedFileRef.current?.click()}    
                >
                    Upload
                </button>
                <input type='file' ref={selectedFileRef} hidden onChange={onSelectImage} />
            </div>
        )}
    </div>
  )
}

