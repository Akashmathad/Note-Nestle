import { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../../App';

function Login() {
  const { register, handleSubmit } = useForm();
  const { storeUserAndJwt, openLogin } = useContext(AuthContext);

  async function onSubmit(data) {
    const req = await fetch(
      'http://localhost:3000/api/v1/note-nestle/auth/Login',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    const data1 = await req.json();
    console.log(data1);
    storeUserAndJwt(data1.data, data1.token);
    openLogin(false);
  }

  return (
    <div style={{ position: 'absolute', top: 0, left: 0 }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          {...register('collegeId')}
          placeholder="Enter your college Id"
          required
        />
        <input
          type="password"
          {...register('password')}
          placeholder="Enter your password"
          required
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
