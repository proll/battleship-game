import React from 'react';

class ScoreBoard extends React.Component {
	render() {
		return (
      <div className="score-board">
        <span>{this.props.score} successful hit{(this.props.score > 1) ? 's' : ''}</span>
        <span>{this.props.hitleft} hit{(this.props.hitleft > 1) ? 's' : ''} left</span>
      </div>
		)
	}
}

ScoreBoard.propTypes = {
  score: React.PropTypes.number.isRequired,
  hitleft: React.PropTypes.number.isRequired
}

export default ScoreBoard;