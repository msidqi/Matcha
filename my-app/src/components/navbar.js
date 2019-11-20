import React from 'react';
import { useDispatch } from 'react-redux';
// import { editTokken } from '../reduxx/actions/editTokken';
// import axios from 'axios';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    } from 'reactstrap';

function NavB(props) {
    // const white = {color: 'white'};

    const [isOpen, setIsOpen] = React.useState(false);
    
	const toggle = () => setIsOpen(!isOpen);
	

	//reduxx
	// const dispatch = useDispatch();

	// const handleLogout = (event) => {
	// 	dispatch(editTokken({ conTokken: '' }));
	// }
    
    return (
      <>
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Matcha</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
					<NavLink tag={Link} to={ '/home' } >Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink tag={Link} to={ '/users' }>Users</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        More
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem tag={Link} to={ '/login' }>
                        Login
                        </DropdownItem>
                        <DropdownItem tag={Link} to={ '/register' }>
                        Register
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
                        {/* <DropdownItem onClick={ handleLogout }> */}
                        Logout
                        </DropdownItem>
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
