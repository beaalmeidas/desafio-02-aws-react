import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/appRoutes";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        {/* <CardPurchaseComponent /> */}
        <ToastContainer />
      </BrowserRouter>
    </div>
  );
}

export default App;