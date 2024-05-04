// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';

var path = 'tripleh.jpg';

function StoreList() {
  const [stores, setStores] = useState([
    { id: 1, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
    { id: 2, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
    { id: 3, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
    { id: 4, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
    { id: 5, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
    { id: 6, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
    { id: 7, name: 'Emir Bey', imageUrl: path, description: 'Kaçak Telefoncu' },
  ]);

  return (
    <div className="max-w-6xl mx-auto p-5">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-10">All Stores</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-center">
        {stores.map((store, index) => (
          <div key={store.id} className="bg-white p-6 shadow-lg rounded-lg flex flex-col items-center transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-2xl border-2 border-gray-300 m-2">
            <h2 className="text-xl font-semibold mb-2">{store.name}</h2>
            <div className="h-32 w-32 mb-3 overflow-hidden rounded-full border-8 border-gray-200">
              <img 
                src={store.imageUrl} 
                className="object-cover w-full h-full"
                alt={`${store.name}`}
              />
            </div>
            <p className="text-gray-600 text-sm mb-4">{store.description}</p>
            <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-900 transition-colors">
              Select
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StoreList;