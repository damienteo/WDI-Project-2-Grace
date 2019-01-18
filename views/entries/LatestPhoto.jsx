var React = require("react");
var NavBar = require('../NavBar');

class LatestPhoto extends React.Component {
  render() {

    var dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = this.props[1].created_on.toLocaleDateString("en-US", dateOptions);
    const time = this.props[1].to_char;
    const {reason} = this.props[1];
    const {message} = this.props[0];
    const object = "../../uploads/"+this.props[1].object;


    return (
      <NavBar>
        <h5>{message}:</h5>
        <div className="card d-inline-block m-2" style={{  width: '20rem'}}>
          <img src={object} className="card-img-top" alt="Image not found" />
          <div className="card-body">
            <h5 className="card-title">{reason}</h5>
            <p className="card-text">On {date} at {time}</p>
          </div>
        </div>
      </NavBar>
    );
  }
}

module.exports = LatestPhoto;

// <a href={"/edit/song/" + songs.id}class="btn btn-secondary mr-2  mb-2">Edit</a>
//             <form method="POST" action={"/delete/song/" + songs.id + "?_method=DELETE"} class = "d-inline-block">
//                 <button type="submit" className="btn btn-danger mb-2">Delete</button>
//             </form>


// <div className="jumbotron">
//           <h5><em>On {date} at {time},</em></h5> 
//           <p><small>You posted:</small></p>
//           <img src={object} alt="Smiley face" />
//           <h4><strong>{reason}</strong>"</h4> 
//         </div>