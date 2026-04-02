import { createSignal } from 'solid-js';
import './App.css';

function App() {
  const [count, setCount] = createSignal(0);

  return (
    <main class="app">
      <h1>Bread Recipes</h1>
      <p class="lede">
        SolidJS + Vite scaffold (PLAN §4.1). Replace this with the real UI in
        later tasks.
      </p>
      <button
        type="button"
        class="counter"
        onClick={() => setCount((c) => c + 1)}
      >
        Count is {count()}
      </button>
    </main>
  );
}

export default App;
