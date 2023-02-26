import React, { useEffect, useState } from "react";
import {
  faChartBar,
  faChartPie,
  faUserAlt,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Media,
  Nav,
  Row,
  UncontrolledDropdown,
} from "reactstrap";
import authHeader from "../services/auth-header";
import { getProfileName } from "../services/auth-header";
const Header = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = () => setDropdownOpen((prevState) => !prevState);

  const [commonStat, setCommonStat] = useState([]);
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [plotAreas, setPlotAreas] = useState([]);

 //recursive fetch for dashboard api
  const recursiveFetch = () => {
    fetch(`${BaseAPI}/api/dashboard`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfCommon) => {
      listOfCommon.json().then((datalist) => {
        setCommonStat(datalist);
       
      });
    });
  };


  //hooks call for dashboard API
  useEffect(() => {
    fetch(`${BaseAPI}/api/dashboard`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfCommon) => {
      listOfCommon.json().then((datalist) => {
        console.log(datalist.length);
        setCommonStat(datalist);
        setInterval(() => {
          recursiveFetch();
        }, 5000);
      });
    });
  }, []);

  //hooks call for calculating total area
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot`, {
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var arealist = [];
        for (var i of data) {
          arealist.push(i.areaOfPlot);
        }
        setPlotAreas(arealist);
      });
    });
  }, []);

  //calculating sum of total area
  let Total = 0;
  plotAreas.forEach((i) => {
    Total += parseFloat(i);
  });
  let finalArea = Total.toFixed(2);

  return (
    <>
      <Col className="bg-header">
        <Nav className="p-2 text-white">
          <Col xs="12">
            <Row>
              <Col xs="10">&nbsp;</Col>
              <Col>
                <UncontrolledDropdown nav>
                  <DropdownToggle className="pr-0" nav>
                    <Media className="align-items-center">
                      <Media className="ml-2 d-none text-end d-lg-block">
                        {
                          <span className="mb-0 text-sm text-white">
                            <FontAwesomeIcon
                              icon={faUserAlt}
                              className="fs-5 rounded-5 p-2 border"
                            />
                            <br />
                            <small>{getProfileName()}</small>
                          </span>
                        }
                      </Media>
                    </Media>
                  </DropdownToggle>
                  <DropdownMenu className="dropdown-menu-arrow" right>
                    <DropdownItem className="noti-title" header tag="div">
                      <h6 className="text-overflow m-0">Welcome!</h6>
                    </DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem href="#">
                      <i className="ni ni-user-run" />
                      <Link to="/">
                        <span className="text-black sidebar-text">Logout</span>
                      </Link>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              </Col>
            </Row>
          </Col>
        </Nav>
        <Col className="p-2 pb-5" xs="12">
          <Row>
            <Col>
              <Card className="p-2 me-4 ms-4">
                <CardBody>
                  <Row>
                    <Col className="p-0">
                      <CardTitle
                        tag="h6"
                        className="text-uppercase small  text-black"
                      >
                        Total Cluster
                      </CardTitle>
                      <span className="h6 font-weight-bold mb-0">
                        {/* XXX,XXX */}
                        {commonStat.clusterStat}
                      </span>
                    </Col>
                    <Col className="col-sm-5 text-center vh-50">
                      <label className="px-3 py-3 bg-danger rounded-circle shadow">
                        <Col className="icon icon-shape  text-white">
                          <FontAwesomeIcon icon={faChartBar} />
                        </Col>
                      </label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="p-2 me-4 ms-4">
                <CardBody>
                  <Row>
                    <Col className="p-0">
                      <CardTitle
                        tag="h6"
                        className="text-uppercase small  text-black"
                      >
                        Total Farmer
                      </CardTitle>
                      <span className="h6 font-weight-bold mb-0">
                        {/* XXX,XXX */}
                        {commonStat.farmerStat}
                      </span>
                    </Col>
                    <Col className="col-sm-5 text-center vh-50">
                      <label className="bg-warning px-3 py-3 rounded-circle shadow ">
                        <Col className="icon icon-shape  text-white ">
                          <FontAwesomeIcon icon={faUsers} />
                        </Col>
                      </label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="p-2 me-4 ms-4">
                <CardBody>
                  <Row>
                    <Col className="p-0">
                      <CardTitle
                        tag="h6"
                        className="text-uppercase small  text-black"
                      >
                        Total Plot
                      </CardTitle>
                      <span className="h6 font-weight-bold mb-0">
                        {/* XXX,XXX */}
                        {commonStat.plotStat}
                      </span>
                    </Col>
                    <Col className="col-sm-5 text-center vh-50">
                      <label className="bg-plot px-3 py-3 rounded-circle shadow ">
                        <Col className="icon icon-shape  text-white ">
                          <FontAwesomeIcon icon={faChartPie} />
                        </Col>
                      </label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
            <Col>
              <Card className="p-2 me-4 ms-4">
                <CardBody>
                  <Row>
                    <Col className="p-0">
                      <CardTitle
                        tag="h6"
                        className="text-uppercase small  text-black"
                      >
                        total area
                      </CardTitle>
                      <span className="h6 font-weight-bold mb-0">
                        {finalArea} acre
                      </span>
                    </Col>
                    <Col className="col-sm-5 text-center vh-50">
                      <label className="bg-danger px-3 py-3 rounded-circle shadow ">
                        <Col className="icon icon-shape  text-white ">
                          <FontAwesomeIcon icon={faChartBar} />
                        </Col>
                      </label>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default Header;
