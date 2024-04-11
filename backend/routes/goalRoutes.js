const express = require('express')
const router = express.Router()
const {
  getGoals,
  addGoal,
  updateGoal,
  deleteGoal,
  getGoalById
} = require('../controllers/goalController')

const { protect } = require('../middleware/authMiddleware')

router.route('/').get(protect, getGoals).post(protect, addGoal)
router.route('/:id').delete(protect, deleteGoal).put(protect, updateGoal).get(protect, getGoalById)

module.exports = router
