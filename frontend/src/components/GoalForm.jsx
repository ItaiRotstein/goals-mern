import { useState } from "react";
import { useDispatch } from "react-redux";

import {toast} from 'react-toastify'

import { addGoal } from "../features/goals/goalSlice";

const GoalForm = ({setGoalFormShow}) => {
  const [text, setText] = useState("");

  const dispatch = useDispatch();

  const onSubmit = (e) => {
    e.preventDefault();
    if (text === '') {
      toast.error('Please add text')
      return
  }
    const newGoal = {
      text,
    };
    dispatch(addGoal(newGoal));
    toast.success('Goal addded successfuly')
    setGoalFormShow(false)
  };

  return (
    <section className="form">
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="text">Goal</label>
          <input
            type="text"
            name="text"
            id="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="type..."
          />
        </div>
        <div className="form-group">
          <button className="btn btn-block" type="submit">
            Add goal
          </button>
        </div>
      </form>
    </section>
  );
};
export default GoalForm;
