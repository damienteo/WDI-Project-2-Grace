var React = require("react");
var NavBar = require('./NavBar');

class Message extends React.Component {
  render() {

  	let message = this.props.message;

    return (
      <NavBar>
        <h1>{message}</h1>
      </NavBar>
    );
  }
}

module.exports = Message;