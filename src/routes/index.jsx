import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from '../pages/Login/login';
import Signuppage from '../pages/Signup/sign-up';
import ChatPage from '../components/Chat/chat';
import { socket } from '../App';

const Router = () => {
  const token = useSelector((state) => state?.user?.userToken);

  return (
    <div>
      <BrowserRouter>
        <Routes>
          {!token ? (
            <>
              <Route path='/login' element={<LoginPage />} />
              <Route path='/signup' element={<Signuppage />} />
              <Route path='*' element={<Navigate to='/login' />} /> 
            </>
          ) : (
            <>
              <Route path='/' element={<ChatPage socket={socket} /> } Navigate={!token && <LoginPage />} />
              <Route path='*' element={<Navigate to='/' />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Router;
