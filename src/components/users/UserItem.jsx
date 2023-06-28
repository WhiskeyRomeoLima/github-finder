import {Link} from 'react-router-dom'

function UserItem({user : {login, avatar_url} } ) { 
// or {user} in argument and on separate line below: const {login, avatar_url} = user
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'></div>
        <div>
          <div className='avatar'>
            <div className='rounded-full shadow w-14 h-14'>
              <img src={avatar_url} alt='Profile' />
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'></h2>
          <Link className='text-base-content text-opacity-40' to={`/user/${login}`} >
            Visit Profile
          </Link>
        </div>
       
    </div>
  )
}
export default UserItem