import './GridControlsBlock.css';

export default function GridControlsBlock({ isGameOn, setNewRandomShips, startGame, endGame }) {
  return (
    <footer className='grid-controls'>
      {
        isGameOn ? null :
          <button
            className='grid-controls__grid-control-btn'
            type='button'
            onClick={setNewRandomShips}
          >
            Randomize &#8635;
          </button>
      }
      <button
        className='grid-controls__start-game-btn'
        type='button'
        onClick={() => {
          isGameOn ? endGame() : startGame();
        }}
      >
        {
          isGameOn ? 'End Game' : 'Start Game'
        }
      </button>
    </footer>
  );
}
