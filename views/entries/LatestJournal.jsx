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
        <div class="jumbotron">
          <h1>On {date} at {time}:</h1> 
          <p>You wrote: {starter}: {object}, {addon}: {reason}. </p> 
        </div>
      </NavBar>
    );
  }
}

module.exports = LatestJournal;