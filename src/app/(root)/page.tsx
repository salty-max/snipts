import { EditorPanel } from "./_components/editor-panel"
import { Header } from "./_components/header"
import { OutputPanel } from "./_components/output-panel"

const Home = () => {
  return (
    <div className="max-w-[1800px] mx-auto p-4">
      <Header />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <EditorPanel />
        <OutputPanel />
      </div>
    </div>
  )
}

export default Home
