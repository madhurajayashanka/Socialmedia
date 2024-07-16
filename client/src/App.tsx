import React from 'react';
import PostList from './components/PostList';
import Navbar from './components/Navbar';

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            <Navbar />
            <div className="container mx-auto p-4">
                <PostList />
            </div>
        </div>
    );
};

export default App;
