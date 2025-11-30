import React, { useState, useCallback } from 'react';
import { Star, Repeat2, Zap, Search } from 'lucide-react';

// === TEMPAT ANDA AKAN MENGGANTI DENGAN API NYATA ===
// Mock data to simulate a Farcaster API response
const mockEngagementData = {
  castHash: '0x123abcde...',
  castText: 'Have you tried building anything on Farcaster yet? It\'s a lot of fun!',
  author: '@gemini-dev',
  likes: 15,
  recasts: 8,
  replies: 4,
  recentInteractions: [
    { type: 'Recast', user: '@budi', time: '1m ago' },
    { type: 'Like', user: '@siti', time: '2m ago' },
    { type: 'Like', user: '@joko', time: '5m ago' },
    { type: 'Reply', user: '@dewi', time: '10m ago' },
    { type: 'Recast', user: '@indra', time: '15m ago' },
  ],
};

// Simulated function to call the Farcaster API (MUST be replaced with actual fetch logic)
const fetchCastEngagement = (castHash) => {
  return new Promise((resolve) => {
    // Di sini, Anda akan menggunakan 'fetch' ke Farcaster Hub atau Neynar API di langkah 3.
    setTimeout(() => {
      console.log(`Simulating data retrieval for hash: ${castHash}`);
      
      if (castHash && castHash.length > 5) {
        resolve(mockEngagementData);
      } else {
        resolve({ error: "Invalid or not found Cast Hash." });
      }
    }, 1500); // 1.5 second loading
  });
};
// ===================================================

const App = () => {
  const [castHash, setCastHash] = useState('');
  const [engagement, setEngagement] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle the search process
  const handleSearch = useCallback(async (e) => {
    e.preventDefault();
    setError('');
    setEngagement(null);

    if (!castHash.trim()) {
      setError('Please enter a Cast Hash.');
      return;
    }

    setIsLoading(true);
    
    // Call the function (mocked or real API)
    const result = await fetchCastEngagement(castHash.trim());

    setIsLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setEngagement(result);
    }
  }, [castHash]);

  // Metric Card Component
  const MetricCard = ({ icon: Icon, value, label, color }) => (
    <div className={`flex flex-col items-center p-4 rounded-xl shadow-lg border ${color}`}>
      <Icon className="w-8 h-8 mb-2" />
      <span className="text-3xl font-bold">{value}</span>
      <span className="text-sm font-medium text-gray-500">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center items-start">
      <div className="w-full max-w-3xl bg-white rounded-2xl shadow-2xl p-6 sm:p-10">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-indigo-700 flex items-center">
            <Zap className="w-6 h-6 mr-2" />
            Farcaster Cast Engagement Tracker
          </h1>
          <p className="text-gray-500 mt-1">Track Likes, Recasts, and Replies for any Cast.</p>
        </header>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                <input
                  type="text"
                  value={castHash}
                  onChange={(e) => setCastHash(e.target.value)}
                  placeholder="Enter Cast Hash (e.g., 0x123abcde...)"
                  className="w-full pl-10 pr-4 p-3 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  disabled={isLoading}
                />
            </div>
            <button
              type="submit"
              className="bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-150 shadow-md disabled:bg-indigo-400"
              disabled={isLoading}
            >
              {isLoading ? 'Searching...' : 'Track Engagement'}
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-2">{error}</p>
          )}
        </form>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            <p className="ml-4 text-indigo-600 font-medium">Fetching data from Farcaster Hub...</p>
          </div>
        )}

        {/* Engagement Results */}
        {engagement && (
          <section>
            <h2 className="text-2xl font-bold mb-4 text-gray-700">Tracking Results</h2>
            
            {/* Cast Details */}
            <div className="bg-indigo-50 border-l-4 border-indigo-500 p-4 mb-6 rounded-lg shadow-inner">
              <p className="text-xs text-indigo-800 font-mono mb-2 truncate">Hash: {engagement.castHash}</p>
              <p className="text-lg font-medium text-gray-800">{engagement.castText}</p>
              <p className="text-sm text-indigo-600 mt-2">By: <span className="font-semibold">{engagement.author}</span></p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <MetricCard 
                icon={Star} 
                value={engagement.likes} 
                label="Likes (Reactions)" 
                color="border-yellow-300 bg-yellow-50 text-yellow-600"
              />
              <MetricCard 
                icon={Repeat2} 
                value={engagement.recasts} 
                label="Recasts (Shares)" 
                color="border-green-300 bg-green-50 text-green-600"
              />
              <MetricCard 
                icon={Zap} 
                value={engagement.replies} 
                label="Replies" 
                color="border-blue-300 bg-blue-50 text-blue-600"
              />
            </div>

            {/* Recent Interactions */}
            <h3 className="text-xl font-semibold mb-3 text-gray-700">Recent Interactions</h3>
            <div className="space-y-2">
              {engagement.recentInteractions.map((interaction, index) => (
                <div key={index} className="flex items-center p-3 bg-white border rounded-lg shadow-sm">
                  <span className={`p-2 rounded-full mr-3 ${
                    interaction.type === 'Like' ? 'bg-yellow-100 text-yellow-600' :
                    interaction.type === 'Recast' ? 'bg-green-100 text-green-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {interaction.type === 'Like' && <Star className="w-4 h-4" />}
                    {interaction.type === 'Recast' && <Repeat2 className="w-4 h-4" />}
                    {interaction.type === 'Reply' && <Zap className="w-4 h-4" />}
                  </span>
                  <div className="flex-grow">
                    <span className="font-medium text-gray-800">{interaction.user}</span>
                    <span className="text-sm text-gray-500 ml-2">- {interaction.type}</span>
                  </div>
                  <span className="text-xs text-gray-400">{interaction.time}</span>
                </div>
              ))}
            </div>
            
          </section>
        )}
      </div>
    </div>
  );
};

export default App;
