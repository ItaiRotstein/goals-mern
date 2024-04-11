import { useRef, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

const GoalEdit = ({ goalText, onUpdateGoal, isEditShow, setIsEditShow }) => {
  const inputRef = useRef();

  const [text, setText] = useState(goalText);

  useEffect(() => {
    isEditShow && inputRef.current.focus();
  }, [isEditShow]);

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
    if (text === '') {
      toast.error('Please add text');
      return;
    }
    onUpdateGoal(e.target.value);
    setIsEditShow(false);
  };

  return (
    <div className="goal-edit">
      {isEditShow && (
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
      {!isEditShow && <p>{text}</p>}
    </div>
  );
};

export default GoalEdit;
