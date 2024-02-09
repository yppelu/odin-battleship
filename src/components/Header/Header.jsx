import './Header.css';

export default function Header({ isGameOn, isPlayersTurn, victory }) {
  const isPlayerWin = victory.winner === 'player';

  return (
    <header className='header'>
      <h1 className='header__title'>Battleship</h1>
      <p
        className={victory.isVictory ? isPlayerWin
          ? 'header__game-status-text header__game-status-text--victory'
          : 'header__game-status-text header__game-status-text--defeat'
          : 'header__game-status-text'
        }
      >
        {
          victory.isVictory ? isPlayerWin ? 'Victory!' : 'Defeat!'
            : !isGameOn ? 'Place the ships'
              : isPlayersTurn ? 'Your turn' : 'Opponent\'s turn'
        }
      </p>
    </header>
  );
}
