import { Header } from '@/components/crochet/header'
import { CrochetGenerator } from '@/components/crochet/crochet-generator'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-pink-200 to-pink-100 p-5">
      <div className="mx-auto max-w-[900px]">
        <Header />
        <CrochetGenerator />
      </div>
    </div>
  )
}
