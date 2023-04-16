import React, { Component } from 'react'
import loading from './spinner.gif'
const Spinner = () => {

    return (
        <div className='text-center'>
            <img height='50px' src={loading} alt="loading" />
        </div>
    )

}

export default Spinner
