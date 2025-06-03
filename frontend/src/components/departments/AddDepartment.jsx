import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const AddDepartment = () => {
    const [department, setDepartment] = useState({
        dep_name:'',
        description:''
    })
    const navigate = useNavigate()

    const handleChange = (e) =>{
        const {name, value} = e.target;
        setDepartment({...department,[name] : value})
    }

    const handleSubmit = async (e) =>{
        e.preventDefault()
        try{
const response = await axios.post('http://localhost:3000/api/department/add', department,{
    headers:{
        "Authorization": `Bearer${localStorage.getItem('token')}`
    }
})
if(response.data.success)
    navigate("/admin-dashboard/departments")
        }catch(error){
            if(error.response && !error.response.data.success);
            {
                alert(error.response.data.error)
            }
        }
    }



  return (
    <div className="h-screen bg-gray-900 text-yellow-400 flex items-center justify-center">
  <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-lg p-6 overflow-y-auto max-h-screen sm:overflow-visible sm:max-h-fit">
        <h3 className="text-2xl font-bold mb-6 text-center">Add Department</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="dep_name" className="block mb-1 font-semibold">
              Department name
            </label>
            <input
              type="text"
              id="dep_name"
              onChange={handleChange}
              placeholder="Enter Department name"
              className="w-full p-2 rounded bg-gray-700 text-yellow-400 focus:outline-yellow-400"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="description" className="block mb-1 font-semibold">
              Description
            </label>
            <textarea
              id="description"
              placeholder="Description"
              onChange={handleChange}
              rows="4"
              className="w-full p-2 rounded bg-gray-700 text-yellow-400 focus:outline-yellow-400 resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-semibold py-2 rounded transition"
          >
            Add Department
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddDepartment
