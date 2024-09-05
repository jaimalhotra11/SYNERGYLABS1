import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserList from './Components/UserList.js';
import EditUser from './Components/EditUser.js';
import CreateUser from './Components/CreateUser.js';





const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<UserList />} />
                <Route path="/create" element={<CreateUser />} />
                <Route path="/edit/:id" element={<EditUser />} />
            </Routes>
        </Router>
    );
};

export default App;
