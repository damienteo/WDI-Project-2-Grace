var React = require("react");
var NavBar = require('../NavBar');

class NewPhoto extends React.Component {
  render() {

    return (
      <NavBar>
        <div className = "mt-5 mb-5"></div>
        <form action="/journals/photo/sent" encType="multipart/form-data" method="post">
          <input type="file" name="file-to-upload" />
          <input type="hidden" name="templateId" id="templateId" value='5' />
          <input type="text" className="form-control" name="reason" id="reason" placeholder="Thoughts?"/>
          <input type="submit" value="Upload" />
        </form>
      </NavBar>
    );
  }
}

module.exports = NewPhoto;