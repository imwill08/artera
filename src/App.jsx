import './App.css'
import Routes from "./Routes/Routes";
import { RouterProvider } from 'react-router-dom'

function App() {

  return (
    <>
      <RouterProvider router={Routes} />
    </>
  )
}

export default App
