import React from 'react'

const SummaryCard = ({ icon: Icon, text, number }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-5 flex items-center space-x-4 shadow-md hover:shadow-lg transition">
      <Icon className="text-yellow-400 text-4xl" />
      <div>
        <p className="text-yellow-400 font-semibold text-lg">{text}</p>
        <p className="text-white text-2xl font-bold">{number}</p>
      </div>
    </div>
  )
}

export default SummaryCard
