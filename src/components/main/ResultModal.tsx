import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch } from 'react-redux';
import { payout } from '../../store/game-state.js';

const ResultModal = forwardRef((_, ref) => {
  const dialog = useRef<HTMLDialogElement>(null);

  const dispatch = useDispatch();
  useImperativeHandle(ref, () => {
    return {
      open() {
        dialog.current!.showModal();
      },
    };
  });

  function handleResetClick() {
    dispatch(payout());
    window.location.reload();
  }

  function handleCancel() {
    dialog.current!.close();
  }

  return createPortal(
    <dialog ref={dialog} className="result-modal">
      <p>Payout goal reached!</p>
      {/* <p>Dice rolls: {gameState.stats.diceRolls}</p>
      <p>Best roll: {gameState.stats.bestRoll}</p> */}
      <p>You will receive 1 coin, but lose your chips and upgrades.</p>
      <div>
        <form onSubmit={handleResetClick} method="dialog">
          <button className="btn reset-btn">Payout</button>
          <button className="btn reset-btn" onClick={handleCancel} type="reset">
            Cancel
          </button>
        </form>
      </div>
    </dialog>,
    document.getElementById('modal')!,
  );
});

export default ResultModal;
