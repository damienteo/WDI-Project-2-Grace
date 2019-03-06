var React = require("react");
var NavBar = require('../NavBar');

class NewPhoto extends React.Component {
  render() {

    const { authentication } = this.props;

    return (
      <NavBar authentication={authentication}>
        <form action="/photo/sent" encType="multipart/form-data" method="post" className="user-form">
          <div className="form-group">
            <input type="file" className="form-control mb-3" name="file-to-upload" />
            <input type="hidden" className="form-control" name="templateId" id="templateId" value='5' />
            <input type="text" className="form-control mb-3" name="reason" id="reason" placeholder="Thoughts?" />
            <input type="submit" className="btn btn-outline-primary" value="Upload" />
          </div>
        </form>
      </NavBar>
    );
  }
}

module.exports = NewPhoto;