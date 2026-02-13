import React from 'react'
import { Offers } from '../../app/utils/config'

const Component = () => {
  return (
    <div className='max-w-full md:max-w-xl bg-primary mx-auto p-10 rounded-xl my-2'>
        <h3 className="text-5xl font-bold text-center mb-9 text-white">Offers</h3> 
        <ul className='list-disc list-inside flex flex-col gap-2'>
            {Offers.map(o => (
              <li className='text-base text-white font-semibold'>{o}</li>
            ))}
        </ul>  
    </div>
  )
}

export default Component