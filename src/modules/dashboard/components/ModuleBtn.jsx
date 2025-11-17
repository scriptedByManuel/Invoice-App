import React from 'react'
import { Link } from 'react-router-dom'

const ModuleBtn = ({ name, icon, url }) => {
    return (
        <Link
            to={url}
            className="
                flex flex-col items-center justify-center gap-4
                bg-card border border-border
                text-foreground
                p-6 rounded-xl shadow-sm
                hover:bg-accent hover:shadow-md
                active:scale-[0.98]
                transition-all duration-200
                cursor-pointer select-none
                font-medium
            "
        >
            <div className="text-primary">{icon}</div>
            <div className="text-lg tracking-wide">{name}</div>
        </Link>
    )
}

export default ModuleBtn
