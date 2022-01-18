import { Route, Routes } from 'react-router-dom';
import { Chat, Login } from './components';
import { Layout } from './Layout';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Login />} />
        <Route path="chat" element={<Chat />} />

        <Route path="*" element={<h1>Nothing here</h1>} />
      </Route>
    </Routes>
  );
}

export default App;
