import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function HotelDetails() {
  const { id } = useParams();
  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80';

  useEffect(() => {
    fetch(`https://demohotelsapi.pythonanywhere.com/hotels/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not resolve property entry.');
        return res.json();
      })
      .then((resBody) => {
        // Individual detail responses are often structured cleanly at root level
        setHotel(resBody);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto px-4 py-20 animate-pulse">
        <div className="h-6 bg-slate-200 w-24 mb-6 rounded" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-64 bg-slate-200 rounded-2xl w-full" />
            <div className="h-8 bg-slate-200 rounded w-1/2" />
            <div className="h-4 bg-slate-200 rounded w-1/4" />
          </div>
          <div className="h-48 bg-slate-200 rounded-2xl w-full" />
        </div>
      </div>
    );
  }

  if (!hotel || hotel.detail) {
    return (
      <div className="text-center py-20">
        <p className="text-slate-500 mb-4">The chosen destination data sheet cannot be resolved right now.</p>
        <Link to="/" className="text-indigo-600 text-sm font-semibold underline">Return to dashboard</Link>
      </div>
    );
  }

  const formattedPrice = hotel.price 
    ? Math.round(parseFloat(hotel.price)).toLocaleString('en-IN') 
    : '2,999';

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Link to="/" className="text-xs font-semibold text-slate-500 hover:text-indigo-600 flex items-center gap-1 mb-6 transition-colors">
        ← Back to all stays
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="rounded-2xl overflow-hidden aspect-video bg-slate-100 border border-slate-100 shadow-xs">
            <img 
              src={hotel.thumbnail || fallbackImage} 
              alt={hotel.name} 
              className="w-full h-full object-cover"
              onError={(e) => { e.target.src = fallbackImage; }}
            />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-6">{hotel.name}</h1>
          <div className="flex gap-4 items-center text-sm font-medium text-slate-500 mt-2">
            <span>📍 {hotel.location || 'Premium Zone'}</span>
            <span>•</span>
            <span className="text-amber-500 font-bold">★ {hotel.rating || '4.0'} Rating</span>
          </div>

          <div className="mt-6 border-t border-slate-200 pt-6">
            <h2 className="font-bold text-slate-900 text-lg mb-3">About the space</h2>
            <p className="text-slate-600 text-sm leading-relaxed">
              {hotel.description}
            </p>
          </div>

          {/* Render image carousel grid dynamically if multi-photo sets exist */}
          {Array.isArray(hotel.photos) && hotel.photos.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="font-bold text-slate-900 text-lg mb-4">Gallery Showcase</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {hotel.photos.slice(0, 6).map((imgUrl, idx) => (
                  <div key={idx} className="aspect-square rounded-xl overflow-hidden bg-slate-50 border border-slate-100">
                    <img src={imgUrl} alt={`Room layout ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-xs sticky top-24">
            <div className="flex justify-between items-baseline mb-4">
              <span className="text-lg font-bold text-slate-900">Booking Summary</span>
              <span className="text-xs bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-sm">Available</span>
            </div>
            
            <div className="space-y-3 mb-6 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <div className="flex justify-between">
                <span>Base Rate:</span>
                <span className="font-bold text-slate-900">₹{formattedPrice}</span>
              </div>
              <div className="flex justify-between">
                <span>Taxes & Fees:</span>
                <span className="font-bold text-slate-900">₹0</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 text-sm">
                <span className="font-semibold text-slate-900">Total estimation:</span>
                <span className="font-extrabold text-indigo-600">₹{formattedPrice}</span>
              </div>
            </div>

            <button 
              onClick={() => alert('Booking simulation success! State pipeline responsive.')}
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm rounded-xl transition-all shadow-xs cursor-pointer shadow-indigo-100"
            >
              Reserve Accommodation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}