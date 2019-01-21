var React = require("react");
var NavBar = require('./NavBar');

class Index extends React.Component {
  render() {

  	const {authentication, message}=this.props;

    return (
    <NavBar authentication={authentication}>
	    <div className="container-fluid bg-white text-center align-middle rounded mb-3" id="indexContainer">
		 	<h1><span id="graceHeadline">Grace</span></h1>
		 	<h2 className="indexText">The Benefits of Being Grateful.</h2>
		</div>
		<div className="container-fluid bg-white text-center rounded mb-3" id="indexContainer">
			<div className="indexSection">
			 	<h1 className="indexText pt-5"><strong>What is Grace?</strong></h1>
			 	<h3 className="indexText"> Grace is an online gratitude journal.
				 </h3>
			 	<h3 className="indexText"> It is a tool to keep track of good things in life. 
				 </h3>
				 <h3 className="indexText">It helps us focus on things which we are grateful for.
				 </h3>
			</div>
		</div>	
		<div className="container-fluid bg-white text-center rounded mb-3" id="indexContainer">
		 	<h1 className="indexText pt-4"><strong>Benefits</strong></h1>
		 	<h2 className="indexText">
				Relaxation
			</h2>
			<h2 className="indexText">
				Calmness
			</h2>
			<h2 className="indexText">
				Self-awareness
			</h2>
			<h2 className="indexText">
				Understand what is important to you
			</h2>
		</div>	    
    </NavBar>
    );
  }
}

module.exports = Index;