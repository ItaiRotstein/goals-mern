import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getGoalById, deleteGoal, reset, updateGoal } from "../features/goals/goalSlice";
import Spinner from "../components/Spinner";
import GoalEdit from '../components/GoalEdit';

const GoalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedGoal, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

  const [goalText, setGoalText] = useState(selectedGoal.text);

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate("/login");
    else {
      dispatch(getGoalById(id));
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  const handleDeleteButton = () => {
    dispatch(deleteGoal(selectedGoal._id));
    navigate("/");
  };

  const onUpdateGoal = (text) => {
    let newGoal = { ...selectedGoal };
    newGoal.text = text;
    dispatch(updateGoal(newGoal));
    // dispatch(reset())
  };

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const handleInput = () => {};

  if (isLoading) return <Spinner />;

  return (
    <>
      <Link to={"/"}>
        <button className="btn">Back</button>
      </Link>
      <section className="heading">
        <h1>{capitalizeFirstLetter(user.name)}'s Goals</h1>
        <p>Goal details</p>
      </section>
      {/* <GoalForm /> */}
      <section className="content">
        <div className="goal">
          <div>{new Date(selectedGoal.createdAt).toLocaleString("en-GB")}</div>
          <GoalEdit goalText={selectedGoal} onUpdateGoal={onUpdateGoal}/>
          <button className="close" onClick={handleDeleteButton}>
            X
          </button>
        </div>
      </section>
    </>
  );
};
export default GoalPage;
