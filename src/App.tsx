import './App.css';
import { Routes, Route } from 'react-router-dom';
import MessageList from './containers/MessageList/MessageList';
import ShowCountries from './containers/showCountriesPage/showCountries';

function App() {
  return (
    <div  >
      <Routes>
        <Route path="/" element={<MessageList />} />
        <Route path="countries" element={<ShowCountries />} />
      </Routes>
    </div>

  );
}

export default App;
