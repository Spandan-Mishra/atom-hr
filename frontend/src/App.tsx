import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Auth from './pages/Auth';
import Feedback from './pages/Feedback';
import Layout from './components/Layout';
import Tasks from './pages/Tasks';
import Dashboard from './pages/ManagerDashboard';
import Development from './components/Development';
import Ask from './pages/Ask';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route path="/" element={<Layout />}>
          <Route path='tasks' element={<Tasks />} />
          <Route path="feedback" element={<Feedback />} />
          <Route path='dashboard' element={<Dashboard />} />
          <Route path="development" element={<Development />} />
          <Route path="ask" element={<Ask />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;