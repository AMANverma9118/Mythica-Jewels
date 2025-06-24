import React from 'react'
import { useParams } from 'react-router-dom'

function User() {
    const {id} = useParams();
  return (
    <div className='bg-gray-600 text-6xl p-6 text-center'>
      User: {id}
    </div>
  )
}

export default User
