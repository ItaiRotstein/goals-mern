import axios from "axios";

const API_URL = "/api/goals/";

//Get goals
const getGoals = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);
  return response.data;
};

//Get goal by ID
const getGoalById = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL + goalId, config);
  return response.data;
};

//Add goal
const addGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, goal, config);
  return response.data;
};

//Update goal
const updateGoal = async (goal, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + goal._id, goal, config);
  return response.data;
};

//Delete goal
const deleteGoal = async (goalId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + goalId, config);
  return response.data;
};

const goalService = {
  getGoals,
  getGoalById,
  addGoal,
  updateGoal,
  deleteGoal,
};

export default goalService;
