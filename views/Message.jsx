var React = require("react");
var NavBar = require('./NavBar');

class Message extends React.Component {
  render() {

    let message = this.props.message;

    const { authentication } = this.props;

    return (
      <NavBar authentication={authentication}>
        <div className="alert alert-warning alert-dismissible fade show" role="alert">
          <strong>{message}</strong>
        </div>
      </NavBar>
    );
  }
}

module.exports = Message;