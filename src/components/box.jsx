import React, {useState} from 'react'

const Box = ({hide = "", children}) => {
    const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={`box ${hide}`}>
        <button className="btn-toggle" onClick={()=>setIsOpen(e=>!e)}>{isOpen ? "-" : "+"}</button>
      {isOpen && children}
    </div>
  )
}

export default Box
