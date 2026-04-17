import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import ReportItem from './pages/ReportItem';
import BrowseItems from './pages/BrowseItems';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="report-lost" element={<ReportItem type="lost" />} />
          <Route path="report-found" element={<ReportItem type="found" />} />
          <Route path="browse" element={<BrowseItems />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
