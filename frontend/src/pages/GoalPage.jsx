import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { getGoalById, deleteGoal, reset } from "../features/goals/goalSlice";
import { useEffect } from "react";
import Spinner from "../components/Spinner";

const GoalPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { selectedGoal, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();

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
  const handleDelete = () => {
    dispatch(deleteGoal(selectedGoal._id));
    navigate('/')
  };
 

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Goal</h1>
        <p>Goal details</p>
      </section>
      {/* <GoalForm /> */}
      <section className="content">
        <div className="goal">
          <div>{new Date(selectedGoal.createdAt).toLocaleString("en-GB")}</div>
          <h2>{selectedGoal.text}</h2>
          <button className="close" onClick={handleDelete}>
            X
          </button>
        </div>
      </section>
    </>
  );
};
export default GoalPage;
