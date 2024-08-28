import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { reset } from '../store/game-state.js';

export default function OptionsPage() {
  const dispatch = useDispatch();
  const router = useNavigate();
  function handleResetClick() {
    dispatch(reset());
    router('/dice-clicker');
    window.location.reload();
  }

  return (
    <>
      <div className="row">
        <button className="btn reset-btn" onClick={handleResetClick}>
          Restart
        </button>
      </div>
    </>
  );
}
