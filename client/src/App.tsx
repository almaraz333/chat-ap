import { Route, Routes } from 'react-router-dom';
import { Chat, Login, RequireAuth, Rooms } from './components';
import { Layout } from './Layout';

import { initializeApp } from 'firebase/app';
import { Register } from './components/Register';

initializeApp({
  apiKey: 'AIzaSyDsejbhvfWPJs1RHf-VrC9NHq7y2AzYj8s',

  authDomain: 'chat-app-96aa6.firebaseapp.com',

  projectId: 'chat-app-96aa6',

  storageBucket: 'chat-app-96aa6.appspot.com',

  messagingSenderId: '480218388726',

  appId: '1:480218388726:web:ec950baafcbf097ffb74d7'
});

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<RequireAuth />}>
          <Route path="chat/:roomId" element={<Chat />} />
          <Route path="rooms" element={<Rooms />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
