var React = require("react");
var NavBar = require('../NavBar');

class EditJournal extends React.Component {
  render() {

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = this.props.created_on.toLocaleDateString("en-US", dateOptions);
    const time = this.props.to_char;
    const {object, reason, starter, addon, id} = this.props;

    return (
      <NavBar>
        <div className="jumbotron">
          <h5><em>On {date} at {time},</em></h5> 
          <p><small>You wrote:</small></p>
          <form className="user-form col-6 tweet-form" method="POST" action="/edited/journal/">
            <div className="form-group tweet-attribute">
              <input type="hidden" name="id" id="id" value={id} />
              <h4>{starter}: 
                <input type="text" className="form-control" name="object" id="object" defaultValue={object} />
              </h4>
              <h4>{addon}: 
                <input type="text" className="form-control" name="reason" id="reason" defaultValue={reason} />
              </h4> 
              <label htmlFor="inputTweet">How do you want your entry to be?</label>
            </div>
            <button name="submit" type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </NavBar>
    );
  }
}

module.exports = EditJournal;