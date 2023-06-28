import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import GithubContext from '../context/github/GithubContext'

function User() { 
  const {getUser, user} = useContext(GithubContext)
  console.log(user) //* sadly user is undefined
  const params = useParams()

  useEffect(
    () => {
      getUser(params.login)
    }, [])

  return (
    <div>USER Component</div>
  )
}
export default User