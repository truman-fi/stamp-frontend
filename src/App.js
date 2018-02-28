import React, { Component } from 'react';

import { connect } from 'react-redux';

import { Route, Switch, Redirect, withRouter } from 'react-router-dom'

import LoggedOutContainer from './components/loggedout/LoggedOutContainer';
import HomeContainer from './components/home/HomeContainer';
import LectureContainer from './components/lecture/LectureContainer';

import { currentUser, logOut } from './actions/authActions';


class App extends Component {

  componentDidMount = () => {
    this.props.currentUser()
  }

  componentDidUpdate = () => {

  }

  render() {
    console.log(this.props);
    return (
      <div className="App">
        <h1> Scribo </h1>
        <img src='https://i.pinimg.com/originals/be/a8/a5/bea8a582a7376eee317c7a17f2f793ea.jpg' alt='WORKS'/>

        <Switch>
          <Route exact path='/' render={()=>
            {
              return this.props.auth.userIsLoggedIn ? <Redirect to="/home"/> : <LoggedOutContainer />
            }
            } />

         <Route exact path='/home' render={()=>
            {
              return this.props.auth.userIsLoggedIn ? <HomeContainer /> : <LoggedOutContainer />
            }
            } />

        <Route exact path='/lecture/:id' render={(routerProps)=>
           {
             return this.props.auth.userIsLoggedIn ? <LectureContainer id={routerProps.match.params.id}  /> : <LoggedOutContainer />
           }
           } />

        </Switch>

        <div>
          {this.renderLogoutButton()}
        </div>

      </div>
    );
  }

  renderLogoutButton = () => {
    if (this.props.auth.userIsLoggedIn) {
      return (<button onClick={ this.props.logOut }> Log Out </button>)
    }
  }

}

export default withRouter(connect((state) => ({ auth: state.auth }), { currentUser, logOut })(App));
