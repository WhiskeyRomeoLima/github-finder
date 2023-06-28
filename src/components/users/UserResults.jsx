import {useContext, /*useEffect*/} from 'react'
import Spinner from '../layout/Spinner'
import UserItem from './UserItem'
import GithubContext from '../../context/github/GithubContext'

function UsersResults() {
  const {users, loading, /*fetchUsers*/} = useContext(GithubContext)
  /*
  useEffect(() => {
    fetchUsers()
  }, [])
  */

  if (!loading) {
    return (
      <div className='grid grid-cols-1 gap-8, xl:grid-cols-4'>
        {users.map((user) =>(
          <UserItem key={user.id} user={user}></UserItem> 
        ))}
      </div>
    )
  } else {
    return <Spinner />
  }

}
export default UsersResults