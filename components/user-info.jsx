import React from 'react'

const UserInfo =  () => {
    // console.log(data)
    const isUserDataStored = JSON.parse(sessionStorage.getItem("andamo-user"))
    const username = isUserDataStored?.displayName;


    if(isUserDataStored) return <div className="">
       <span>Welcome, {username?.split(' ')[0]}!</span> 
    </div>
  return (
    
    <div>
        sign in
    </div>
  )
}

export default UserInfo