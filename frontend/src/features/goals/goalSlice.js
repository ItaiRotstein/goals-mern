import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import goalService from './goalService';

const initialState = {
  goals: [],
  selectedGoal: {},
  isError: false,
  isSuccess: false,
  isLoading: false,
  isEditMode: false,
  message: '',
};

//Get user goals
export const getGoals = createAsyncThunk(
  'goals/getGoals',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Get user goal by ID
export const getGoalById = createAsyncThunk(
  'goals/getGoalById',
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoalById(goalId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Add goal
export const addGoal = createAsyncThunk(
  'goals/addGoal',
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.addGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Update goal
export const updateGoal = createAsyncThunk(
  'goals/updateGoal',
  async (goal, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.updateGoal(goal, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

//Delete goal
export const deleteGoal = createAsyncThunk(
  'goals/deleteGoal',
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(goalId, token);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    reset: (state) => {
      state.goals = [];
      state.isError = false;
      state.isSuccess = false;
      state.isLoading = false;
      state.isEditMode = false;
      state.message = '';
    },
  },
  extraReducers: (builder) => {
    builder
      //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS //GETGOALS
      .addCase(getGoals.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(getGoals.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID //GETGOALBYID
      .addCase(getGoalById.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getGoalById.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.selectedGoal = action.payload;
      })
      .addCase(getGoalById.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD //ADD
      .addCase(addGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(addGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE //UPDATE
      .addCase(updateGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        const idx = state.goals.findIndex(
          (goal) => goal._id === action.payload._id
        );
        state.goals[idx] = action.payload;
      })
      .addCase(updateGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE //DELETE
      .addCase(deleteGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      })
      .addCase(deleteGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
