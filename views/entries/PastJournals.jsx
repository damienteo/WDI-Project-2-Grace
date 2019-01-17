var React = require("react");
var NavBar = require('../NavBar');

class LatestJournal extends React.Component {
  render() {

    let journals = this.props.list.map( journal => {

        var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const date = journal.created_on.toLocaleDateString("en-US", dateOptions);
        const time = journal.to_char;
        const {object, reason, starter, addon} = journal;

        return (
            <div className="jumbotron">
              <h5><em>On {date} at {time},</em></h5> 
              <p><small>You wrote:</small></p>
              <h4>"{starter}: <strong>{object}</strong></h4>
              <h4>{addon}: <strong>{reason}</strong>"</h4> 
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

// <form method="GET" action={"/edit/tweet/" + journal.id } className = "d-inline-block">
//                   <button type="submit" className="btn btn-secondary mr-3 ml-3">Edit</button>
//               </form>
//               <form method="POST" action={"/delete/tweet/" + journal.id + "?_method=DELETE"} className = "d-inline-block">
//                   <button type="submit" className="btn btn-danger">Delete</button>
//               </form>