import React from 'react'
import { NavLink } from 'react-router-dom';
import { Col, Row } from 'reactstrap'

const Header = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";
  return (
    <Col xs="12">
      <Row>
        <Col xs="2">
          <Col>
            <NavLink
              // to="messages"
              style={({ isActive }) =>
                isActive ? activeStyle : undefined
              }
            >
              Messages
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Tasks1
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Tasks2
            </NavLink>
          </Col>
          <Col>
            <NavLink
              to="tasks"
              className={({ isActive }) =>
                isActive ? activeClassName : undefined
              }
            >
              Tasks3
            </NavLink>
          </Col>
        </Col>

        {/*body  */}
        <Col xs="10"></Col>
      </Row>
    </Col>
  )
}

export default Header