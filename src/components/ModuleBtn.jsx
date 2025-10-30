import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({ name, icon, url }) => {
    return (
        <Link to={url} className='flex flex-col items-center gap-3 bg-blue-600 text-white p-5 rounded-lg'>
            <div>{icon}</div>
            <div>{name}</div>
        </Link>
    )
}

export default ModuleBtn