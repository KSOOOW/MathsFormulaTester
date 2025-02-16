import { useState } from "react";

export default function App() {
  const [PLevel, setPLevel] = useState(1);
  const [PTier, setPTier] = useState(1);
  const [PRank, setPRank] = useState(1);

  const [CapacityLevel, setCapacityLevel] = useState(1);
  const [CapacityTier, setCapacityTier] = useState(1);

  const [CycleDurationLevel, setCycleDurationLevel] = useState(1);
  const [YieldLevel, setYieldLevel] = useState(1);

  function Power() {
    let power = 0;
    for(let i = 1; i < PRank; i++){
      power += (1 + 100 * Math.log(100) * 4 * Math.pow(2, i));
    }
    power += 1 + PLevel * Math.log(PLevel) * PTier * Math.pow(2, PRank);
    return power;
  }

  function CapacityCycle() {
    let capacitycycle = 0;
    
    capacitycycle = 20 + CapacityLevel * Math.log(CapacityLevel) * Math.pow(2, CapacityTier)

    return capacitycycle;
  }

  function CycleDuration(){
    return 2.1 - CycleDurationLevel*0.1;
  }

  function Yield(){
    return 0.07 + YieldLevel*0.02
  }

  function getUpgradeCost(stat) {
    switch (stat) {
      case "PLevel":
        if (PLevel === 100) return "Max";
        return Math.ceil((PLevel + 1) * Math.log(PLevel + 1) * 3 * Math.pow(2, PRank));

      case "PTier":
        if (PTier === 4) return "Max";
        if (PLevel < 25 * PTier) return `Level ${25 * PTier} Required`;
        return Math.ceil(5000 * PTier * Math.pow(2, PRank));

      case "PRank":
        if (PLevel < 100 || PTier < 4) return "Level 100 & Tier 4 Needed";
        return Math.ceil(30000 * Math.pow(2, PRank));

      case "CapacityLevel":
        if (CapacityLevel === 1000) return "Max";
        return Math.ceil((CapacityLevel + 1) * 8 * Math.pow(2, CapacityLevel/10));

      case "CapacityTier":
        if (CapacityTier === 100) return "Max";
        return Math.ceil(500 * Math.pow(2, CapacityTier));

      case "CycleDurationLevel":
        if (CycleDurationLevel === 10) return "Max";
        return Math.ceil(50 * Math.pow(10, CycleDurationLevel*3));

        case "YieldLevel":
      if (YieldLevel === 10) return "Max";
      return Math.ceil(100 * Math.pow(10, YieldLevel*3));

      default:
        return "N/A";
    }
  }

  function formatNumber(num) {
    if (typeof num !== "number") return num; // Retourne la valeur directement si ce n'est pas un nombre
  
    const units = ["", "K", "M", "B", "T", "Qa", "Qi", "Sx", "Sp", "Oc", "No", "Dc"];
    let unitIndex = 0;
    while (num >= 1000 && unitIndex < units.length - 1) {
      num /= 1000;
      unitIndex++;
    }
    return num.toFixed(2) + " " + units[unitIndex];
  }
  

  const handleLevelChange = (e) => setPLevel(Number(e.target.value));
  const handleTierChange = (e) => setPTier(Number(e.target.value));
  const handleRankChange = (e) => setPRank(Number(e.target.value));

  const handleCapacityLevelChange = (e) => setCapacityLevel(Number(e.target.value));
  const handleCapacityTierChange = (e) => setCapacityTier(Number(e.target.value));

  const handleCycleDurationLevelChange = (e) => setCycleDurationLevel(Number(e.target.value));
  const handleYieldLevelChange = (e) => setYieldLevel(Number(e.target.value));

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Pickaxe Power
        </h1>

        <div className="space-y-8">
          <div>
            <label className="block mb-2 text-black">Level: {PLevel}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("PLevel"))}</label>
            <input
              type="range"
              min="1"
              max="100"
              value={PLevel}
              onChange={handleLevelChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-black">Tier: {PTier}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("PTier"))}</label>

            <input
              type="range"
              min="1"
              max="4"
              value={PTier}
              onChange={handleTierChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-black">Rank: {PRank}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("PRank"))}</label>

            <input
              type="range"
              min="1"
              max="100"
              value={PRank}
              onChange={handleRankChange}
              className="w-full"
            />
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <div className="text-xl font-bold text-center text-black">
              Power: {formatNumber(Power())}
            </div>
          </div>
        </div>
      </div>


      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 mt-12">
        <h1 className="text-4xl font-extrabold text-center mb-12 text-gray-800">
          Conversion
        </h1>

        <div className="space-y-8">
          <div>
            <label className="block mb-2 text-black">Conversion Level: {CapacityLevel}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("CapacityLevel"))}</label>

            <input
              type="range"
              min="1"
              max="1000"
              value={CapacityLevel}
              onChange={handleCapacityLevelChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-black">Conversion Tier: {CapacityTier}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("CapacityTier"))}</label>

            <input
              type="range"
              min="1"
              max="100"
              value={CapacityTier}
              onChange={handleCapacityTierChange}
              className="w-full"
            />
          </div>

          <hr className="border-t border-gray-300 my-8" />

          <div>
            <label className="block mb-2 text-black">Cycle Duration Level: {CycleDurationLevel}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("CycleDurationLevel"))}</label>

            <input
              type="range"
              min="1"
              max="10"
              value={CycleDurationLevel}
              onChange={handleCycleDurationLevelChange}
              className="w-full"
            />
          </div>

          <div>
            <label className="block mb-2 text-black">Yield Level: {YieldLevel}</label>
            <label className="block mb-2 text-black">UpgradeCost : {formatNumber(getUpgradeCost("YieldLevel"))}</label>

            <input
              type="range"
              min="1"
              max="10"
              value={YieldLevel}
              onChange={handleYieldLevelChange}
              className="w-full"
            />
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <div className="text-xl font-bold text-center text-black">
              Capacity / {formatNumber(CycleDuration())}s : {formatNumber(CapacityCycle())}
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-100 rounded-lg">
            <div className="text-xl font-bold text-center text-black">
              Gold / {formatNumber(CycleDuration())}s : {formatNumber(CapacityCycle()*Yield())} | {formatNumber(CapacityCycle()*0.09*6)}$
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
