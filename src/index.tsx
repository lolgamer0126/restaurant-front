import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Test from './routes/test'
import Create from './create'
import Admin from './admin'
import Restaurant from './restaurantDetail';
import EditRestaurant from './editRestaurant';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ChakraProvider>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="test" element={<Test />} /> 
          <Route path="/create" element={<Create />} />    
          <Route path="/admin" element={<Admin />} /> 
          <Route path="/restaurant/:id" element={<Restaurant/>} />
          <Route path ="/edit/:id" element={<EditRestaurant/>} />
        </Routes>
      </ChakraProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
