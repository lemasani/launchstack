import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { HomePage } from './pages/home';
import { AboutPage } from './pages/about';
import { DashboardPage } from './pages/dashboard';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
