import axios from 'axios'

const BASE_URL = 'http://localhost:8000/';

const LOGIN_URL = 'auth/login/';


export async function logIn(email, password) {

  const options = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return await axios.post(`${BASE_URL}${LOGIN_URL}`, {email, password}, options)
      .then((response) => {
        return response
      })
      .catch(error => {
        return error
      })
}