// src/utils/DepartmentHelper.js

export const columns = [
    {
      name: "S No",
      selector: (row) => row.sno,
      sortable: true,
    },
    {
      name: "Department Name",
      selector: (row) => row.dep_name,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];
  
  export const DepartmentButtons = ({ _id }) => {
    return (
      <div className="flex gap-2">
        <button
          className="px-3 py-1 text-sm font-medium bg-yellow-500 text-gray-900 rounded hover:bg-yellow-600 transition duration-200"
          onClick={() => console.log("Edit", _id)}
        >
          Edit
        </button>
        <button
          className="px-3 py-1 text-sm font-medium bg-red-600 text-white rounded hover:bg-red-700 transition duration-200"
          onClick={() => console.log("Delete", _id)}
        >
          Delete
        </button>
      </div>
    );
  };
  