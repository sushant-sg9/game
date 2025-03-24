import React, { useState, useEffect } from 'react';

const Game = () => {
  const [gameData, setGameData] = useState({
   
      bucks: 10.00,
      assets: [
        {
          "name": "Studio Apartment",
          "level": 1,
          "time": 3,
          "rent": 2,
          "cost": 5.25,
          "inc": 1.1,
          "onRent": false,
          "auto": false,
          "owned": true
        },
        {
          "name": "One-Bedroom Apartment",
          "level": 0,
          "time": 6,
          "rent": 5,
          "cost": 10.00,
          "inc": 1.05,
          "onRent": false,
          "auto": false,
          "owned": false
        },
        {
          "name": "Two-Bedroom Apartment",
          "level": 0,
          "time": 9,
          "rent": 10,
          "cost": 20.00,
          "inc": 1.15,
          "onRent": false,
          "auto": false,
          "owned": false
        },
        {
          "name": "Townhouse",
          "level": 0,
          "time": 12,
          "rent": 20,
          "cost": 40.00,
          "inc": 1.2,
          "onRent": false,
          "auto": false,
          "owned": false
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