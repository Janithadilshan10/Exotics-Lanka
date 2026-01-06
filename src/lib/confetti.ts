import confetti from 'canvas-confetti';

// Basic confetti burst
export function fireConfetti() {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 },
    colors: ['#D4AF37', '#FFD700', '#FFF8DC', '#F5DEB3'],
  });
}

// Success confetti with multiple bursts
export function successConfetti() {
  const duration = 2000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999,
    colors: ['#D4AF37', '#FFD700', '#FFF8DC', '#F5DEB3', '#FFFFFF'],
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
    });
  }, 250);
}

// Fireworks effect
export function fireworksConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;
  const defaults = { 
    startVelocity: 30, 
    spread: 360, 
    ticks: 60, 
    zIndex: 9999,
    colors: ['#D4AF37', '#FFD700', '#FFF8DC'],
  };

  function randomInRange(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  const interval: ReturnType<typeof setInterval> = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 100 * (timeLeft / duration);
    
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.9), y: randomInRange(0.2, 0.5) }
    });
  }, 400);
}

// Stars burst for achievements
export function starsConfetti() {
  const defaults = {
    spread: 360,
    ticks: 50,
    gravity: 0,
    decay: 0.94,
    startVelocity: 30,
    colors: ['#FFD700', '#FFF8DC', '#D4AF37'],
    shapes: ['star'] as confetti.Shape[],
    zIndex: 9999,
  };

  function shoot() {
    confetti({
      ...defaults,
      particleCount: 40,
      scalar: 1.2,
      shapes: ['star'] as confetti.Shape[],
    });

    confetti({
      ...defaults,
      particleCount: 10,
      scalar: 0.75,
      shapes: ['circle'] as confetti.Shape[],
    });
  }

  setTimeout(shoot, 0);
  setTimeout(shoot, 100);
  setTimeout(shoot, 200);
}

// Cannon blast from side
export function cannonConfetti(side: 'left' | 'right' = 'left') {
  const origin = side === 'left' ? { x: 0, y: 0.5 } : { x: 1, y: 0.5 };
  const angle = side === 'left' ? 60 : 120;

  confetti({
    particleCount: 150,
    angle,
    spread: 55,
    origin,
    colors: ['#D4AF37', '#FFD700', '#FFF8DC', '#F5DEB3'],
    zIndex: 9999,
  });
}

// School pride (continuous fall from top)
export function prideConfetti() {
  const duration = 3000;
  const animationEnd = Date.now() + duration;

  (function frame() {
    confetti({
      particleCount: 2,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: 0 },
      colors: ['#D4AF37', '#FFD700', '#FFF8DC'],
      zIndex: 9999,
    });
    confetti({
      particleCount: 2,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: 0 },
      colors: ['#D4AF37', '#FFD700', '#FFF8DC'],
      zIndex: 9999,
    });

    if (Date.now() < animationEnd) {
      requestAnimationFrame(frame);
    }
  }());
}

// Heart shapes for favorites
export function heartConfetti() {
  const heart = confetti.shapeFromPath({
    path: 'M167.5,127.5 C167.5,173.5 127.5,213.5 81.5,213.5 C35.5,213.5 -4.5,173.5 -4.5,127.5 C-4.5,81.5 35.5,41.5 81.5,41.5 C127.5,41.5 167.5,81.5 167.5,127.5 Z'
  });

  confetti({
    particleCount: 100,
    spread: 100,
    startVelocity: 30,
    shapes: [heart],
    colors: ['#FF1744', '#FF5252', '#FF8A80', '#FFB3BA'],
    scalar: 0.8,
    zIndex: 9999,
  });
}

// Realistic confetti (like New Year's)
export function realisticConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    zIndex: 9999,
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#D4AF37', '#FFD700', '#FFF8DC', '#F5DEB3', '#FFFFFF'],
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });

  fire(0.2, {
    spread: 60,
  });

  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });

  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}

