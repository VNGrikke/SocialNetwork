import React from 'react'

export default function FriendSuggest() {
    return (
        <div>
            <li className='flex justify-between'>
                <div className='flex'>
                    <div className='h-[48px] w-[48px] avatar leading-[48px]'>
                        <i className="fa-solid fa-user"></i>
                    </div>
                    <div>
                        <h2>Nick name</h2>
                        <p>actual name</p>
                    </div>
                </div>
                <div className='leading-[48px] text-xs text-blue-600 hover:text-blue-100 cursor-pointer'>Theo dõi</div>
            </li>
        </div>
    )
}
