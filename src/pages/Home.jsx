import { useState, useEffect } from 'react';
import FilterBar from '../components/FilterBar';
import HotelCard from '../components/HotelCard';

export default function Home() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    fetch('https://demohotelsapi.pythonanywhere.com/hotels/')
      .then((res) => {
        if (!res.ok) throw new Error('Data delivery stream experienced problems.');
        return res.json();
      })
      .then((resBody) => {
        // Pointing exactly to the "data" array key from your payload
        setHotels(Array.isArray(resBody.data) ? resBody.data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredHotels = hotels.filter((hotel) => {
    const searchString = searchQuery.toLowerCase();
    const hotelName = hotel.name || '';
    const hotelLocation = hotel.location || '';
    
    const matchesSearch = 
      hotelName.toLowerCase().includes(searchString) ||
      hotelLocation.toLowerCase().includes(searchString);
    
    // Convert string prices like "3017.74" cleanly to float comparisons
    const hotelPrice = parseFloat(hotel.price) || 0;
    const hotelRating = hotel.rating || 0;

    // Smart context categories since mock backends don't always tag category arrays
    const matchesCategory = 
      selectedCategory === 'All' || 
      (selectedCategory === 'Luxury' && hotelRating >= 4.5) ||
      (selectedCategory === 'Budget' && hotelPrice <= 3500) ||
      (selectedCategory === 'Resort' && hotelName.toLowerCase().includes('cascade')) ||
      (selectedCategory === 'Boutique' && hotelName.toLowerCase().includes('nebula'));

    return matchesSearch && matchesCategory;
  });

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 text-center py-20">
        <div className="bg-red-50 border border-red-100 rounded-xl p-6 inline-block max-w-md">
          <p className="text-red-600 text-sm font-medium">Failed to fetch hotel listings: {error}</p>
          <button onClick={() => window.location.reload()} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg text-xs font-semibold cursor-pointer">
            Reload Interface
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">Find your next stay</h1>
        <p className="mt-2 text-sm text-slate-500 font-medium">Explore clean, verified accommodations at budget friendly rates.</p>
      </div>

      <FilterBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="animate-pulse bg-white border border-slate-100 rounded-xl h-80">
              <div className="bg-slate-200 h-44 w-full rounded-t-xl" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-slate-200 rounded w-1/3" />
                <div className="h-6 bg-slate-200 rounded w-3/4" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : filteredHotels.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-xl border border-dashed border-slate-200">
          <p className="text-slate-400 text-sm">No properties match your filters or searching parameters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredHotels.map((hotel) => (
            <HotelCard key={hotel.id} hotel={hotel} />
          ))}
        </div>
      )}
    </div>
  );
}