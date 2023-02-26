import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  FormGroup,
  Label,
  Input,
  CardBody,
} from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import authHeader from "../../services/auth-header";
import ReactPaginate from "react-paginate";
import DriverEdit from "./DriverEdit";
import DriverView from "./DriverView";

const DriverList = () => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [driverList, setDriverList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  let size = 10;

  //list of driver for first page
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/driver/page/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setDriverList(data.driver);
      setpageCount(data.total);
    };

    getComments();
  }, [size]);

  //function for fetching driver in accordance with current page && size
  const FetchDriver = (currentPage) => {
    fetch(`${BaseAPI}/api/driver/page/?page=${currentPage}&size=${size}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfDriver) => {
      listOfDriver.json().then((datalist) => {
        if (datalist.driver.length == 0 && currentPage > 1) {
          FetchDriver(currentPage - 1);
          return;
        }
        setDriverList(datalist.driver);
        setpageCount(datalist.total);
      });
    });
  };

  //function for updating view/edit modal
  const handleUpdate = () => {
    console.log("value update");
    FetchDriver(currentPage);
  };

  //function for handling page click
  const handlePageClick = (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const value = FetchDriver(currentPage);
    setCurrentPage(currentPage);
  };

  //counting number of pages
  const nPages = Math.ceil(pageCount / size);

  //list of states
  useEffect(() => {
    fetch(`${BaseAPI}/api/state/`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateData) => {
      stateData.json().then((state) => {
        setStateList(state);
      });
    });
  }, []);

  //function for search filter by first name
  if (query.length >= 2) {
    var filterBySearch = async () => {
      const res = await fetch(
        `${BaseAPI}/api/driver/driverSearch/data?firstName=${query}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setDriverList(data);
    };
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      FetchDriver(currentPage);
    }
  }, [query]);

  return (
    <>
      <Col lg="12">
        <Container fluid lg="12">
          <Col lg="12">
            <Row>
              {/* Sidebar */}
              <Col className="start-end  bg-white" lg="2">
                <Sidebar />
              </Col>

              {/* Header */}
              <Col className="end-start" lg="10">
                <Header />

                {/* Body */}
                <Col>
                  <Col>
                    <Row>
                      <Col xs="12">
                        <Card className="rounded-0 p-4">
                          <Col className="m-2">
                            <Row>
                              <Col xs="2">
                                <h3>
                                  <b>Driver</b>
                                </h3>
                              </Col>
                              <Col xs="5">
                                </Col>
                                <Col xs="3">
                                <FormGroup className="row">
                                  <Input
                                    id="example-text-input"
                                    placeholder="Enter at least 3 character to search driver name"
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                      setQuery(e.target.value);
                                      filterBySearch();
                                    }}
                                  ></Input>
                                </FormGroup>
                              </Col>
                              <Col xs="1">
                                <Link to={"/driver-register"}>
                                  <Button color="success">Add</Button>
                                </Link>
                              </Col>
                              <Col xs="1">
                                <ReactHtmlTableToExcel
                                  id="test-table-xls-button"
                                  className="download-table-xls-button btn btn-success mb-3"
                                  table="table-to-xls"
                                  filename="tablexls"
                                  sheet="tablexls"
                                  buttonText="Export"
                                />
                              </Col>
                              <Col xs="2">&nbsp;</Col>
                            </Row>
                          </Col>

                          <Table>
                            <thead>
                              <tr>
                                <th> Driver ID</th>
                                <th> First Name</th>
                                <th> last Name</th>
                                <th> State</th>
                                <th> District</th>
                                <th> Contact</th>
                                <th> Action</th>
                              </tr>
                            </thead>
                            {driverList.map((item) => (
                              <tbody>
                                <tr>
                                  <td style={{ color: "green" }}>
                                    <strong>{item.driverId}</strong>
                                  </td>
                                  <td>{item.firstName}</td>
                                  <td>{item.lastName}</td>

                                  <td>
                                    {item.state
                                      ? stateList.map((data) => {
                                          return (
                                            <>
                                              {data._id === item.state ? (
                                                <td>{data.name}</td>
                                              ) : (
                                                ""
                                              )}
                                            </>
                                          );
                                        })
                                      : null}
                                  </td>
                                  <td>{item.district}</td>
                                  <td>{item.contactDetails}</td>
                                  <td>
                                    <DriverView
                                      props={item}
                                      handleUpdate={handleUpdate}
                                    />
                                    <DriverEdit
                                      props={item}
                                      handleUpdate={handleUpdate}
                                    />
                                  </td>
                                </tr>
                              </tbody>
                            ))}
                          </Table>
                          <br />
                          <ReactPaginate
                            previousLabel={"< previous"}
                            nextLabel={"next >"}
                            breakLabel={"..."}
                            pageCount={nPages}
                            marginPagesDisplayed={2}
                            pageRangeDisplayed={3}
                            onPageChange={handlePageClick}
                            containerClassName={
                              "pagination justify-content-center"
                            }
                            pageClassName={"page-item"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"page-item"}
                            previousLinkClassName={"page-link"}
                            nextClassName={"page-item"}
                            nextLinkClassName={"page-link"}
                            breakClassName={"page-item"}
                            breakLinkClassName={"page-link"}
                            activeClassName={"active"}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Col>
            </Row>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default DriverList;
