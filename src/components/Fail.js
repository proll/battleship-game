import React from 'react';

class Fail extends React.Component {
  render() {
  	return (
      <div className="miscPage">
        <h1>Fail</h1>
        <a href="." onClick={() => this.resetGame()}>Again?</a>
      </div>
  	)
  }

  resetGame() {
    localStorage.removeItem(`board-points`);
    localStorage.removeItem(`board-shiphit`);
  }
}

export default Fail;