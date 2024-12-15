import { axiosApi } from '../config'
import  axios from "axios"
const PATHS = {
  signup: '/users/register',
  signin: '/users/login'
}

export const userLogin = async (payload )=> await  axios.post('http://localhost:8080/users/login', payload)
export const userRegister = async (payload) => await axios.post('http://localhost:8080/users/register', payload)
   