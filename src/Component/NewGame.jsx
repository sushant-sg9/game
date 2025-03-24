import React, { useState, useEffect } from 'react';

const Game = () => {
  const [gameData, setGameData] = useState({
   
      bucks: 10.00,
     "assets": [
    {
      "name": "Studio Apartment",
      "level": 1,
      "time": 3,
      "rent": 2,
      "cost": 5.25,
      "inc": 1.1,
      "onRent": false,
      "auto": false
    },
    {
      "name": "One-Bedroom Apartment",
      "level": 0,
      "time": 6,
      "rent": 5,
      "cost": 10,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Two-Bedroom Apartment",
      "level": 0,
      "time": 9,
      "rent": 10,
      "cost": 20,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Townhouse",
      "level": 0,
      "time": 12,
      "rent": 20,
      "cost": 40,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Small Single-Family Home",
      "level": 0,
      "time": 15,
      "rent": 40,
      "cost": 80,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Condo",
      "level": 0,
      "time": 18,
      "rent": 80,
      "cost": 160,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Large Single-Family Home",
      "level": 0,
      "time": 21,
      "rent": 160,
      "cost": 320,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Duplex",
      "level": 0,
      "time": 24,
      "rent": 320,
      "cost": 640,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Three-Bedroom House",
      "level": 0,
      "time": 27,
      "rent": 640,
      "cost": 1280,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Four-Bedroom House",
      "level": 0,
      "time": 30,
      "rent": 1280,
      "cost": 2560,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Luxury Apartment",
      "level": 0,
      "time": 33,
      "rent": 2560,
      "cost": 5120,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Penthouse",
      "level": 0,
      "time": 36,
      "rent": 5120,
      "cost": 10240,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Beachfront Property",
      "level": 0,
      "time": 39,
      "rent": 10240,
      "cost": 20480,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Farmhouse",
      "level": 0,
      "time": 42,
      "rent": 20480,
      "cost": 40960,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Vacation Property",
      "level": 0,
      "time": 45,
      "rent": 40960,
      "cost": 81920,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Commercial Retail Space",
      "level": 0,
      "time": 48,
      "rent": 81920,
      "cost": 163840,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Office Building",
      "level": 0,
      "time": 51,
      "rent": 163840,
      "cost": 327680,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Industrial Warehouse",
      "level": 0,
      "time": 54,
      "rent": 327680,
      "cost": 655360,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Multi-Family Residential Building",
      "level": 0,
      "time": 57,
      "rent": 655360,
      "cost": 1310720,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    },
    {
      "name": "Mixed-Use Development",
      "level": 0,
      "time": 60,
      "rent": 1310720,
      "cost": 2621440,
      "inc": 1.05,
      "onRent": false,
      "auto": false
    }
  ]
  })

  const [timers, setTimers] = useState({});

  const handleSave = () => {
    localStorage.setItem('gameData', JSON.stringify(gameData));
  };

  const handleBuy = (index) => {
    const asset = gameData.assets[index];
    
    if (gameData.bucks >= asset.cost) {
      const updatedAssets = [...gameData.assets];
      
      if (asset.owned) {
        updatedAssets[index] = {
          ...asset,
          level: asset.level + 1,
          cost: parseFloat((asset.cost * asset.inc).toFixed(2)),
        };
      } else {
        updatedAssets[index] = {
          ...asset,
          owned: true
        };
      }
      
      setGameData({
        ...gameData,
        bucks: parseFloat((gameData.bucks - asset.cost).toFixed(2)),
        assets: updatedAssets
      });
    } 
  };

  const handleRent = (index) => {
    const asset = gameData.assets[index];
    if (!asset.onRent && asset.owned) {
      const updatedAssets = [...gameData.assets];
      updatedAssets[index] = { ...asset, onRent: true };
      
      const newTimers = { ...timers };
      newTimers[index] = setTimeout(() => {
        collectRent(index);
      }, asset.time * 1000);
      
      setTimers(newTimers);
      setGameData({
        ...gameData,
        assets: updatedAssets
      });
    }
  };
  
  const collectRent = (index) => {
    const asset = gameData.assets[index];
    
    const updatedAssets = [...gameData.assets];
    updatedAssets[index] = { ...asset, onRent: false };
    
    const newBucks = gameData.bucks + asset.rent;
    
    setGameData({
      ...gameData,
      bucks: parseFloat(newBucks.toFixed(2)),
      assets: updatedAssets
    });
    
    clearTimeout(timers[index]);
    const newTimers = { ...timers };
    delete newTimers[index];
    setTimers(newTimers);
  };

  const calculateProgress = (index) => {
    const asset = gameData.assets[index];
    if (!asset.onRent) return 0;
    return 50; 
  };

  const handleManage = (index) => {
    
  };
  

  return (
    <div className="bg-gray-800 min-h-screen text-white p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between border border-pink-500 rounded-lg p-4 mb-4">
          <div className="text-xl font-bold">${(gameData.bucks)}</div>
          <button 
            onClick={handleSave}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
        
        {gameData.assets.map((asset, index) => (
          <div key={index} className="border border-green-500 rounded-lg mb-4 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center mr-4">
                  {asset.name}
                </div>
                <div>
                  <h3 className="font-bold">{asset.name}</h3>
                  <div className="text-sm text-gray-300">
                    {`{"cost":"${(asset.cost)}","level":${asset.level},"rent":${(asset.rent)},"time":${asset.time}}`}
                  </div>
                </div>
              </div>
              
              <div className="flex flex-col space-y-2">
                <button 
                  onClick={() => handleBuy(index)}
                  className="bg-black text-white px-4 py-1 rounded"
                >
                  Buy
                </button>
                
                {asset.owned && (
                  <>
                    <button 
                      onClick={() => handleRent(index)}
                      disabled={asset.onRent}
                      className={`bg-blue-600 text-white px-4 py-1 rounded ${asset.onRent ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      Rent
                    </button>
                    
                    <button 
                      onClick={() => handleManage(index)}
                      className={`bg-red-500 text-white px-4 py-1 rounded ${asset.auto ? 'border-2 border-yellow-300' : ''}`}
                    >
                      Manage
                    </button>
                  </>
                )}
              </div>
            </div>
            
            {asset.owned && (
              <div className="mt-4 bg-gray-700 h-2 rounded-full">
                <div 
                  className="bg-gray-400 h-2 rounded-full" 
                  style={{ width: `${asset.onRent ? calculateProgress(index) : 0}%` }}
                ></div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Game;