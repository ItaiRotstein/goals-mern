import { useDispatch } from 'react-redux';
import { deleteGoal } from '../features/goals/goalSlice';
import { Link } from 'react-router-dom';

const GoalItem = ({ goal }) => {
  const dispatch = useDispatch();

  return (
    <Link to={`/goal/${goal._id}`}>
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-GB')}</div>
      <h2>{goal.text}</h2>
      <button className='close' onClick={() => dispatch(deleteGoal(goal._id))}>
        X
      </button>
    </div>
    </Link>
  );
};
export default GoalItem;
