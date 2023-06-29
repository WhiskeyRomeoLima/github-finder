import {createContext, useReducer} from 'react'
import githubReducer from './GithubReducer'

const GithubContext = createContext()

const url   = process.env.REACT_APP_GITHUB_URL
const token = process.env.REACT_APP_GITHUB_TOKEN

export const GithubProvider = ({children}) => {
  const initialState = {
    users: [],
    user: {},
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
      console.log('login: ', login);
      const response = await fetch(`${url}/users/${login}`, //url = process.env.REACT_APP_GITHUB_URL
      {
          headers: {
            Authorization: `token ${token}`
          }
        })
      console.log(response);
        if (response === 404) {
          window.location = 'not found'
        } else {
            const {data}= await response.json()
            dispatch({
              type: 'GET_USER',
              payload: data
            })
        }

    } //search users

  return ( 
  <GithubContext.Provider
    value={{
      users: state.users,
      loading: state.loading,
      user: state.user,
      getUser,
      searchUsers,
      clearUsers
    }}
  >
    {children}
  </GithubContext.Provider>
  )

} //GithubProvider

export default GithubContext