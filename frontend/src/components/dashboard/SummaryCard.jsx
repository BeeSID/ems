import React from 'react'

// Reusable card component to display a summary item with an icon, label text, and number
const SummaryCard = ({ icon: Icon, text, number }) => {
  return (
    // Card container with padding, rounded corners, and shadow
    <div className="bg-gray-900 rounded-lg p-5 flex items-center space-x-4 shadow-md hover:shadow-lg transition">
      {/* Display the passed icon component with styling */}
      <Icon className="text-yellow-400 text-4xl" />

      {/* Text content */}
      <div>
        {/* Label text */}
        <p className="text-yellow-400 font-semibold text-lg">{text}</p>

        {/* Number or value */}
        <p className="text-white text-2xl font-bold">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
