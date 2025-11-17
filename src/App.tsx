import { useState } from 'react';
import LandingPage from './pages/LandingPage';
import CelebrationPage from './pages/CelebrationPage';
import FloatingElements from './pages/sections/FloatingElements';

function App() {
  const [userName, setUserName] = useState<string | null>(null);

  const handleNameSubmit = (name: string) => {
    setUserName(name);
  };

  return (
    <div className="relative min-h-screen">
      <FloatingElements />
      {!userName ? (
        <LandingPage onSubmit={handleNameSubmit} />
      ) : (
        <CelebrationPage name={userName} />
      )}
    </div>
  );
}

export default App;
