import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../lib/firebase';

const Dashboard = () => {
  const { currentUser, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // If not loading and no user is logged in, redirect to welcome page
    if (!loading && !currentUser) {
      navigate('/');
    }
  }, [currentUser, loading, navigate]);

  // Show loading state while authentication state is being determined
  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  // If user isn't authenticated, don't render dashboard content (will redirect via useEffect)
  if (!currentUser) {
    return null;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <p className="mb-4">Welcome, {currentUser.displayName || currentUser.email}!</p>
        {/* Dashboard content will go here */}
      </div>
    </div>
  );
};

export default Dashboard;
