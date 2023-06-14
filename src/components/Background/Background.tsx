import React from 'react'

function Background({children}) {
  return (
    <div>
        <section>
        <div className="color"></div>
        <div className="color"></div>
        <div className="color"></div>
        <div className="box">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="container">
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Background