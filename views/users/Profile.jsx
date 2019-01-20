var React = require("react");
var NavBar = require('../NavBar');

class Profile extends React.Component {
  render() {
    return (
      <NavBar>
        <h1>Here is your profile page:</h1>
        <p>You have made {this.props[0]} basic entries.</p>
        <p>You have made {this.props[1]} random entries.</p>
        <p>You have made {this.props[2]} customised entries.</p>
        <p>You have posted {this.props[3]} photos.</p>
      </NavBar>
    );
  }
}

module.exports = Profile;