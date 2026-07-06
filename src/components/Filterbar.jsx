export default function FilterBar({ searchQuery, setSearchQuery, selectedCategory, setSelectedCategory }) {
  const categories = ['All', 'Luxury', 'Budget', 'Boutique', 'Resort', 'Business'];

  return (
    <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-xs mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
      <div className="relative w-full md:w-96">
        <input
          type="text"
          placeholder="Search by hotel name or city..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-4 pr-4 py-2.5 rounded-lg border border-slate-200 text-sm focus:outline-hidden focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 transition-all"
        />
      </div>
      
      <div className="flex gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}