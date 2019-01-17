var React = require("react");
var NavBar = require('../NavBar');

class LatestJournal extends React.Component {
  render() {

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = this.props.created_on.toLocaleDateString("en-US", dateOptions);
    const time = this.props.to_char;
    const {object, reason, starter, addon} = this.props;

    return (
      <NavBar>
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