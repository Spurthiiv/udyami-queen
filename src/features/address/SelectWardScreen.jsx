import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getWardsByConstituency } from '../../data/wards';
import { useWard } from './WardContext';

function SelectWardScreen() {
  const navigate = useNavigate();
  const { selectedWard, selectWard } = useWard();
  const [search, setSearch] = useState('');

  const grouped = getWardsByConstituency();

  const filteredGroups = grouped
    .map((group) => ({
      ...group,
      wards: group.wards.filter(
        (w) =>
          w.wardName.toLowerCase().includes(search.toLowerCase()) ||
          group.constituency.toLowerCase().includes(search.toLowerCase())
      ),
    }))
    .filter((group) => group.wards.length > 0);

  function handleSelect(ward) {
    selectWard(ward);
    navigate(-1);
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-6">
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center gap-3">
        <button onClick={() => navigate(-1)} className="text-white text-lg">←</button>
        <h1 className="text-white font-semibold">Select Your Ward</h1>
      </div>

      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 shadow-sm mb-4 sticky top-0">
          <span className="text-gray-400">🔍</span>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search ward or constituency..."
            className="flex-1 outline-none text-sm text-gray-600"
          />
        </div>

        {filteredGroups.length === 0 && (
          <p className="text-gray-400 text-sm text-center mt-10">No wards match your search</p>
        )}

        {filteredGroups.map((group) => (
          <div key={group.constituency} className="mb-4">
            <p className="text-[#8B1E3F] text-xs font-semibold uppercase tracking-wide mb-2 px-1">
              {group.constituency}
            </p>
            <div className="flex flex-col gap-2">
              {group.wards.map((ward) => {
                const isSelected =
                  selectedWard?.wardNo === ward.wardNo &&
                  selectedWard?.constituency === ward.constituency;
                return (
                  <button
                    key={`${ward.constituency}-${ward.wardNo}`}
                    onClick={() => handleSelect(ward)}
                    className={`text-left bg-white rounded-xl shadow-sm px-4 py-3 flex items-center justify-between ${
                      isSelected ? 'border-2 border-[#8B1E3F]' : ''
                    }`}
                  >
                    <div>
                      <p className="text-[#8B1E3F] font-medium text-sm">{ward.wardName}</p>
                      <p className="text-gray-400 text-xs">Ward No. {ward.wardNo}</p>
                    </div>
                    {isSelected && <span className="text-[#8B1E3F] text-sm">✓</span>}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectWardScreen;