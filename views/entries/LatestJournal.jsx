var React = require("react");
var NavBar = require('../NavBar');

class LatestJournal extends React.Component {
  render() {

    console.log(this.props);

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = this.props[1].created_on.toLocaleDateString("en-US", dateOptions);
    const time = this.props[1].to_char;
    const {object, reason, starter, addon} = this.props[1];
    const {message} = this.props[0];

    return (
      <NavBar>
        <h5>{message}:</h5>
        <div className="jumbotron">
          <h5><em>On {date} at {time},</em></h5> 
          <p><small>You wrote:</small></p>
          <h4>"{starter}: <strong>{object}</strong></h4>
          <h4>{addon}: <strong>{reason}</strong>"</h4> 
        </div>
      </NavBar>
    );
  }
}

module.exports = LatestJournal;