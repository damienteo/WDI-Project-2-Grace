var React = require("react");
var NavBar = require('../NavBar');

class Register extends React.Component {
  render() {

    const { authentication } = this.props;

    return (
      <NavBar authentication={authentication}>
        <form className="user-form col-6" method="POST" action="/users/registered">
          <div className="form-group user-attribute">
            <label htmlFor="inputUsername">Username</label>
            <input type="text" className="form-control" name="name" id="name" placeholder="Enter desired username" />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" name="password" id="password" placeholder="Enter desired password" />
          </div>
          <button name="submit" type="submit" className="btn btn-primary">Register</button>
        </form>
      </NavBar>
    );
  }
}

module.exports = Register;