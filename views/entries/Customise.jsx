var React = require("react");
var NavBar = require('../NavBar');

class Customise extends React.Component {
  render() {

    const {authentication}=this.props;

    let templates = this.props.results.list.map( template => {

        const {id, name, starter, addon} = template;

        return (

            <div className="card text-center m-2" style={{  width: '40%'}} key={id}>
              <div className="card-header" id="mutedSection">
                Template:<strong>{name}</strong>
              </div>
              <div className="card-body">
                <p className="card-text text-justify" id="lastLineAlign">Prompt: <strong>{starter}</strong></p>
                <p className="card-text text-justify" id="lastLineAlign">Elaboration: <strong>{addon}</strong></p>
                <form method="POST" action="/edit/template/" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-secondary mr-3 ml-3">Edit</button>
                </form>
                <form method="POST" action="/delete/template?_method=DELETE" className = "d-inline-block">
                    <input type="hidden" name="id" id="id" value={id} />
                    <button type="submit" className="btn btn-danger">Delete</button>
                </form>
              </div>
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
            What do you want to focus on? (e.g. Is it a person, an object, or a moment?)
            <input type="text" className="form-control" name="starter" id="starter" placeholder="..."/>
            What sort of impact are you looking at? (e.g. Did it change your life, changed your mood, or helped you learn something?)
            <input type="text" className="form-control" name="addon" id="addon" placeholder="..."/>
          </div>
          <button name="submit" type="submit" className="btn btn-outline-primary">Submit</button>
        </form>
        <h3>Your previous customised templates are as follows: </h3>
        {templates}
      </NavBar>
    );
  }
}

module.exports = Customise;