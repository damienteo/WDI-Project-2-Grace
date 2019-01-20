var React = require("react");
var NavBar = require('./NavBar');

class Message extends React.Component {
  render() {

  	let message = this.props.message;

    return (
      <NavBar>
      	<div class="alert alert-warning alert-dismissible fade show" role="alert">
		  <strong>{message}</strong>
		</div>
      </NavBar>
    );
  }
}

module.exports = Message;