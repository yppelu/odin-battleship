import './Header.css';

export default function Header({ isGameOn, isPlayersTurn, winner }) {
  return (
    <header className='header'>
      <h1 className='header__title'>Battleship</h1>
      <p
        className={
          winner === 'player'
            ? 'header__game-status-text header__game-status-text--victory'
            : winner === 'ai'
              ? 'header__game-status-text header__game-status-text--defeat'
              : 'header__game-status-text'
        }
      >
        {
          winner === 'player' ? 'Victory!' : winner === 'ai' ? 'Defeat!'
            : !isGameOn ? 'Place the ships'
              : isPlayersTurn ? 'Your turn' : 'Opponent\'s turn'
        }
      </p>
    </header >
  );
}
