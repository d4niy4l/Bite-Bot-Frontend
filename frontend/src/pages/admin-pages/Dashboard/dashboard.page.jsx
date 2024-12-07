import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import { FaTimes } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import apiClient from '../../../lib/axios.lib';
import { ENDPOINTS } from '../../../utils/api/endpoints';

// Register the necessary components with Chart.js
Chart.register(...registerables);

const Dashboard = () => {
  const [selectedGraph, setSelectedGraph] = useState(null);
  const [revenueFilters, setRevenueFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const [itemsSoldFilters, setItemsSoldFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const [businessHoursFilters, setBusinessHoursFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const [topAreasFilters, setTopAreasFilters] = useState({
    startDate: '',
    endDate: '',
  });
  

  const [revenueData, setRevenueData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Revenue',
        data: [],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  });
  const [topAreasData, setTopAreasData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  });
  const [businessHoursData, setBusinessHoursData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Orders',
        data: [],
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
          'rgba(255, 159, 64, 0.6)',
          'rgba(199, 199, 199, 0.6)',
          'rgba(83, 102, 255, 0.6)',
        ],
      },
    ],
  });
  const [itemsSoldData, setItemsSoldData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Items Sold',
        data: [],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  });
  const [dateError, setDateError] = useState('');
  const [tempRevenueFilters, setTempRevenueFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const [tempItemsSoldFilters, setTempItemsSoldFilters] = useState({
    startDate: '',
    endDate: '',
  });
  const [tempBusinessHoursFilters, setTempBusinessHoursFilters] = useState({
    startDate: '',
    endDate: '',
  });

  const [tempTopAreasFilters, setTempTopAreasFilters] = useState({
    startDate: '',
    endDate: '',
  });

  useEffect(() => {
    fetchTopAreasData(topAreasFilters.startDate, topAreasFilters.endDate);
    fetchRevenueData(revenueFilters.startDate, revenueFilters.endDate);
    fetchBusinessHoursData(businessHoursFilters.startDate, businessHoursFilters.endDate);
    fetchItemsSoldData(itemsSoldFilters.startDate, itemsSoldFilters.endDate);
  }, [revenueFilters, itemsSoldFilters, businessHoursFilters, topAreasFilters]);



  const fetchTopAreasData = async (startDate, endDate) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.GET_TOP_SECTORS}?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 200) {
        const data = response.data.data;
        const labels = Object.keys(data);
        const values = Object.values(data);
        setTopAreasData({
          labels,
          datasets: [
            {
              label: 'Orders',
              data: values,
              backgroundColor: 'rgba(255, 159, 64, 0.6)',
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching top areas data:', error);
    }
  };


  const fetchRevenueData = async (startDate, endDate) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.GET_REVENUE}?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 200) {
        const data = response.data.data;
        const labels = Object.keys(data);
        const values = Object.values(data);
        setRevenueData({
          labels,
          datasets: [
            {
              label: 'Revenue',
              data: values,
              backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching revenue data:', error);
    }
  };

  const fetchBusinessHoursData = async (startDate, endDate) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.GET_TOP_BUSINESS_HOURS}?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 200) {
        const data = response.data.data;
        const labels = Object.keys(data).map(hour => `${hour}:00`);
        const values = Object.values(data);
        setBusinessHoursData({
          labels,
          datasets: [
            {
              label: 'Orders',
              data: values,
              backgroundColor: [
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(199, 199, 199, 0.6)',
                'rgba(83, 102, 255, 0.6)',
              ],
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching business hours data:', error);
    }
  };

  const fetchItemsSoldData = async (startDate, endDate) => {
    try {
      const response = await apiClient.get(`${ENDPOINTS.GET_TOP_SOLD_ITEMS}?startDate=${startDate}&endDate=${endDate}`);
      if (response.status === 200) {
        const data = response.data.data;
        const labels = Object.keys(data);
        const values = Object.values(data);
        setItemsSoldData({
          labels,
          datasets: [
            {
              label: 'Items Sold',
              data: values,
              backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
          ],
        });
      }
    } catch (error) {
      console.error('Error fetching items sold data:', error);
    }
  };

  const handleGraphClick = (graph) => {
    setSelectedGraph(graph);
    if (graph === 'revenue') {
      setTempRevenueFilters(revenueFilters);
    } else if (graph === 'itemsSold') {
      setTempItemsSoldFilters(itemsSoldFilters);
    } else if (graph === 'businessHours') {
      setTempBusinessHoursFilters(businessHoursFilters);
    } else if (graph === 'topAreas') {
      setTempTopAreasFilters(topAreasFilters);
    }
  };

  const handleCloseModal = () => {
    setSelectedGraph(null);
  };

  const handleTempRevenueFilterChange = (e) => {
    const { name, value } = e.target;
    setTempRevenueFilters((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));

    // Validate date range
    if (name === 'startDate' && tempRevenueFilters.endDate && new Date(value) >= new Date(tempRevenueFilters.endDate)) {
      setDateError('Start date must be less than end date');
    } else if (name === 'endDate' && tempRevenueFilters.startDate && new Date(value) <= new Date(tempRevenueFilters.startDate)) {
      setDateError('End date must be greater than start date');
    } else {
      setDateError('');
    }
  };

  const handleTempItemsSoldFilterChange = (e) => {
    const { name, value } = e.target;
    setTempItemsSoldFilters((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleTempBusinessHoursFilterChange = (e) => {
    const { name, value } = e.target;
    setTempBusinessHoursFilters((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleTempTopAreasFilterChange = (e) => {
    const { name, value } = e.target;
    setTempTopAreasFilters((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const applyFilters = () => {
    if (selectedGraph === 'revenue') {
      setRevenueFilters(tempRevenueFilters);
    } else if (selectedGraph === 'itemsSold') {
      const { startDate, endDate } = tempItemsSoldFilters;
      const currentDate = new Date().toISOString().split('T')[0];
      setItemsSoldFilters({
        startDate: startDate || currentDate,
        endDate: endDate || currentDate,
      });
    } else if (selectedGraph === 'businessHours') {
      const { startDate, endDate } = tempBusinessHoursFilters;
      const currentDate = new Date().toISOString().split('T')[0];
      setBusinessHoursFilters({
        startDate: startDate || currentDate,
        endDate: endDate || currentDate,
      });
    } else if (selectedGraph === 'topAreas') {
      const { startDate, endDate } = tempTopAreasFilters;
      const currentDate = new Date().toISOString().split('T')[0];
      setTopAreasFilters({
        startDate: startDate || currentDate,
        endDate: endDate || currentDate,
      });
    }
    handleCloseModal();
  };

  const chartOptions = {
    maintainAspectRatio: false,
  };

  return (
    <div className="max-w-[1300px] h-auto font-inter flex flex-col mx-auto px-[30px] py-[20px] rounded-xl shadow-lg">
      <h1 className="text-3xl font-bold text-logoColor mb-6 text-center">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg cursor-pointer max-h-[400px]" onClick={() => handleGraphClick('revenue')}>
          <h2 className="text-xl font-bold text-white mb-4">Revenue Over Previous Days</h2>
          <div className="h-[300px]">
            <Line data={revenueData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg cursor-pointer max-h-[400px]" onClick={() => handleGraphClick('itemsSold')}>
          <h2 className="text-xl font-bold text-white mb-4">Most Items Sold</h2>
          <div className="h-[300px]">
            <Bar data={itemsSoldData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg cursor-pointer max-h-[400px]" onClick={() => handleGraphClick('businessHours')}>
          <h2 className="text-xl font-bold text-white mb-4">Top Business Hours</h2>
          <div className="h-[300px]">
            <Pie data={businessHoursData} options={chartOptions} />
          </div>
        </div>
        <div className="bg-[#2a2a2a] p-6 rounded-xl shadow-lg cursor-pointer max-h-[400px]" onClick={() => handleGraphClick('topAreas')}>
          <h2 className="text-xl font-bold text-white mb-4">Top Areas for Orders</h2>
          <div className="h-[300px]">
            <Bar data={topAreasData} options={chartOptions} />
          </div>
        </div>
      </div>
      <AnimatePresence>
        {selectedGraph && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-[#1a1a1a] text-white rounded-xl shadow-lg p-6 w-full max-w-lg overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl">Filter Details</h2>
                <button onClick={handleCloseModal} className="text-gray-400 hover:text-white transition duration-300">
                  <FaTimes size={24} />
                </button>
              </div>
              {selectedGraph === 'topAreas' && (
                  <>
                    <div className="mb-4">
                      <label className="block text-white mb-2">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={tempTopAreasFilters.startDate}
                        onChange={handleTempTopAreasFilterChange}
                        className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                      />
                    </div>
                    <div className="mb-4">
                      <label className="block text-white mb-2">End Date</label>
                      <input
                        type="date"
                        name="endDate"
                        value={tempTopAreasFilters.endDate}
                        onChange={handleTempTopAreasFilterChange}
                        className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                      />
                    </div>
                  </>
                )}
              {selectedGraph === 'revenue' && (
                <>
                  <div className="mb-4">
                    <label className="block text-white mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={tempRevenueFilters.startDate}
                      onChange={handleTempRevenueFilterChange}
                      className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={tempRevenueFilters.endDate}
                      onChange={handleTempRevenueFilterChange}
                      className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                    />
                  </div>
                  {dateError && <p className="text-red-500 mb-4">{dateError}</p>}
                </>
              )}
              {selectedGraph === 'itemsSold' && (
                <>
                  <div className="mb-4">
                    <label className="block text-white mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={tempItemsSoldFilters.startDate}
                      onChange={handleTempItemsSoldFilterChange}
                      className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={tempItemsSoldFilters.endDate}
                      onChange={handleTempItemsSoldFilterChange}
                      className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                    />
                  </div>
                </>
              )}
              {selectedGraph === 'businessHours' && (
                <>
                  <div className="mb-4">
                    <label className="block text-white mb-2">Start Date</label>
                    <input
                      type="date"
                      name="startDate"
                      value={tempBusinessHoursFilters.startDate}
                      onChange={handleTempBusinessHoursFilterChange}
                      className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-white mb-2">End Date</label>
                    <input
                      type="date"
                      name="endDate"
                      value={tempBusinessHoursFilters.endDate}
                      onChange={handleTempBusinessHoursFilterChange}
                      className="w-full p-2 bg-[#333333] text-white border-[#1d1d1d] focus:border-logoColor border-[2px] focus:outline-none rounded-lg transition-all duration-300 hover:bg-[#444444] hover:border-logoColor"
                    />
                  </div>
                </>
              )}
              <button
                className="mt-4 bg-logoColor text-white py-2 px-4 rounded-lg transition-all duration-300 hover:bg-gray-600"
                onClick={applyFilters}
                disabled={dateError !== ''}
              >
                Apply Filters
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Dashboard;