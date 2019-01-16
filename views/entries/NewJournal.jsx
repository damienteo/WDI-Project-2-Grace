var React = require("react");
var NavBar = require('../NavBar');

class NewJournal extends React.Component {
  render() {

    let templates = this.props.templates.map( template => {
      return (
        <option value={template.id}>
            {template.name}
        </option>
        );
      });

    let inputs = this.props.inputs.map( input => {
      return (
        <form className="user-form col-6 tweet-form" method="POST" action="/journals/complete">
          <div className="form-group tweet-attribute">
            <label htmlFor="inputTweet">What do you wish to say?</label>
            <input type="hidden" name="id" id="id" value={input.id} />
            {input.starter}
            <input type="text" className="form-control" name="object" id="object" placeholder="tweeting..."/>
            {input.addon}
            <input type="text" className="form-control" name="reason" id="reason" placeholder="tweeting..."/>
          </div>
          <button name="submit" type="submit" className="btn btn-primary">Submit</button>
        </form>
      );
    });

    return (
      <NavBar>
        <form method="POST" action={"/journals/new"} id="entry">
          <p>What do you want to focus on today?</p>
          <select className="custom-select" name="id">
            <option selected>Choose...</option>
            {templates}
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">See user's tweets</button>
          </div>
        </form>
        {inputs}
      </NavBar>
    );
  }
}

module.exports = NewJournal;