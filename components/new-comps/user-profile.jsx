import React from 'react'

const UserProfile = () => {
    return (
        <div className='p-5'>
            <div className='rounded-[100%] p-20'>User</div>
            <div className="flex flex-col gap-y-6">
                <div className="flex gap-x-3">
                <p>Name:</p> <p>Username</p> </div>
                <div className="flex gap-x-3">
                <p>Email:</p> <p>Username</p> </div>
                <div className="flex gap-x-3">
                <p>Date registered:</p> <p>Username</p> </div>
            </div>
        </div>
    )
}

export default UserProfile
