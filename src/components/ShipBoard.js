import React from 'react';
import Ship from './Ship';

class ShipBoard extends React.Component {
	render() {
		return (
      <ul className="ship-board">
        {
            Object
              .keys(this.props.shipTypes)
              .map((shipName) => {
                  return <Ship 
                      key={shipName}
                      shipName={shipName}
                      size={this.props.shipTypes[shipName].size}
                      hit={this.props.shipHit[shipName]}
                    />
                }
              )
        }
      </ul>
		)
	}
}

ShipBoard.propTypes = {
  shipTypes: React.PropTypes.object.isRequired,
  shipHit: React.PropTypes.object.isRequired
}

export default ShipBoard;