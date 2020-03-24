import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import {Collapse,Navbar,NavbarToggler,NavbarBrand,Nav,NavItem,UncontrolledDropdown,DropdownToggle,DropdownMenu,DropdownItem,
} from 'reactstrap';
import Logo from '../support/img/Logo.png'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import { countCart } from './../redux/actions'
import { API_URL } from '../support/ApiUrl';
import { FaShoppingCart } from 'react-icons/fa'



const Header = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => setIsOpen(!isOpen);

    console.log(props.Cart)

    return (
        <div>
            <Navbar color="light" light expand="md">
                <NavbarBrand href="/">
                <i class="fas fa-mountain"></i> &nbsp; <h6>Hafa Shop</h6>
                </NavbarBrand>
                <NavbarToggler onClick={toggle} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {props.Auth.role!=="admin"?
                            null
                            :
                        <NavItem className='mr-2 pt-2'>
                            <Link to={"/manageadmin/"}>Manage Product</Link>
                        </NavItem>
                        }
                        {props.Auth.role === 'user' ?
                            <NavItem className='mr-2 pt-2'>
                                <Link to={"/history"}> History </Link>
                            </NavItem>
                            :
                            null
                        }
                        {props.Auth.role === 'user' ?
                            <NavItem className='mr-2 pt-2'>
                                <Link to={"/cart"}>cart<FaShoppingCart/> </Link>
                                {props.Cart}
                            </NavItem>
                            :
                            null
                        }

                        {props.namauser===''?
                            <NavItem className='mr-4 '>
                                <Button href="/login" variant="contained" color="primary">
                                    Login
                                </Button>
                            </NavItem>
                            :
                            null
                        }
                        {props.namauser === '' ?
                            <NavItem className='mr-2 '>
                                <Button href="/register" variant="contained" color="secondary">Register</Button>
                            </NavItem>
                            :
                            null
                        }

                        {props.AuthLog === false?
                            null
                            :
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    Halo, {props.namauser}
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem >
                                        <Link to='/settings' >User Settings</Link>
                                    </DropdownItem>
                                    <DropdownItem divider />
                                    <DropdownItem  onClick={()=>onSignOutClick()}>
                                        <Link to='/login' onClick={()=>onSignOutClick()} >Logout</Link>
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        }
                        
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    );
}

const onSignOutClick=()=>{
    localStorage.clear()
    window.location.reload()
    window.location.assign(`${API_URL}/`)
}
const mapStateToProps=(state)=>{
    return{
        namauser:state.Auth.username,
        Cart:state.Auth.cart,
        AuthLog:state.Auth.login,
        Auth:state.Auth
    }
}

export default connect(mapStateToProps,{countCart}) (Header);