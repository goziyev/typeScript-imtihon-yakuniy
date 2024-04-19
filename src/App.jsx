import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import ProductDetail from "./pages/ProductDetail";
import Header from "./components/Header";
import ErrorPage from "./pages/Error";
import { createContext, useState } from "react";
export const DataContext = createContext();

function App() {
  const [type, setType] = useState(localStorage.getItem("type") || "usd");
  const [listItems, setItems] = useState(
    JSON.parse(localStorage.getItem("cardData")) || []
  );
  console.log(listItems, 15);
  return (
    <DataContext.Provider value={[type, setType, listItems, setItems]}>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/crypto/:crypto" element={<ProductDetail />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </DataContext.Provider>
  );
}

export default App;
