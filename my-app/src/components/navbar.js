import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveUser } from '../reduxx/actions/save';
import { Link } from 'react-router-dom';
import { Collapse,  Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink,
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import conf from '../config/config';
import ls from 'local-storage';
import axios from 'axios';

function NavB() {

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
            dispatch(saveUser({uuid: '', email: '', connected: false}));
        }
        catch (err) {
            console.log(err);
        }
    }

    const refresh = () => {
        let con = ls.get('connected');
        let email = ls.get('email');
        let uuid = ls.get('uuid');
        dispatch(saveUser({ uuid: uuid, email: email, connected: con ? true : false }));
    }

    return (
      <>
        <div>
            <Navbar dark expand="md" className={'card-2'} onClick={ refresh }>
                <NavbarBrand tag={Link}  to={"/"}>webchallenge</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    	<NavLink tag={Link} to={ '/users' }>Users</NavLink>
                    </NavItem>
					{connected && <NavItem>
                    	<NavLink tag={Link} to={ '/home' }><u>Home</u></NavLink>
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
                            <DropdownItem onClick={ handleLogout } tag={Link} to={ '/' } >
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
