var React = require("react");
var NavBar = require('../NavBar');

class Home extends React.Component {
  render() {

    const { authentication } = this.props;

    return (
      <NavBar authentication={authentication}>
        <form className="user-form col-6" method="POST" action="/users/loggedin">
          <div className="form-group user-attribute">
            <label htmlFor="inputUsername">Username</label>
            <input type="text" className="form-control" name="name" id="name" placeholder="Enter your username" />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword">Password</label>
            <input type="password" className="form-control" name="password" id="password" placeholder="Enter your password" />
          </div>
          <button name="submit" type="submit" className="btn btn-primary">Login</button>
        </form>
      </NavBar>
    );
  }
}

module.exports = Home;