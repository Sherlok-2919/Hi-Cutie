import { useState } from 'react';
import LandingPage from './components/LandingPage';
import CelebrationPage from './components/CelebrationPage';
import FloatingElements from './components/FloatingElements';

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
