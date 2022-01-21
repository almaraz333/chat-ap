import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from 'firebase/auth';
import { useSetRecoilState } from 'recoil';
import { userAuthTokenState, userInfoState } from '../../atoms';

import { RegisterProps } from './types';

export const Register: React.FC<RegisterProps> = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [userName, setUserName] = useState('');

  const navigate = useNavigate();

  const setUserAuthToken = useSetRecoilState(userAuthTokenState);
  const setUserInfo = useSetRecoilState(userInfoState);

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const authentication = getAuth();

      await createUserWithEmailAndPassword(authentication, user, pwd);

      navigate(`/`);
    } catch (err) {
      throw new Error('Authentication failed');
    }
  };

  return (
    <div className="w-full max-w-xs flex flex-col justify-between items-center h-screen">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-5xl">Register</h1>
      <form
        className="bg-white w-[50vw] shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-56"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Email"
            ref={userRef}
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="******************"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
          />
          <p className="text-red-500 text-xs italic">
            Please choose a password.
          </p>
        </div>
        <div className="flex items-center justify-end">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2022 Colton Almaraz. All rights reserved.
      </p>
    </div>
  );
};
