import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import { reset } from '../../store/game-state.js';
import { GameState } from '../../store/model/game-state.model.js';

const ResultModal = forwardRef((_, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);
  const gameState = useSelector(
    (state: { gamestate: GameState }) => state.gamestate,
  );
  const dispatch = useDispatch();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current!.showModal();
      },
    };
  });

  function handleResetClick() {
    dispatch(reset());
    window.location.reload();
  }

  return createPortal(
    <dialog
      ref={dialog}
      className="result-modal"
      onClose={() => handleResetClick()}
    >
      <p>VICTORY!</p>
      <p>Dice rolls: {gameState.stats.diceRolls}</p>
      <p>Best roll: {gameState.stats.bestRoll}</p>
      <div>
        <form onSubmit={handleResetClick} method="dialog">
          <button className="btn reset-btn">Restart</button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')!,
  );
});

export default ResultModal;
