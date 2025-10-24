import { useState } from "react";
import { Plus, Layers } from "lucide-react";
import SegmentPopup from "./Components/SegmentPopup";

export default function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [segments, setSegments] = useState([
    { name: "Premium Users", count: 1240 },
    { name: "Active Subscribers", count: 856 },
    { name: "Trial Period", count: 342 },
  ]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 relative box">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Segment Manager
            </h1>
            <p className="text-gray-600 text-sm sm:text-base mt-1">
              Create and manage customer segments
            </p>
          </div>
          <button
            onClick={() => setShowPopup(true)}
            className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium flex items-center justify-center gap-2 shadow-lg shadow-blue-200"
          >
            <Plus className="w-5 h-5" />
            Create Segment
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 hide">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          {/* Total Segments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Segments
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {segments.length}
                </p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Layers className="w-8 h-8 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Users */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {segments
                    .reduce((acc, s) => acc + s.count, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <Layers className="w-8 h-8 text-green-600" />
              </div>
            </div>
          </div>

          {/* Avg Segment Size */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Avg. Segment Size
                </p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Math.round(
                    segments.reduce((acc, s) => acc + s.count, 0) /
                      segments.length
                  ).toLocaleString()}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Layers className="w-8 h-8 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Segments List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Your Segments
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {segments.map((segment, index) => (
              <div
                key={index}
                className="px-6 py-4 hover:bg-gray-50 transition-colors flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <Layers className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {segment.name}
                    </h3>
                    <p className="text-sm text-gray-600 mt-0.5">
                      {segment.count.toLocaleString()} users
                    </p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm px-4 py-2 hover:bg-blue-50 rounded-lg transition-colors">
                  View Details
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Segment Popup */}
      {showPopup && <SegmentPopup onClose={() => setShowPopup(false)} />}

      {/* Tailwind Animations */}
      {/* <style jsx>{`
          @keyframes fadeIn {
            from {
              opacity: 0;
            }
            to {
              opacity: 1;
            }
          }
          @keyframes slideUp {
            from {
              transform: translateY(20px);
              opacity: 0;
            }
            to {
              transform: translateY(0);
              opacity: 1;
            }
          }
          .animate-fadeIn {
            animation: fadeIn 0.2s ease-out;
          }
          .animate-slideUp {
            animation: slideUp 0.3s ease-out;
          }
        `}</style> */}
    </div>
  );
}
