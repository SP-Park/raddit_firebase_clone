import React from 'react'

function PageContent({ children }) {
  return (
    <div className='flex justify-center px-0 py-10'>
        <div className='flex justify-center w-11/12 h-full max-w-6xl'>
            {/* left Side */}
            <div className='flex flex-col w-full md:w-8/12 mr-6'>
                {children && children[0]}
            </div>
            {/* right Side */}
            <div className='hidden md:flex flex-col grow'>
             {children && children[1]}
            </div>
        </div>
    </div>
  )
}

export default PageContent