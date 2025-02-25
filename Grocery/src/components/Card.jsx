import React from "react";

const Card = () => {
  return (
    <div className="relative flex flex-col my-3 bg-white shadow-sm border border-slate-200 rounded-lg w-64 transition-all duration-300 hover:scale-105 hover:shadow-lg">
      <div className="relative p-2 h-56 overflow-hidden rounded-lg">
        <img
          src="https://images.unsplash.com/photo-1629367494173-c78a56567877?ixlib=rb-4.0.3&amp;ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;auto=format&amp;fit=crop&amp;w=927&amp;q=80"
          alt="card-image"
          className="h-full w-full object-cover rounded-md"
        />
      </div>
      <div className="p-2">
        <div className="mb-2 flex items-center justify-between">
          <p className="text-slate-800 text-base font-semibold">Apple AirPods</p>
          <p className="text-cyan-600 text-base font-semibold">$95.00</p>
        </div>
        <p className="text-slate-600 text-xs leading-snug font-light">
          With plenty of talk and listen time, voice-activated Siri access, and a wireless charging case.
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
