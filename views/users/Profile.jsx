var React = require("react");
var NavBar = require('../NavBar');

class Profile extends React.Component {

  render() {

    const {basic, random, customised, photo, firstDay, firstTime, lastDay, lastTime} = this.props.results.list[0];

    const {authentication}=this.props;

    if (firstDay == undefined) {
      return (
        <NavBar authentication={authentication}>
          <h1>Here is your profile page:</h1>
          <p>You have made {basic} basic entries.</p>
          <p>You have made {random} random entries.</p>
          <p>You have made {customised} customised entries.</p>
          <p>You have posted {photo} photos.</p>
          <button className="btn btn-outline-danger my-sm-0 d-block" type="submit"  name="choice" value="Photo">Delete your Account</button>
        </NavBar>
      );
    } else {
      return (
        <NavBar authentication={authentication}>
          <h1>Here is your profile page:</h1>
          <p>You have made {basic} basic entries.</p>
          <p>You have made {random} random entries.</p>
          <p>You have made {customised} customised entries.</p>
          <p>You have posted {photo} photos.</p>
          <p>Your first post was on {firstDay} at {firstTime}.</p>
          <p>Your most recent post was on {lastDay} at {lastTime}.</p>
          <button className="btn btn-outline-danger my-sm-0 d-block" type="submit"  name="choice" value="Photo">Delete your Account</button>
        </NavBar>
      );
    }
  }
}

module.exports = Profile;