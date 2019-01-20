var React = require("react");
var NavBar = require('../NavBar');

class Photos extends React.Component {
  render() {

    let Photos = this.props.list.map( Photo => {

      var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const date = Photo.created_on.toLocaleDateString("en-US", dateOptions);
      const time = Photo.to_char;
      const {reason, id} = Photo;
      const object = "../../uploads/"+Photo.object;

      return (
        <div className="card d-inline-block m-2" style={{  width: '20rem'}} key={id}>
          <img src={object} class="card-img-top img-fluid" alt="Image not found" id="cardPhoto"/>
          <div className="card-body">
            <h5 className="card-title">{reason}</h5>
            <p className="card-text">On {date} at {time}</p>
          </div>
        </div>
      );
    });

    return (
      <NavBar>
        <form method="POST" action={"/Photos/sortby"} id="pastPhotosForm" className="mb-3">
          <select className="custom-select" name="sort">
            <option selected>Choose...</option>
            <option value="dateAsc">
              Older entries first
            </option>
            <option value="dateDesc">
              Recent entries first
            </option>
          </select>
          <div className="input-group-append">
            <button className="btn btn-outline-info" type="submit">Sort Entries</button>
          </div>
        </form>
        {Photos}
      </NavBar>
    );
  }
}

module.exports = Photos;