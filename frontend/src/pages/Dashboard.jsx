import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { getGoals, reset } from "../features/goals/goalSlice";
import GoalForm from "../components/GoalForm";
import Spinner from "../components/Spinner";
import GoalItem from "../components/GoalItem";

const Dashboard = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);
  const { goals, isLoading, isError, message } = useSelector(
    (state) => state.goals
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
    }

    if (!user) navigate("/login");
    else {
      dispatch(getGoals());
    }

    return () => {
      dispatch(reset());
    };
  }, [user, navigate, isError, message, dispatch]);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  if (isLoading) return <Spinner />;

  return (
    <>
      <section className="heading">
        <h1>Welcome {user && capitalizeFirstLetter(user.name)}</h1>
        <p>Goals Dashboard</p>
      </section>
      <GoalForm />
      <section className="content">
        {goals.length <= 0 && <h3>No goals here yet...</h3>}
        {goals.map((goal) => (
          <GoalItem key={goal._id} goal={goal} />
        ))}
      </section>
    </>
  );
};
export default Dashboard;
