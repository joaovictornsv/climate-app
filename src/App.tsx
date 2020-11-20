import React from 'react';
import { LocationProvider } from './contexts/LocationContext';
import Landing from './pages/Landing';

import './styles/global.css'

function App() {
  return (
    <LocationProvider>
      <Landing />
    </LocationProvider>
  );
}

export default App;
