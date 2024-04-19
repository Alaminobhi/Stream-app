

import Link from 'next/link';
import React from 'react';

const Nav = () => {
    return (
        <div className='shadow-2xl'>
            <div className="grid gap-4 md:gap-6 grid-cols-5 bg-black text-white">
                <Link className='text-white hover:text-lime-500' href="/">Home</Link>
                <Link className='text-white hover:text-lime-500' href={'/livestreaming'}>Live Stream</Link>
                <Link className='text-white hover:text-lime-500' href={'/studio'}> Studio </Link>
                <Link className='text-white hover:text-lime-500' href={'/videos-list'}> Videos list</Link>
                <Link className='text-white hover:text-lime-500' href={'/radios'}> Radio play</Link>
            
            </div>

        </div>
    );
};

export default Nav;