var React = require("react");
var NavBar = require('../NavBar');

class NewJournal extends React.Component {
  render() {

    let templates = this.props.templates.map( template => {
      return (
        <option key = {template.id} value={template.id}>
            {template.name}
        </option>
        );
      });

    let inputs = this.props.inputs.map( input => {
      return (
        <form key = {input.id} className="user-form tweet-form" method="POST" action="/journals/complete">
          <div className="form-group tweet-attribute">
            <label htmlFor="inputTweet"><h3>What do you wish to say?</h3></label>
            <br/>
            <input type="hidden" name="id" id="id" value={input.id} />
            {input.starter}:
            <input type="text" className="form-control" name="object" id="object" placeholder="..."/>
            {input.addon}:
            <input type="text" className="form-control" name="reason" id="reason" placeholder="..."/>
          </div>
          <button name="submit" type="submit" className="btn btn-primary">Submit</button>
        </form>
      );
    });

    return (
      <NavBar>
        <form method="POST" action={"/journals/new"} id="entry">
          <h3>What do you want to focus on today?</h3>
          <select className="custom-select col-6 mb-3" name="id">
            <option selected>Choose...</option>
            {templates}
          </select>
          <div className="input-group-append mb-3">
            <button className="btn btn-outline-info" type="submit">Select</button>
          </div>
        </form>
        {inputs}
      </NavBar>
    );
  }
}

module.exports = NewJournal;