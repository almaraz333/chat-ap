import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef(null);

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [roomId, setRoomId] = useState<string | undefined>();

  const navigate = useNavigate();

  useEffect(() => {
    userRef.current?.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    navigate(`/chat/${roomId}`);

    // try {
    //   const response = await axios.post(
    //     LOGIN_URL,
    //     JSON.stringify({ user, pwd }),
    //     {
    //       headers: { 'Content-Type': 'application/json' },
    //       withCredentials: true
    //     }
    //   );
    //   console.log(JSON.stringify(response?.data));
    //   //console.log(JSON.stringify(response));
    //   const accessToken = response?.data?.accessToken;
    //   const roles = response?.data?.roles;
    //   setAuth({ user, pwd, roles, accessToken });
    //   setUser('');
    //   setPwd('');
    //   setSuccess(true);
    // } catch (err) {
    //   if (!err?.response) {
    //     setErrMsg('No Server Response');
    //   } else if (err.response?.status === 400) {
    //     setErrMsg('Missing Username or Password');
    //   } else if (err.response?.status === 401) {
    //     setErrMsg('Unauthorized');
    //   } else {
    //     setErrMsg('Login Failed');
    //   }
    //   errRef.current.focus();
    // }
  };

  return (
    <div className="w-full max-w-xs flex flex-col justify-center items-center">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="mb-3 text-3xl">Sign In</h1>
      <form
        className="bg-white w-[50vw] shadow-md rounded px-8 pt-6 pb-8 mb-4 mx-56"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username"
            type="text"
            placeholder="Username"
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
          <h1 className="text-3xl font-bold my-5 text-center">Choose a room</h1>
          <div
            data-testid="rooms"
            className="bg-white flex flex-col items-center shadow-md rounded px-8 pt-6 pb-8 mb-auto mt-20"
          >
            <div className="flex justify-center">
              <div>
                <div className="form-check">
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault1"
                    value="1"
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="flexRadioDefault1"
                  >
                    1
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input appearance-none rounded-full h-4 w-4 border border-gray-300 bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="radio"
                    name="flexRadioDefault"
                    id="flexRadioDefault2"
                    value="2"
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <label
                    className="form-check-label inline-block text-gray-800"
                    htmlFor="flexRadioDefault2"
                  >
                    2
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          <a
            className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#"
          >
            Sign Up
          </a>
        </div>
      </form>
      <p className="text-center text-gray-500 text-xs">
        &copy;2020 Acme Corp. All rights reserved.
      </p>
    </div>
  );
};
