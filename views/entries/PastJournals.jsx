var React = require("react");
var NavBar = require('../NavBar');

class PastJournal extends React.Component {
  render() {

    const { authentication } = this.props;

    let journals = this.props.results.list.map(journal => {

      var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = journal.created_on.toLocaleDateString("en-SG", dateOptions);
      const time = journal.to_char;
      const { reason, starter, addon, id, category } = journal;

      if (category === 'Photo') {
        let object = journal.object;
        return (
          <div className="card text-center m-2" style={{ width: '95%' }} key={id}>
            <div className="card-header" id="mutedSection">
              {category}
            </div>
            <img src={object} className="card-img-top img-fluid" alt="Image not found" id="cardPhoto" />
            <div className="card-body">
              <p className="card-text text-justify" id="lastLineAlign">{reason}</p>
            </div>
            <div className="card-footer text-muted">
              On {date} at {time}
            </div>
          </div>
        );
      } else {
        let { object } = journal;
        return (
          <div className="card text-center m-2" style={{ width: '95%' }} key={id}>
            <div className="card-header" id="mutedSection">
              {category}
            </div>
            <div className="card-body">
              <h5 className="card-title">{starter}: <strong>{object}</strong></h5>
              <p className="card-text text-justify" id="lastLineAlign">{addon}: <strong>{reason}</strong></p>
              <form method="POST" action="/edit/journal/" className="d-inline-block">
                <input type="hidden" name="id" id="id" value={id} />
                <button type="submit" className="btn btn-outline-secondary mr-3 ml-3">Edit</button>
              </form>
              <form method="POST" action="/delete/journal?_method=DELETE" className="d-inline-block">
                <input type="hidden" name="id" id="id" value={id} />
                <button type="submit" className="btn btn-outline-danger">Delete</button>
              </form>
            </div>
            <div className="card-footer text-muted">
              On {date} at {time}
            </div>
          </div>
        );
      }
    });

    return (
      <NavBar authentication={authentication}>
        <div className="row">
          <div className="col-2 d:inline-block m-3 text-center">
            <div id="fixedPosition">
              <form method="POST" action={"/journals/sortby"} id="sortBasicForm" className="mb-3 container-fluid">
                <button className="btn btn-outline-primary my-sm-0 d-block" type="submit" style={{ width: '110%' }} name="choice" value="Recent">Recent Entries</button>
                <button className="btn btn-outline-primary my-sm-0 d-block" type="submit" style={{ width: '110%' }} name="choice" value="Older">Older Entries</button>
                <button className="btn btn-outline-success my-sm-0 d-block" type="submit" style={{ width: '110%' }} name="choice" value="Basic">Basic</button>
                <button className="btn btn-outline-success my-sm-0 d-block" type="submit" style={{ width: '110%' }} name="choice" value="Random">Random</button>
                <button className="btn btn-outline-success my-sm-0 d-block" type="submit" style={{ width: '110%' }} name="choice" value="Customised">Customised</button>
                <button className="btn btn-outline-info my-sm-0 d-block" type="submit" name="choice" style={{ width: '110%' }} value="Photo">Photos</button>
              </form>
            </div>
          </div>
          <div className="col-9 d:inline-block">
            {journals}
          </div>
        </div>
      </NavBar>
    );
  }
}

module.exports = PastJournal;