var React = require("react");
var NavBar = require('../NavBar');

class NewJournal extends React.Component {
  render() {

    return (
      <NavBar>
        <form action="/journals/photo/sent" encType="multipart/form-data" method="post">
          <input type="file" name="file-to-upload" />
          <input type="text" className="form-control" name="reason" id="reason" placeholder="Thoughts?"/>
          <input type="submit" value="Upload" />
        </form>
      </NavBar>
    );
  }
}

module.exports = NewJournal;