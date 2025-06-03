import React from "react";
import SummaryCard from "./SummaryCard";
import {
  FaUsers,
  FaBuilding,
  FaMoneyCheckAlt,
  FaFileAlt,
  FaClock,
  FaTimesCircle,
  FaCheckCircle,  
} from "react-icons/fa";

const AdminSummary = () => {
  return (
    <div className="p-6 bg-gray-900 text-yellow-400 min-h-screen">
      <h3 className="text-2xl font-bold mb-6 text-center">Dashboard View</h3>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <SummaryCard icon={FaUsers} text="Total Employees" number={12} />
        <SummaryCard icon={FaBuilding} text="Total Departments" number={2} />
        <SummaryCard icon={FaMoneyCheckAlt} text="Monthly Salary" number="$788" />
      </div>

      <div className="mt-12">
        <h4 className="text-xl font-semibold mb-4 text-center">Leave Details</h4>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6"> {/* changed to 4 cols */}
          <SummaryCard icon={FaFileAlt} text="Leave Applied" number={12} />
          <SummaryCard icon={FaClock} text="Leave Pending" number={5} />
          <SummaryCard icon={FaCheckCircle} text="Leave Approved" number={7} />  {/* Added */}
          <SummaryCard icon={FaTimesCircle} text="Leave Rejected" number={2} />
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;
