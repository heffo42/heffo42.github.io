import React, {Component} from 'react';

class ShoppingList extends React.Component {
  render() {
    return (<div className="shopping-list">
      <h1>
        Shopping list for {this.props.name}
      </h1>
      <ul>
        <li>
          cats
        </li>
        <li>
          Whats app
        </li>
        <li>
          Oculus
        </li>
      </ul>
    </div>)
  }
}
