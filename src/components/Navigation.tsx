import React from 'react'
import { Link } from 'react-router-dom'
import Search from './Search'

export default function Navigation() {
    return (
        <div className='fixed left-0 top-0 w-full flex justify-between items-center h-14 bg-blue-400 shadow-md' >
            <div className="container flex justify-between items-center px-5 mx-auto">
                <div className="logo font-bold text-white">
                    <Link to="/">My Weather</Link>
                </div>
                <Search/>
                <div className="navigation text-white">
                    <Link to="/auth">Войти</Link>
                </div>
            </div>

        </div>
    )
}
