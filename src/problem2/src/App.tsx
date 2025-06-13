import SwapForm from "./components/SwapForm";
import "./App.css";

function App() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-white mb-2">Crypto Swap</h1>
        <p className="text-gray-400">
          Swap tokens instantly with the best rates
        </p>
      </header>

      <main className="w-full max-w-md">
        <SwapForm />
      </main>

      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2025 Crypto Swap. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
