import { Provider } from 'react-redux';
import { store } from './store';
import AppRouter from './routes';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css';

function App() {
  return (
    <Provider store={store}>
      <AppRouter />
      <ToastContainer position="top-right" autoClose={3000} />
    </Provider>
  );
}

export default App;
