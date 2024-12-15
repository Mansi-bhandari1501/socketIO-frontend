import { createAsyncThunk } from "@reduxjs/toolkit";
import { userLogin } from '../../service/user.service.js';
import { ACTION_TYPE } from "./actionType.jsx";
import axios from "axios";

export const registerUser = createAsyncThunk(
ACTION_TYPE.ADD_USER,
  async ({ email, password,username }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };  
      console.log(email,password)
      const res = await axios.post(`http://localhost:8080/users`,{email,password,username},config)
      return res
    } 
    catch (error) {
      console.log(error)
        return rejectWithValue(error?.response?.data?.message);
  }}
);

export const loginUser = createAsyncThunk(
  ACTION_TYPE.SIGN_IN,
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const res = await userLogin({email,password},config);
      return res;
    } catch (error) {
        return rejectWithValue(error?.response?.data?.message);
      
      }
    }
  
);
export const userDetails = createAsyncThunk(
  ACTION_TYPE.USER_DETAILS,
  async ({formData,userId,token}, { rejectWithValue }) => {
    try {
      const res = await axios.put(`http://localhost:8080/users/userDetails/${userId}`, formData, {
        headers: {
          Authorization: token, 
          'Content-Type': 'multipart/form-data'
        }
      })      
    return res;
    } catch (error) {
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
export const fetchUsers = createAsyncThunk(
  ACTION_TYPE.GET_USER,
  async({token},{rejectWithValue})=>{
    try{

      const res = await axios.get(`http://localhost:8080/users/all`,
        {headers:{Authorization: token}}
      );
      const data = await res.data;
      return data;
    } catch (error) {
      return rejectWithValue(error);
    
    }
  }
)
export const fetchUserDetail = createAsyncThunk(
  ACTION_TYPE.GET_USERDETAIL,
  async({userId,token},{rejectWithValue})=>{
    try{
 
      const res = await axios.get(`http://localhost:8080/users/${userId}`,
        {headers:{Authorization: token}}
      );
      const data = await res.data;
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    
    }
  }
)
export const fetchLoggedInUserDetail = createAsyncThunk(
  ACTION_TYPE.GET_LoggedIn_USERDETAIL,
  async({userId,token},{rejectWithValue})=>{
    try{
 
      const res = await axios.get(`http://localhost:8080/users/${userId}`,
        {headers:{Authorization: token}}
      );
      const data = await res.data;
      console.log(data)
      return data;
    } catch (error) {
      return rejectWithValue(error);
    
    }
  }
)
