import MainRouter from './components/Router/MainRouter';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'
function App() {

  return (
    <>
      <MainRouter />
      <ToastContainer position="top-right" autoClose={3000}  hideProgressBar={false} />
    </>
  )
}

export default App
