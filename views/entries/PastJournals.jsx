var React = require("react");
var NavBar = require('../NavBar');

class LatestJournal extends React.Component {
  render() {

    let journals = this.props.list.map( journal => {

        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = journal.created_on.toLocaleDateString("en-US", dateOptions);
        const time = journal.to_char;
        const {object, reason, starter, addon, id} = journal;

        return (
            <div className="jumbotron">
              <h5><em>On {date} at {time},</em></h5> 
              <p><small>You wrote:</small></p>
              <h4>"{starter}: <strong>{object}</strong></h4>
              <h4>{addon}: <strong>{reason}</strong>"</h4> 
              <form method="GET" action="/edit/journal/" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-secondary mr-3 ml-3">Edit</button>
              </form>
              <form method="POST" action="/delete/journal?_method=DELETE" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-danger">Delete</button>
              </form>
            </div>
            );
        });

    return (
      <NavBar>
        {journals}
      </NavBar>
    );
  }
}

module.exports = LatestJournal;