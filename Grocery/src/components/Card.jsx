import React from "react";

const Card = () => {
  return (
    <div className="relative flex flex-col my-3 bg-white shadow-sm border border-slate-200 rounded-lg w-64 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative p-2 h-56 overflow-hidden rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1567306226416-28f0efdc88ce?auto=format&fit=crop&w=927&q=80"
          alt="Fresh Apples"
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="p-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-base font-semibold">Fresh Apples</p>
          <p className="text-cyan-600 text-base font-semibold">$4.99/kg</p>
        </div>
        <p className="text-slate-600 text-xs leading-snug font-light">
          Juicy and fresh apples, directly sourced from organic farms.
        </p>
        <button
          className="rounded-md w-full mt-3 bg-cyan-600 py-1.5 px-3 border border-transparent text-center text-xs text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Card;
