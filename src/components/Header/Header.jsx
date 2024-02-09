import './Header.css';

export default function Header({ isGameOn, isPlayersTurn }) {
  return (
    <header className='header'>
      <h1 className='header__title'>Battleship</h1>
      <p className='header__game-status-text'>
        {
          !isGameOn ? 'Place the ships' :
            isPlayersTurn ? 'Your turn' : 'Opponent\'s turn'
        }
      </p>
    </header>
  );
}
