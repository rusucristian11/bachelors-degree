import React from 'react';
import './Header.scss'
import {NavLink} from "react-router-dom";
import {AlertComponent} from "../AlertComponent/AlertComponent";

export default class Header extends React.Component {
  reference = null;
  constructor(props) {
    super(props);
    this.state = {
      profileExtendableOpen: false,
      hamburgerMenuOpen: false,
      showLogoutAlert: false,
    };
    this.reference = React.createRef();
    this.modelReference = React.createRef();
    this.toggleModalLogout = this.toggleModalLogout.bind(this);
    this.expandableListener = this.expandableListener.bind(this);
    this.logOutExpendable = this.logOutExpendable.bind(this);
  }

  componentDidMount() {
    document.addEventListener('click', this.expandableListener);
    document.addEventListener('click', this.logOutExpendable);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.expandableListener);
    document.removeEventListener('click', this.logOutExpendable);
  }

  toggleExpendable() {
    this.setState({profileExtendableOpen: !this.state.profileExtendableOpen})
  }

  expandableListener(event){
    const location = this.props.history?.location.pathname
    if (['/login', '/forgot-password', '/registration-complete', '/reset-password', '/register', '/ar'].includes(location))
      return
    if (location.includes('ar/')) {
      return
    }
    if (this.reference && !this.reference.contains(event.target)) {
      this.setState({profileExtendableOpen: false})
    }
  }

  logOutExpendable(event) {
    const location = this.props.history?.location.pathname
    if (['/login', '/forgot-password', '/registration-complete', '/reset-password', '/register', '/ar'].includes(location))
      return
    if (location.includes('ar/')) {
      return
    }
    if (this.modelReference && !this.modelReference.contains(event.target) && !this.state.showLogoutAlert) {
      this.setState({showLogoutAlert: false})
    }
  }

  toggleExpandableMenu() {
    this.setState({hamburgerMenuOpen: !this.state.hamburgerMenuOpen})
  }

  toggleModalLogout() {
    this.setState({showLogoutAlert: !this.state.showLogoutAlert});
  }

  logOut(){
    localStorage.removeItem('userProfileId')
    localStorage.removeItem('user')
    localStorage.removeItem('userType')
    this.toggleExpandableMenu()
    this.toggleModalLogout()
    // this.setState({showLogoutAlert: !this.state.showLogoutAlert});
    this.props.history.push('/login')
  }

  renderLogoutModal() {
    console.log(this.state.showLogoutAlert)
    return (
      <AlertComponent className={'small-modal'} show={this.state.showLogoutAlert} handleClose={this.toggleModalLogout}>
        <div ref={(el) => this.modelReference = el}>
          <h1>Log Out</h1>
          <p>Are you sure you want to log out?</p>
          <div className='button-container'>
            <div className='action-button button-cancel' onClick={() => this.toggleModalLogout()}>Cancel</div>
            <div className='action-button' onClick={() => this.logOut()}>Log Out</div>
          </div>
        </div>
      </AlertComponent>
    )
  }

  render() {
    const location = this.props.history?.location.pathname;
    if (!location) return '';
    if (['/login', '/forgot-password', '/registration-complete', '/reset-password', '/register', '/ar'].includes(location))
      return '';
    if (location.includes('ar/')) {
      return null
    }
    const user = JSON.parse(localStorage.getItem('user'))
    const firstName = user?.firstName
    const lastName = user?.lastName

    const userType = localStorage.getItem('userType')
    let menu
    switch (userType) {
      case 'TEACHER':
        menu = <React.Fragment>
          <NavLink to='/' exact className={`menu-item`}>
            <div className={`classes ${ location === '/' ? 'active-icon-classes' : ''}`} />
            Classes
          </NavLink>
          <NavLink to='/attendance' exact className={`menu-item`}>
            <div className={`attendance ${/attendance/.test(location) || location === '/' ? 'active-icon-attendance' : ''}`} />
            Attendance
          </NavLink>
        </React.Fragment>
        break;
      case 'STUDENT':
        menu = <React.Fragment>
          <NavLink to='/' exact className={`menu-item`}>
            <div className={`classes ${ location === '/' ? 'active-icon-classes' : ''}`} />
            Classes
          </NavLink>
        </React.Fragment>
        break;
      default:
        menu = null;
        break;
    }
    return (
      <React.Fragment>
        {this.renderLogoutModal()}
        <header className='header'>
          <div className='header-logo' onClick={() =>{this.props.history.push("/")}}/>
          <div id='menu-items' className='menu-items'>
            {menu}
          </div>
          <div id='auth-container' className='menu-auth-container' ref={(el) => this.reference = el}>
            <div className='menu-profile-image' />
            <div className='menu-profile-details'>
              <div className='menu-profile-title'>{lastName}</div>
              <div className='menu-profile-subtitle'>{firstName}</div>
            </div>
            <div className={`arrow ${this.state.profileExtendableOpen ? 'reverse' : ''}`} onClick={() => this.toggleExpendable()} />
            { this.state.profileExtendableOpen &&
              <div className='menu-auth-container-expandable'>
                <div className='menu-auth-expandable-item' onClick={() => this.props.history.push('/edit-profile')}>My Account</div>
                <div className='menu-auth-expandable-item' onClick={() => {this.toggleModalLogout()}}>Log out</div>
              </div>
            }
          </div>
          <div onClick={() => this.toggleExpandableMenu()} className='hamburger-menu' id='hamburger-menu'>
            {this.state.hamburgerMenuOpen &&
              <div className='hamburger-menu-container'>
                <div id='links' className='links-items'>
                  <NavLink to='/' className={`menu-item`}>
                    My Account
                  </NavLink>
                  <div className='menu-item' onClick={() => this.toggleModalLogout()}>Log Out</div>
                </div>
              </div>
            }
          </div>
        </header>
      </React.Fragment>
    )
  }
}
