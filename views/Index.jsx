var React = require("react");
var NavBar = require('./NavBar');

class Index extends React.Component {
  render() {

    return (
      <NavBar>
        <h1>This is the Index page.</h1>
      </NavBar>
    );
  }
}

module.exports = Index;