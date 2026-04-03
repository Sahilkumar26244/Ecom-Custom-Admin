import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Dashboard from './pages/Dashboard';
import ProductList from './pages/ProductList';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Toaster 
        position="top-right" 
        toastOptions={{
          className: 'font-jost text-sm font-medium rounded-xl border border-stone-100 shadow-xl',
          duration: 3000,
        }}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/settings" element={<Settings />} />
          {/* Add more routes here */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
