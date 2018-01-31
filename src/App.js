import React, { Component } from 'react';
import './ui-toolkit/css/nm-cx/main.css'
import { connect } from 'react-redux';
import { selectPerson, returnToSearch } from './state/actions';

const genId = (str1, str2, str3) => {
  const megaStr = '' + str1 + str2 + str3;
  const chars = [];
  for (let i = 0; i < megaStr.length; i++) {
    const randomVal = Math.floor(Math.random() * 3 * megaStr.charCodeAt(i));
    if (randomVal % 3 === 0) {
      chars.push(i);
    } else {
      chars.push(String.fromCharCode(randomVal));
    } if (i === str1.length || i === str2.length) chars.push('-')
  }
  return chars.join('');
}

class User {
  constructor(
    name,
    city,
    industry,
    hobbies,
    email
  ) {
    this.name = name;
    this.city = city;
    this.industry = industry;
    this.hobbies = hobbies;
    this.email = email;
    this.id = genId(email, industry, city);
  }
}
const initialState = {
  userPage: undefined,
  users: [
    new User('Bobby', 'Los Angeles', 'Software Development', 'Many many awesome fun hobbies', 'email@email.com'),
    new User('Henry', 'Seattle', 'Software Production', 'TV shows', 'root@email.com'),
    new User('Sofie', 'Boulder', 'Software Engineer', 'Gardening', 'souped up@email.com'),
    new User('Miranda', 'Detroit', 'Mechanic', 'Video Games', 'trippers@email.com'),
    new User('Jerome', 'NYC', 'Physicist', 'Reading', 'email@mailamail.com'),
    new User('Millie', 'Hawkins, Indiana', 'ESP', 'Blowing up things from the upside down', 'hoppin@email.com'),
    new User('Train', 'Oaklahoma City', 'Real Engineer', 'choo choo', 'chooc.choo@email.com'),
  ]
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      peopleVal: '',
      peopleMsg: '',
      peopleErr: false,
    }
    this.onPeopleIn = this.onPeopleIn.bind(this)
    this.onSbmClick = this.onSbmClick.bind(this)
    this.onPeopleClick = this.onPeopleClick.bind(this)
    this.onBackBtn = this.onBackBtn.bind(this)

  }

  onPeopleIn({ target }) {
    if (target.value.length === 0) {
      this.setState({ peopleVal: target.value, peopleErr: true, peopleMsg: 'Please enter a value to search on.', peopleSelect: false, peopleRspMsg: '', disableSbmBtn: true })
    } else {
      this.setState({ peopleVal: target.value, peopleErr: false, peopleMsg: '', peopleSelect: false })
    }
  }

  onSbmClick(evt) {
    evt.preventDefault();
  }

  onPeopleClick({ target }) {
    let personSelected = []
    this.props.users.forEach((user) => {
      if (user.id.indexOf(target.id) === -1) { return; }
      personSelected.push(user)
      this.props.selectPerson({ peopleSelect: true, peopleSelected: user })
    })
  }

  onBackBtn(evt) {
    this.props.backBtn({ peopleSelect: false })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">{this.props.title}</h1>
        </header>
        <p className="App-intro"></p>
        {!this.props.peopleSelect &&
          <form class="card" onSubmit={this.onSbmClick}>
            <div>
              <div class="row">
                <div class="small-5 columns md-text-field with-floating-label icon-left">
                  <input type="search" id="people_in" placeholder='search' value={this.state.peopleVal} onChange={this.onPeopleIn} />
                  <label for="people_in"></label>
                  <span class="error">{this.state.peopleMsg}</span>
                  <span class="icon icon-sysicon-search"></span>
                </div>
                <div class="small-7 columns"></div>
              </div>
            </div>
            <div>
              <div class="row">
                <div class="small-2 columns"></div>
                <div class="small-2 columns">
                  <RenderPeople users={this.props.users} search={this.state.peopleVal} onClick={this.onPeopleClick} />
                </div>
                <div class="small-8 columns"></div>
              </div>
            </div>
          </form>
        }
        {this.props.peopleSelect &&
          <div class="card">
            <div class="row">
              <div class="row">
                <button id="backBtn" class="large-1 columns" onClick={this.onBackBtn} >Back </button>
              </div>
              <div class="row">
                <div id="peopleName" class="large-12 columns" ><span class="label small">Name: </span>{this.props.peopleSelected.name}</div>
              </div>
              <div class="row">
                <div id="peopleCityr" class="large-2 columns"><span class="label small">City: </span>{this.props.peopleSelected.city}</div>
                <div class="large-10 columns" ></div>
              </div>
              <div class="row">
                <div id="peopleInd" class="large-6 columns" ><span class="label small">Industry: </span>{this.props.peopleSelected.industry}</div>
                <div class="large-6 columns" ></div>
              </div>
              <div class="row">
                <div id="peopleHobs" class="large-12 columns" ><span class="label small">Hobbies: </span>{this.props.peopleSelected.hobbies}</div>
              </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

class RenderPeople extends Component {
  render() {
    let rows = []
    this.props.users.forEach((user) => {
      if (user.name.indexOf(this.props.search) === -1) { return; }
      rows.push(<div id={user.id} onClick={this.props.onClick}>{user.name}</div>)
    })
    return (
      <div>{rows}</div>
    )
  }
}

// normally named mapStateToProps
const mapStateToProps = (state) => {
  return {
    peopleSelect: state.peopleSelect,
    peopleSelected: state.peopleSelected,
    users: state.users
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    selectPerson: function(payload) {
      dispatch(selectPerson(payload))
    },
    backBtn(payload) {
      dispatch(returnToSearch(payload))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
