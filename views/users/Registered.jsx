var React = require("react");
var NavBar = require('../NavBar');

class Register extends React.Component {
  render() {

	const {authentication}=this.props;

    return (
      <NavBar authentication={authentication}>
        <h1>Registration Successful</h1>
      </NavBar>
    );
  }
}

module.exports = Register;