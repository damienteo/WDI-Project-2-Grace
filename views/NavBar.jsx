var React = require('react');
import React, { Component } from 'react';

class NavBar extends React.Component{
    render(){
        return(
            <html>
            <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossOrigin="anonymous" />
            <title>Tweedr</title>
            </head>
            <body className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-light bg-light mb-3">
                  <a className="navbar-brand" href="/">Tweedr</a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/login">Login<span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/new">Register<span className="sr-only">(current)</span></a>
                      </li>    
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/tweet">Tweet<span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/">Home<span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/profile">Profile<span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/following">Following<span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/followers ">Followers<span className="sr-only">(current)</span></a>
                      </li>   
                      <li className="nav-item active">
                        <a className="nav-link" href="/user/logout">Logout<span className="sr-only">(current)</span></a>
                      </li>    
                    </ul>
                  </div>
                </nav>
                <div className="container">
                  <div className="row">
                    <div className="col-12">
                      {this.props.children}
                    </div>
                  </div>
                </div>
                <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossOrigin="anonymous"></script>
                <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.2.1/js/bootstrap.min.js" integrity="sha384-B0UglyR+jN6CkvvICOB2joaf5I4l3gm9GU6Hc1og6Ls7i6U/mkkaduKaBhlAXv9k" crossOrigin="anonymous"></script>
            </body>
          </html>
            );
    }
}

module.exports =NavBar;
