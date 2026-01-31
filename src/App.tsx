import { CrochetGenerator } from './components/crochet';
import { Header } from './components/crochet';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-amber-50">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <CrochetGenerator />
      </main>
    </div>
  );
}
