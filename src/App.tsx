import { BrowserRouter as Router, Routes, Route, Navigate  } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import ChatPage from './pages/ChatPage';
import './App.css';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/chat" replace />} />
          <Route path="chat/:chat_id?" element={<ChatPage />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
