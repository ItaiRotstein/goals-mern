import { useRef, useState, useEffect } from 'react';

const GoalEdit = ({ goalText, onUpdateGoal }) => {
  const inputRef = useRef();

  const [text, setText] = useState(goalText);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    isEdit && inputRef.current.focus();
  }, [isEdit]);

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
    setIsEdit(false);
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
