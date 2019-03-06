var React = require("react");
var NavBar = require('../NavBar');

class RandomJournal extends React.Component {
  render() {

    const { authentication } = this.props;

    let inputs = this.props.journals.inputs.map(input => {
      return (
        <form key={input.id} className="user-form tweet-form" method="POST" action="/journals/complete">
          <div className="form-group tweet-attribute">
            <label htmlFor="inputTweet"><h3>What do you wish to say?</h3></label>
            <br />
            <input type="hidden" name="id" id="id" value={input.id} />
            {input.starter}:
            <input type="text" className="form-control" name="object" id="object" placeholder="..." />
            {input.addon}:
            <input type="text" className="form-control" name="reason" id="reason" placeholder="..." />
          </div>
          <button name="submit" type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
      );
    });

    return (
      <NavBar authentication={authentication}>
        <form method="GET" action={"/journals/random"} id="entry">
          <div className="input-group-append mb-3">
            <button className="btn btn-outline-info" type="submit">Generate New Prompt</button>
          </div>
        </form>
        {inputs}
      </NavBar>
    );
  }
}

module.exports = RandomJournal;


