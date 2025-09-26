import { useState, useEffect } from 'react';
import catSvg from '../assets/images/cat.svg';
import { useAnimation } from '../hooks/useAnimation';
import '../styles/animations.css';

const DancingCat = () => {
  const { isAnimating, toggleAnimation } = useAnimation(false);
  const [danceCount, setDanceCount] = useState(0);
  const [showHearts, setShowHearts] = useState(false);

  useEffect(() => {
    if (isAnimating) {
      setDanceCount(prev => prev + 1);
      setShowHearts(true);

      const heartTimer = setTimeout(() => {
        setShowHearts(false);
      }, 3000);

      return () => clearTimeout(heartTimer);
    }
  }, [isAnimating]);

  const handleKeyPress = (event) => {
    if (event.key === ' ' || event.key === 'Enter') {
      event.preventDefault();
      toggleAnimation();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div className="dancing-cat-container">
      <div className="cat-stage">
        <img
          src={catSvg}
          alt="Dancing Cat"
          className={`dancing-cat ${isAnimating ? 'animate' : ''}`}
          role="img"
          aria-label="A cute orange cat that dances when activated"
        />
        {showHearts && (
          <div className="floating-hearts">
            <span>💖</span>
            <span>💕</span>
            <span>💗</span>
          </div>
        )}
      </div>

      <div className="controls">
        <button
          className="dance-button"
          onClick={toggleAnimation}
          onKeyDown={handleKeyPress}
          aria-label={isAnimating ? 'Stop cat dancing animation' : 'Start cat dancing animation'}
          role="button"
          tabIndex="0"
        >
          {isAnimating ? '🛑 Stop Dancing' : '💃 Start Dancing'}
        </button>

        <div className="dance-counter">
          <p>Dance sessions: {danceCount}</p>
        </div>
      </div>

      <div className="title">
        <h1>🐱 Dancing Cat Party! 🎉</h1>
        <p>Click the button or press spacebar to make the cat dance!</p>
        <div className="instructions">
          <small>
            ⌨️ Keyboard controls: Space or Enter to toggle
            <br />
            📱 Mobile friendly • 🌙 Dark mode ready
          </small>
        </div>
      </div>
    </div>
  );
};

export default DancingCat;