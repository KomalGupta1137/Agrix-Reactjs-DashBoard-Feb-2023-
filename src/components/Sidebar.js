import {
  faTvAlt,
  faAtom,
  faUser,
  faAddressCard,
  faGear,
  faTractor,
  faTruck,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { Col, Row } from "reactstrap";
import Logo from "../assets/image/logo-gif.gif";

const Sidebar = () => {
  const activeLink = "text-black fw-bold sidebar-text col-sm-10";
  const inActiveLink = "text-black sidebar-text col-sm-10";
  return (
    <>
      <Col xs="12" className="position-fixed">
        <Col className="p-4">
          <Col>
            <Image className="sidebar-image" src={Logo} />
          </Col>

          <Col className="  m-4 position-fixed">
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faTvAlt} />
                </Col>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="2">Dashboard</Col>
                </NavLink>
              </Row>
            </Col>
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faAtom} />
                </Col>
                <NavLink
                  to="/cluster"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="2">Cluster</Col>
                </NavLink>
              </Row>
            </Col>
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faAddressCard} />
                </Col>
                <NavLink
                  to="/farmer"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="2">Farmer</Col>
                </NavLink>
              </Row>
            </Col>
            <Col className="mt-3"></Col>
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faUser} />
                </Col>
                <NavLink
                  to="/driver"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="2">Driver</Col>
                </NavLink>
              </Row>
            </Col>

            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faTractor} />
                </Col>
                <NavLink
                  to="/machine"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="2">Machine</Col>
                </NavLink>
              </Row>
            </Col>
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faTruck} />
                </Col>
                <NavLink
                  to="/device-management"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="12" className="p-0">
                    Machine Records
                  </Col>
                </NavLink>
              </Row>
            </Col>
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faHistory} />
                </Col>
                <Col xs="2" className="text-success">
                  <NavLink
                    to="/history"
                    className={({ isActive }) =>
                      isActive ? activeLink : inActiveLink
                    }
                  >
                    History
                  </NavLink>
                </Col>
              </Row>
            </Col>
            <Col className="mt-3">
              <Row>
                <Col xs="2" className="text-success">
                  <FontAwesomeIcon icon={faGear} />
                </Col>
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    isActive ? activeLink : inActiveLink
                  }
                >
                  <Col xs="12" className="p-0">
                    Settings
                  </Col>
                </NavLink>
              </Row>
            </Col>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default Sidebar;
