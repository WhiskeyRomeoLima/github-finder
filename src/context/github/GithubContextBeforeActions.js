import {createContext, useReducer} from 'react'
import githubReducer from './GithubContextOld'

const GithubContext = createContext()

const url   = process.env.REACT_APP_GITHUB_URL
const token = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  }

  const [state, dispatch] = useReducer(githubReducer, initialState)

  const clearUsers = () => dispatch({type: 'CLEAR_USERS'})

  const setLoading = () => dispatch({type: 'SET_LOADING'})
  //Search users based on input
  const searchUsers = async (text) => {
    setLoading(false)

    const params = new URLSearchParams({q: text})

    const response = await fetch(
      `${url}/search/users?${params}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })

      const {items}= await response.json()

      dispatch({
        type: 'GET_USERS',
        payload: items
      })
  } //search users

    //Get a single user 
    const getUser = async (login) => {
      setLoading()

      const response = await fetch(`${url}/users/${login}`, //url = process.env.REACT_APP_GITHUB_URL
      {
          headers: {
            Authorization: `token ${token}`
          }
        })

        if (response === 404) {
          window.location = '/notfound'
        } else {
            const data = await response.json()
            dispatch({
              type: 'GET_USER',
              payload: data
            })
        }

    } //get user

  return ( 
  <GithubContext.Provider
    value={{
      users: state.users,
      loading: state.loading,
      user: state.user,
      repos: state.repos,
      getUser,
      searchUsers,
      clearUsers,
      getUserRepos
    }}
  >
    {children}
  </GithubContext.Provider>
  )

} //GithubProvider

export default GithubContext