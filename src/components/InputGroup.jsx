import React from 'react'
import cls from "classnames";

export default function InputGroup({ type, placeholder, value, setValue, error, name, setCharsRemaining }) {
  
  const handleChange = (e) => {
    if(e.target.value.length > 21) return
    setValue(e.target.value)
    setCharsRemaining(21 - e.target.value.length)
  }
  
  return (
    <div className='mb-2'>
        <input 
            type={type} 
            name={name}
            style={{ minWidth: 300 }}
            className={cls(`w-full py-2 px-3 transition duration-200 border border-gray-400 rounded bg-gray-50 focus:bg-white hover:bg-white hover:border-brand hover:border-2`,
            { "border-red-500": error }
            )}
            placeholder={placeholder}
            value={value}
            onChange={setCharsRemaining ? handleChange : ((e) => setValue(e.target.value))}
        />
        <small className='font-medium text-red-500'>{error}</small>
    </div>
  )
}

