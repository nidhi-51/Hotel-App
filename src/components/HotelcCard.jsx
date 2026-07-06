import { Link } from 'react-router-dom';

export default function HotelCard({ hotel }) {
  const fallbackImage = 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80';
  
  // Format numeric strings cleanly (e.g., "3017.74" -> "3,017")
  const formattedPrice = hotel.price 
    ? Math.round(parseFloat(hotel.price)).toLocaleString('en-IN') 
    : '2,999';

  return (
    <div className="group bg-white rounded-xl border border-slate-100 overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col">
      <div className="relative aspect-video w-full overflow-hidden bg-slate-100">
        <img 
          src={hotel.thumbnail || fallbackImage} 
          alt={hotel.name}
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
          onError={(e) => { e.target.src = fallbackImage; }}
        />
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs px-2.5 py-1 rounded-md text-xs font-bold text-slate-800 shadow-2xs">
          ★ {hotel.rating ? hotel.rating.toFixed(1) : '4.0'}
        </div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-xs font-semibold text-indigo-600 uppercase tracking-wider mb-1">
            📍 {hotel.location || 'Destination'}
          </div>
          <h3 className="font-bold text-slate-900 text-base leading-snug mb-2 group-hover:text-indigo-600 transition-colors">
            {hotel.name}
          </h3>
          <p className="text-slate-500 text-xs line-clamp-2 mb-4 leading-relaxed">
            {hotel.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <div>
            <span className="text-lg font-extrabold text-slate-900">₹{formattedPrice}</span>
            <span className="text-slate-400 text-xs"> / night</span>
          </div>
          <Link 
            to={`/hotel/${hotel.id}`} 
            className="text-xs font-semibold bg-slate-50 text-slate-700 px-3.5 py-2 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-all cursor-pointer"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
}