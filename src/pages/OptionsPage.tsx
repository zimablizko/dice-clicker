import { useDispatch } from 'react-redux';
import { reset } from '../store/game-state';

export default function OptionsPage() {
  const dispatch = useDispatch();
  function handleResetClick() {
    dispatch(reset());
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
