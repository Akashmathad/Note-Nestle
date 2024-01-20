import Homepage from './pages/Homepage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Teacherpage from './pages/Teacherpage';
import Adminpage from './pages/Adminpage';
import AboutUspage from './pages/AboutUspage';
import PageNotFoundpage from './pages/PageNotFoundpage';
import { createContext, useEffect, useState } from 'react';

export const AuthContext = createContext();
function App() {
  const [user, setUser] = useState();
  const [jwt, setJwt] = useState();
  const [login, openLogin] = useState(false);

  useEffect(function () {
    async function verify() {
      const jwt = localStorage.getItem('jwt');
      const req = await fetch('http://localhost:3000/api/v1/note-nestle/auth', {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          authorization: `Bearer ${jwt}`,
        },
      });
      if (req.status === 401) {
        return openLogin(true);
      }
      setUser(JSON.parse(localStorage.getItem('user')));
      setJwt(localStorage.getItem('jwt'));
    }
    verify();
  }, []);

  function storeUserAndJwt(user, token) {
    console.log(user, token);
    const newUser = JSON.stringify(user);
    localStorage.setItem('user', newUser);
    localStorage.setItem('jwt', token);
  }

  console.log(user, jwt);
  return (
    <BrowserRouter>
      <AuthContext.Provider
        value={{
          user,
          setUser,
          jwt,
          setJwt,
          storeUserAndJwt,
          login,
          openLogin,
        }}
      >
        <Routes>
          <Route index element={<Homepage />} />
          <Route path="teacher" element={<Teacherpage />} />
          <Route path="admin" element={<Adminpage />} />
          <Route path="aboutus" element={<AboutUspage />} />
          <Route path="*" element={<PageNotFoundpage />} />
        </Routes>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
