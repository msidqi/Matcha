import React from 'react';
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
    const white = {color: 'white'};

    const [isOpen, setIsOpen] = React.useState(false);
    
    const toggle = () => setIsOpen(!isOpen);
    
    return (
      <>
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">Matcha</NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                    <NavLink href="/home">Home</NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink href="/users">Users</NavLink>
                    </NavItem>
                    <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret>
                        More
                    </DropdownToggle>
                    <DropdownMenu right>
                        <DropdownItem href="/login">
                        Login
                        </DropdownItem>
                        <DropdownItem href="/register">
                        Register
                        </DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem>
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
