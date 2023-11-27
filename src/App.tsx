import 'typeface-inter';
import 'typeface-ibm-plex-mono';

import { Camera } from 'lucide-react';
import Button from './components/Button';

function App() {

  return (
    <div className="flex justify-normal items-center w-full h-full">
      <h1 className="text-3xl font-mono font-semibold">
        Newdon!
      </h1>
      <Camera size={48} />
      <Button
        disabledStatus={false}
        label='Isso é um botão'
        variation='green'
      />
    </div>
  )
}

export default App
