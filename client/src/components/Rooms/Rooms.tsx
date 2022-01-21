import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userAuthTokenState } from '../../atoms';
import { RoomsProps } from './types';

export const Rooms: React.FC<RoomsProps> = () => {
  const [roomId, setRoomId] = useState<string | null>(null);

  const setUserAuthToken = useSetRecoilState(userAuthTokenState);

  const navigate = useNavigate();

  const handleClick = () => {
    if (roomId) navigate(`/chat/${roomId}`);
  };

  const handleLogout = () => {
    setUserAuthToken(null);
    navigate(`//`);
  };

  return (
    <div className="flex flex-col w-[50vw] h-screen">
      <h1 className="text-3xl font-bold my-5 text-center">Choose a room</h1>
      <div
        data-testid="rooms"
        className="bg-white flex flex-col justify-center shadow-md rounded px-8 pt-6 pb-3 mb-auto mt-5"
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
        <div className="flex justify-between items-center">
          <button
            className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogout}
          >
            Log Out
          </button>
          <button
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:bg-blue-200"
            type="button"
            disabled={!roomId}
            onClick={handleClick}
          >
            Enter Room
          </button>
        </div>
      </div>
    </div>
  );
};
