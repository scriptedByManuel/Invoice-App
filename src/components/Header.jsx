import React from 'react'
import Container from './Container'
import useUserStore from '../stores/useUserStore'
import { each } from 'lodash'

const Header = () => {
    const {user: {name, email, profile_image}} = useUserStore()
    return (
        <header className='mb-5'>
            <Container>
                <div className='flex items-center justify-between'>
                    <div>
                        <h1 className='text-3xl font-bold text-blue-600'>MMS Solutions</h1>
                        <p className='text-stone-500'>Voucher App</p>
                    </div>
                    <div className="flex items-center space-x-3 p-2 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
                        <img
                            src={
                                profile_image
                                    ? profile_image
                                    :"https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"
                            }
                            alt={`${name || "User"} profile`}
                            className="w-10 h-10 rounded-full object-cover border border-gray-300"
                        />

                        <div className="flex flex-col">
                            <p className="font-medium text-gray-900 leading-tight">{name || "Guest User"}</p>
                            <p className="text-sm text-gray-600 truncate w-40">{email || "guest@example.com"}</p>
                        </div>
                    </div>

                </div>
               
            </Container>
        </header>
    ) 
}

export default Header