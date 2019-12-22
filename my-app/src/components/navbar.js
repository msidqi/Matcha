import React, { useState, useHi } from 'react';
import { useDispatch, useSelector, useEffect } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { green, grey, white } from '@material-ui/core/colors';
import { saveUser } from '../reduxx/actions/save';
import { Link } from 'react-router-dom';
import { Collapse,  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import conf from '../config/config';
import ls from 'local-storage';
import axios from 'axios';
import HomeIcon from './HomeIcon';

const useStyles = makeStyles(theme => ({
    bold: {
        'font-weight': 'bold',
        position: 'sticky',
        top: '0px',
        'z-index': 1,
    },
}));
function NavB(props) {

    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);
	const toggle = () => setIsOpen(!isOpen);

	//reduxx
	var connected = useSelector(state => state.user.connected);
    const dispatch = useDispatch();

	const handleLogout = async (event) => {
        // axios.defaults.withCredentials = true;
        try {
            console.log(`/api/${conf.apiVer}/session/`);
            await axios.delete(`/api/${conf.apiVer}/session/`);
            ls.set('connected', false);
            ls.set('uuid', '');
            ls.set('email', '');
            ls.set('verified', false);
            ls.set('completed', false);
            ls.set('username', '');
            dispatch(saveUser({uuid: '', email: '', connected: false, completed: false, verified: false, username: ''}));
            // props.history.push('login');
        }
        catch (err) {
            console.log(err);
        }
    }

    const refresh = () => {
        let ver = ls.get('verified');
        let com = ls.get('completed');
        let con = ls.get('connected');
        let email = ls.get('email');
        let uuid = ls.get('uuid');
        let name = ls.get('username');
        dispatch(saveUser({ uuid: uuid, email: email, connected: con ? true : false, verified: ver, completed: com, username: name }));
    }

    return (
      <>
        <div className={ classes.bold }>
            <Navbar dark expand="md" className={'card-2'} onClick={ refresh }>
                <NavbarBrand tag={Link}  to={"/"}>Matcha</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    	<NavLink tag={Link} to={ '/users' }>Users</NavLink>
                    </NavItem>
					{connected && <NavItem>
                    	<NavLink tag={Link} to={ '/home' }>
                            <HomeIcon fontSize="small" style={{ color: grey[550] }} /> <u>Home</u>
                        </NavLink>
                    </NavItem>}
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        More
                    </DropdownToggle>
                    <DropdownMenu right>
                        { !connected && <>
                            <DropdownItem tag={Link} to={ '/login' }>
                            Login
                            </DropdownItem>
                            <DropdownItem divider />
                            <DropdownItem tag={Link} to={ '/register' }>
                            Register
                            </DropdownItem>
                        </>}
                        { connected &&
                            <DropdownItem onClick={ handleLogout } tag={Link} to={ '/home' } >
                            Logout
                            </DropdownItem>
                        }
                    </DropdownMenu>
                    </UncontrolledDropdown>
                </Nav>
                </Collapse>
            </Navbar>
        </div>
      </>
    );
}
  
export default NavB;
