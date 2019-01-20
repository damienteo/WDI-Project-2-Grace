var React = require("react");
var NavBar = require('../NavBar');

class PastJournal extends React.Component {
  render() {

    let journals = this.props.list.map( journal => {

      var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = journal.created_on.toLocaleDateString("en-US", dateOptions);
      const time = journal.to_char;
      const { reason, starter, addon, id, category} = journal;

      if (category === 'Photo') {
        let object = "../../uploads/"+journal.object;
        return (
          <div className="card d-inline-block m-2" style={{  width: '20rem'}} key={id}>
            <img src={object} className="card-img-top img-fluid" alt="Image not found" id="cardPhoto" />
            <div className="card-body">
              <h5 className="card-title">{reason}</h5>
            </div>
             <div class="card-footer text-muted">
              Posted on: <br /> {date} at {time}
            </div>
          </div>
        );
      } else {
        let {object} = journal;
        return (
          <div class="card text-center d-inline-block m-2" style={{  width: '20rem',}} key={id}>
            <div class="card-header">
              {category}
            </div>
            <div class="card-body" style={{  height: '16.6rem',}}>
              <h5 class="card-title">{starter}: <strong>{object}</strong></h5>
              <p class="card-text">{addon}: <strong>{reason}</strong></p>
              <form method="POST" action="/edit/journal/" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-secondary mr-3 ml-3">Edit</button>
              </form>
              <form method="POST" action="/delete/journal?_method=DELETE" className = "d-inline-block">
                  <input type="hidden" name="id" id="id" value={id} />
                  <button type="submit" className="btn btn-danger">Delete</button>
              </form>
            </div>
            <div class="card-footer text-muted">
              Posted on: <br /> {date} at {time}
            </div>
          </div>
        );
      }
    });

    return (
      <NavBar>
        <form method="POST" action={"/journals/sortby"} id="pastJournalsForm" className="mb-3">
          <select className="custom-select" name="sort">
            <option selected>Choose...</option>
            <option value="dateAsc">
              Recent entries first
            </option>
            <option value="dateDesc">
              Older entries first
            </option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">Sort Entries</button>
          </div>
        </form>
        <div id="journalsCentered">
          {journals}
        </div>
      </NavBar>
    );
  }
}

module.exports = PastJournal;