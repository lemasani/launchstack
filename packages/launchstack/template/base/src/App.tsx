import reactlogo  from '@/assets/react.svg'
export function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1e1b4b]">
      <div className="text-center">
        <div className="flex items-center justify-between mb-20">
          <img src="./launchstack_icon.svg" alt="LaunchStack Icon" className="w-32 h-32" />
          <img src={reactlogo} alt="React Logo" className="w-32 h-32" />
        </div>
        <h1 className="text-4xl text-primary font-bold mb-4">Welcome to LaunchStack + React</h1>
        <p className="text-muted-foreground">
          Edit <code className="bg-muted px-2 py-1 rounded">src/App.tsx</code> and save to reload.
        </p>
      </div>
    </div>
  );
}

export default App;