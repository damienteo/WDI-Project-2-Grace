var React = require("react");
var NavBar = require('../NavBar');

class Customise extends React.Component {
  render() {

    const {authentication}=this.props;

    let templates = this.props.results.list.map( template => {

        const {id, name, starter, addon} = template;

        return (
            <div className="jumbotron" key = {id}>
              <h5><em>Template:<strong>{name}</strong>,</em></h5>
              <h4>Prompt: <strong>{starter}</strong></h4>
              <h4>Elaboration: <strong>{addon}</strong>"</h4> 
              <form method="POST" action="/edit/template/" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-secondary mr-3 ml-3">Edit</button>
              </form>
              <form method="POST" action="/delete/template?_method=DELETE" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-danger">Delete</button>
              </form>
            </div>
            );
        });

    return (
      <NavBar authentication={authentication}>
        <form className="user-form customise-form mb-3" method="POST" action="/customise/complete">
          <div className="form-group customise-attribute">
            <label htmlFor="customiseTemplate"><h3>Make a new customised Template</h3></label>
            <br/>
            What is the name of your new template?
            <input type="text" className="form-control" name="name" id="starter" placeholder="..."/>
            What is the subject of the entry? (e.g. Is it a specific moment, an object, or a person?)
            <input type="text" className="form-control" name="starter" id="starter" placeholder="..."/>
            What do you want to focus on for the subject? (e.g. Did it impact your life, changed your mood, or helped you learn something?)
            <input type="text" className="form-control" name="addon" id="addon" placeholder="..."/>
          </div>
          <button name="submit" type="submit" className="btn btn-primary">Submit</button>
        </form>
        <h3>Your previous customised templates are as follows: </h3>
        {templates}
      </NavBar>
    );
  }
}

module.exports = Customise;