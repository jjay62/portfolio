import confetti from "canvas-confetti";

const CLICKS_NEEDED = 10;
const RESET_MS = 2800;

let clickCount = 0;
let resetTimer: ReturnType<typeof setTimeout> | null = null;

function scheduleReset() {
  if (resetTimer) clearTimeout(resetTimer);
  resetTimer = setTimeout(() => {
    clickCount = 0;
    resetTimer = null;
  }, RESET_MS);
}

function burstAt(clientX: number, clientY: number) {
  const x = clientX / window.innerWidth;
  const y = clientY / window.innerHeight;

  confetti({
    particleCount: 140,
    spread: 72,
    startVelocity: 48,
    origin: { x, y },
    scalar: 1.05,
  });
  confetti({
    particleCount: 60,
    angle: 55,
    spread: 50,
    origin: { x, y },
    colors: ["#60a5fa", "#a78bfa", "#22d3ee", "#f472b6"],
  });
  confetti({
    particleCount: 60,
    angle: 125,
    spread: 50,
    origin: { x, y },
    colors: ["#60a5fa", "#a78bfa", "#22d3ee", "#f472b6"],
  });

  const end = Date.now() + 1800;
  let last = 0;
  const tick = (t: number) => {
    if (Date.now() < end && t - last > 90) {
      last = t;
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 100,
        origin: { x: Math.random(), y: Math.random() * 0.35 },
        colors: ["#38bdf8", "#818cf8", "#34d399"],
      });
    }
    if (Date.now() < end) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}

/**
 * Call on each click on “Portfolio” (header/footer). After CLICKS_NEEDED clicks within RESET_MS, fires confetti.
 */
export function registerPortfolioClick(clientX: number, clientY: number): void {
  if (typeof window === "undefined") return;

  scheduleReset();
  clickCount += 1;

  if (clickCount < CLICKS_NEEDED) return;

  clickCount = 0;
  if (resetTimer) {
    clearTimeout(resetTimer);
    resetTimer = null;
  }

  burstAt(clientX, clientY);
}
