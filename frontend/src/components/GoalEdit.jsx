import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateGoal, reset } from "../features/goals/goalSlice";

const GoalEdit = ({onUpdateGoal}) => {
  const { selectedGoal, isError, message } = useSelector((state) => state.goals);
  const { user } = useSelector((state) => state.auth);

  const [text, setText] = useState(selectedGoal.text);
  const [isEdit, setIsEdit] = useState(false);
  const inputRef = useRef();
  const dispatch = useDispatch();

//   useEffect(() => {
//     isEdit && inputRef.current.focus();
//     if (isError) {
//       console.log(message);
//     }

//     if (!user) navigate("/login");
//     else {
//       dispatch(updateGoal(id));
//     }

//     return () => {
//       dispatch(reset());
//     };
//   }, [user, isError, message, dispatch, isEdit]);

  const onHandleChange = (e) => {
    setText(e.target.value);
  };

  const onEnterPress = (e) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      e.target.blur();
    }
  };

  const onHandleSubmit = (e) => {
    if (e.target.value) e.preventDefault();
    onUpdateGoal(e.target.value);
    setIsEdit(false)
  };

  

  return (
    <div className="goal-edit">
      {isEdit && (
        <input
          ref={inputRef}
          dir="auto"
          type="text"
          value={text}
          onChange={onHandleChange}
          onKeyDown={onEnterPress}
          onBlur={onHandleSubmit}
        />
      )}
      {!isEdit && <p onClick={() => setIsEdit(true)}>{text}</p>}
    </div>
  );
};

export default GoalEdit;
