import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import RegisterForm from './form_register';
import LoginForm from './form_connection';
import Dashboard from './Dashboard'; 
import Navbar from './NavBar';
import PrivateRoute from './PrivateRoute'; 
import Home from './Home';
import About from './About';
import AllBooks from './AllBooks';
import BookInfo from './BookInfo';
import BooksManagement from './BooksManagement';
import BookManageForm from './BookManageForm';
import BookRegisterForm from './BookRegisterForm';


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<AllBooks />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/about" element={<About />} />
        <Route path="/allbooks" element={<AllBooks />} />
        <Route path="/bookinfo" element={<BookInfo />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

      <Route path="/admin/books" element={<BooksManagement/>}/>
      <Route path="/admin/manageBook" element={<BookManageForm/>}/>
      <Route path="/admin/registerBook" element={<BookRegisterForm/>}/>

      
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
