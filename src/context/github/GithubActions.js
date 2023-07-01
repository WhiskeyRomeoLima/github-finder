//import axios from 'axios'
const url = process.env.REACT_APP_GITHUB_URL
const token = process.env.REACT_APP_GITHUB_TOKEN

// Get search results
export const searchUsers = async (text) => {

    const params = new URLSearchParams({q: text})

    const response = await fetch(
      `${url}/search/users?${params}`, {
        headers: {
          Authorization: `token ${token}`
        }
      })

      const {items}= await response.json()

      return items
  } //search users


//Get a single user 
export const getUser = async (login) => {

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
        return data
    }

  } //get user
  
  export const getUserRepos = async (login) => {

    const params = new URLSearchParams({
      sort: 'created',
      per_page: 10,
    })
    const response = await fetch(`${url}/users/${login}/repos?${params}`, //url = process.env.REACT_APP_GITHUB_URL
  {
      headers: {
        Authorization: `token ${token}`
      }
    })

    if (response === 404) {
      window.location = '/notfound'
    } else {
        const data = await response.json()
        return data
    }
  }