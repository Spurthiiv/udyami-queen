import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const tasksData = {
  new: [
    {
      id: 'UQ125487965',
      type: 'Pickup Order',
      place: 'Queen Hub, Rajajinagar',
      distance: '1.2 km away',
    },
    {
      id: 'UQ125487964',
      type: 'Drop Order',
      place: 'Sampige Road, Malleshwaram',
      distance: '2.3 km away',
    },
  ],
  ongoing: [
    {
      id: 'UQ125487960',
      type: 'Drop Order',
      place: 'Margosa Road, Malleshwaram',
      distance: '0.8 km away',
    },
  ],
  completed: [
    {
      id: 'UQ125487955',
      type: 'Drop Order',
      place: 'Jayanagar 4th Block',
      distance: '3.1 km',
    },
    {
      id: 'UQ125487950',
      type: 'Pickup Order',
      place: 'Queen Hub, Rajajinagar',
      distance: '1.0 km',
    },
  ],
};

const typeStyles = {
  'Pickup Order': 'text-[#2A5D8B]',
  'Drop Order': 'text-[#8B1E3F]',
};

const bottomNavItems = [
  { key: 'tasks', label: 'Tasks', icon: '🧾', path: '/rider/tasks' },
  { key: 'earnings', label: 'Earnings', icon: '💰', path: '/rider/earnings' },
  { key: 'wallet', label: 'Wallet', icon: '👛', path: '/rider/wallet' },
  { key: 'profile', label: 'Profile', icon: '👤', path: '/rider/profile' },
];

function RiderTasksScreen() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('new');
  const [accepted, setAccepted] = useState([]);

  const tabs = [
    { key: 'new', label: `New (${tasksData.new.length})` },
    { key: 'ongoing', label: `Ongoing (${tasksData.ongoing.length})` },
    { key: 'completed', label: 'Completed' },
  ];

  const currentTasks = tasksData[activeTab] || [];

  function handleAccept(taskId) {
    setAccepted((prev) => [...prev, taskId]);
  }

  return (
    <div className="min-h-screen bg-[#FDF6F0] pb-24">
      {/* Header */}
      <div className="bg-gradient-to-b from-[#8B1E3F] to-[#6E1731] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#F0D9B5] flex-shrink-0" />
          <div>
            <p className="text-white font-semibold">Hello, Anitha R.</p>
            <p className="text-white text-xs opacity-70">Delivery Partner</p>
          </div>
        </div>
        <span className="flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-full text-xs font-medium text-[#8B1E3F]">
          <span className="w-2 h-2 rounded-full bg-green-500" />
          Online
        </span>
      </div>

      <div className="px-4 mt-4">
        <h1 className="text-[#8B1E3F] font-bold text-lg mb-3">My Tasks</h1>

        {/* Tabs */}
        <div className="flex gap-2 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex-1 text-sm font-medium py-2 rounded-xl ${
                activeTab === tab.key
                  ? 'bg-[#8B1E3F] text-white'
                  : 'bg-white text-[#8B1E3F] shadow-sm'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Task list */}
        {currentTasks.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-8">No tasks here.</p>
        ) : (
          currentTasks.map((task) => (
            <div key={task.id} className="bg-white rounded-xl shadow-sm p-4 mb-3">
              <p className={`text-sm font-semibold mb-1 ${typeStyles[task.type] || 'text-[#8B1E3F]'}`}>
                {task.type}
              </p>
              <p className="text-[#8B1E3F] font-medium text-sm">{task.id}</p>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-gray-600 text-sm">{task.place}</p>
                  <p className="text-gray-400 text-xs">{task.distance}</p>
                </div>

                {activeTab === 'new' && (
                  accepted.includes(task.id) ? (
                    <span className="text-xs font-medium text-green-600 px-3 py-2">
                      Accepted
                    </span>
                  ) : (
                    <button
                      onClick={() => handleAccept(task.id)}
                      className="bg-[#8B1E3F] text-white text-xs font-semibold px-4 py-2 rounded-lg"
                    >
                      Accept
                    </button>
                  )
                )}

                {activeTab === 'ongoing' && (
                  <button
                    onClick={() => navigate(`/rider/tasks/${task.id}`)}
                    className="bg-[#8B1E3F] text-white text-xs font-semibold px-4 py-2 rounded-lg"
                  >
                    View
                  </button>
                )}

                {activeTab === 'completed' && (
                  <span className="text-xs font-medium text-gray-400 px-3 py-2">
                    Done
                  </span>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Bottom nav */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-between px-6 py-2">
        {bottomNavItems.map((item) => (
          <button
            key={item.key}
            onClick={() => navigate(item.path)}
            className="flex flex-col items-center gap-0.5 text-[#8B1E3F]"
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-[10px]">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default RiderTasksScreen;