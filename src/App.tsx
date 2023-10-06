import 'typeface-inter';
import 'typeface-ibm-plex-mono';

import { Camera } from 'lucide-react';

function App() {

  return (
    <div className="flex justify-normal items-center w-full h-full">
      <h1 className="text-3xl font-mono font-semibold">
        Hello world!
      </h1>
      <Camera size={48} />
    </div>
  )
}

export default App
