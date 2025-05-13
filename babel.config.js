module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          alias: {
            '@': './'
          },
          extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json']
        }
      ]
    ]
  };
};

// Example for any API calls in your app
const fetchData = async () => {
  try {
    // Show loading state
    setIsLoading(true);
    const response = await fetch('https://api.example.com/data');
    
    // Check if response is OK
    if (!response.ok) {
      throw new Error(`Server error: ${response.status}`);
    }
    
    const data = await response.json();
    // Process data
    return data;
  } catch (error) {
    // Better error handling
    console.error('API error:', error);
    // Show user-friendly error message
    setError('Failed to load data. Please try again later.');
    return null;
  } finally {
    // Always hide loading state
    setIsLoading(false);
  }
};

// In any component with subscriptions or timers:
useEffect(() => {
  let isMounted = true;
  
  const loadData = async () => {
    try {
      const result = await fetchSomeData();
      // Only update state if component is still mounted
      if (isMounted) {
        setData(result);
      }
    } catch (error) {
      if (isMounted) {
        setError(error);
      }
    }
  };
  
  loadData();
  
  // Cleanup function to avoid memory leaks
  return () => {
    isMounted = false;
  };
}, []);