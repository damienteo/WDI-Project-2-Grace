var React = require("react");
var NavBar = require('./NavBar');

class Index extends React.Component {
  render() {

  	const {authentication}=this.props;

    return (
      <NavBar authentication={authentication}>
        <h1>This is the Index page.</h1>
      </NavBar>
    );
  }
}

module.exports = Index;