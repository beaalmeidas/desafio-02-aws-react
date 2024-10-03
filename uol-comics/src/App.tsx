import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./routes/appRoutes";
// import CardPurchaseComponent from './components/CardPurchaseComponent';
// import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppRoutes />
        { /* <CardPurchaseComponent />}
        {/* <ToastContainer /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;