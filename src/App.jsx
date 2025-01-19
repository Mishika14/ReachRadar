import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Frontpage from './pages/Frontpage';
import FileUpload from './pages/FileUpload'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Frontpage />} />
                <Route path="/file-upload" element={<FileUpload />} />
            </Routes>
        </Router>
    );
};

export default App;
