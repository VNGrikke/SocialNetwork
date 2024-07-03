import React from 'react'

export default function Home() {
  return (
    <div>
      <header className='flex justify-between text-center'>
        <div className='logoSearch flex gap-2'>
          logo
          <img src="" alt="" />
          <input type='text' placeholder='Search' />
        </div>
        <div>
          <nav>
            <ul className='flex gap-2'>
              <li className='w-[90px] '>Home</li>
              <li className='w-[90px] '>Friend</li>
              <li className='w-[90px] '>Video</li>
              <li className='w-[90px] '>Group</li>
            </ul>
          </nav>
        </div>
        <div>
          <ul className='flex gap-2'>
            <li>menu</li>
            <li>messenger</li>
            <li>notification</li>
            <li>account</li>
          </ul>
        </div>
      </header>
    </div>
  )
}
