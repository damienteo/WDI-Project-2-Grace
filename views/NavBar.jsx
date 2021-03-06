var React = require('react');
import React, { Component } from 'react';

class NavBar extends React.Component {

  render() {

    const { authentication } = this.props;

    let userOptions = () => {

      if (authentication) {
        return (
          <React.Fragment>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Entries
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <a className="dropdown-item" href="/journals/new">New Entry</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/journals/random">New Random Entry</a>
                  <div className="dropdown-divider"></div>
                  <a className="dropdown-item" href="/customise/journals">Customise Entries</a>
                </div>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/photo/new">Post Photo<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/journals/history">History<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/users/profile">Profile<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/users/logout">Logout<span className="sr-only">(current)</span></a>
              </li>
            </ul>
            <form className="form-inline my-2 my-lg-0" method="POST" action={"/journals/search"} id="searchJournals">
              <input className="form-control mr-sm-2" type="search" placeholder="Search past entries" aria-label="Search" name="searchTerm" />
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
          </React.Fragment>
        )
      } else {
        return (
          <React.Fragment>
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <a className="nav-link" href="/users/login">Login<span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item active">
                <a className="nav-link" href="/users/register">Register<span className="sr-only">(current)</span></a>
              </li>
            </ul>
          </React.Fragment>
        )
      }
    }

    return (
      <html>
        <head>
          <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
          <link href="https://fonts.googleapis.com/css?family=Pacifico|Roboto|Raleway" rel="stylesheet" />
          <link rel="stylesheet" type="text/css" href="../styles/style.css" />
          <title>Grace</title>
        </head>
        <body>
          <nav className="navbar navbar-expand-lg navbar-light bg-white mb-3 rounded fixed-top border-bottom" >
            <a className="navbar-brand" id="graceLogo" href="/">Grace</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              {userOptions()}

            </div>
          </nav>
          <div className="container-fluid" id="pushFixed" >
            {this.props.children}
          </div>
          <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
          <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
        </body>
      </html>
    );
  }
}

module.exports = NavBar;
