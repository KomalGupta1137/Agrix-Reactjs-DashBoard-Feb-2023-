import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  Table,
  Container,
  Row,
  Col,
  CardBody,
  Input,
} from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import ReactPaginate from "react-paginate";
import FarmerView from "./FarmerView";
import FarmerEdit from "./FarmerEdit";

const FarmerList = () => {
  const [farmerDataList, setFarmerDataList] = useState([]);
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [pageCount, setpageCount] = useState("");
  const [nameQuery ,setNameQuery] = useState("");
  const [clusterIdQuery ,setClusterIdQuery] = useState("")

  let size = 10;

  //list of farmer for 1st page
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/farmer/page/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerDataList(data.farmer);
      setpageCount(data.total);
    };
    getComments();
  }, [size]);

  //list of farmer in accordance with current page and size
  const FetchFarmer = (currentPage) => {
    fetch(`${BaseAPI}/api/farmer/page/?page=${currentPage}&size=${size}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfMachine) => {
      listOfMachine.json().then((datalist) => {
        setFarmerDataList(datalist.farmer);
      });
    });
  };

  //function for updating pagination
  const handleUpdate = () => {
    FetchFarmer(currentPage);
  };

  //function for handling page click
  const handlePageClick = (data) => {
    let currentPage = data.selected + 1;
    const value = FetchFarmer(currentPage);
    setCurrentPage(currentPage);
  };

  //counting the number of page
  const nPages = Math.ceil(pageCount / size);

  //function for search filter by first name
  if (nameQuery.length >= 2) {
    var filterByName = async (name) => {
      const res = await fetch(
        `${BaseAPI}/api/farmer/farmerSearch/data?firstName=${name}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerDataList(data);
    };
  }

  //function for search filter by clusterId
  if (clusterIdQuery.length >= 2) {
    var filterByClusterId = async (clusterId) => {
      const res = await fetch(
        `${BaseAPI}/api/farmer/farmerSearch/data?clusterId=${clusterId}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerDataList(data);
    };
  }

  useEffect(() => {
    if (nameQuery.trim().length === 0) {
      FetchFarmer(currentPage);
    }
  }, [nameQuery]);


  useEffect(() => {
    if (clusterIdQuery.trim().length === 0) {
      FetchFarmer(currentPage);
    }
  }, [clusterIdQuery]);

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
                <Col sm="12">
                  <Row>
                    <Col sm="12">
                      <Card className=" rounded-0 p-4">
                        <Col sm="12">
                          <Row>
                            <Col sm="3">
                              <h3>
                                <b>Farmer</b>
                              </h3>
                            </Col>
                            <Col sm="4">&nbsp;</Col>
                            <Col sm="5">
                              <Col sm="12">
                                <Row>
                                  <Col sm="3">
                                    <Input
                                      placeholder="Search by name"
                                      type="text"
                                      value={nameQuery}
                                      onChange={(e) => {
                                        setNameQuery(e.target.value);
                                        filterByName(e.target.value);
                                      }}
                                    ></Input>
                                  </Col>
                                  <Col sm="4">
                                    <Input
                                      placeholder="Search by clusterID"
                                      type="text"
                                      value={clusterIdQuery}
                                      onChange={(e) => {
                                        setClusterIdQuery(e.target.value);
                                        filterByClusterId(e.target.value);
                                      }}
                                    ></Input>
                                  </Col>
                                  <Col sm="1">
                                    <Link
                                      to={"/farmer-register"}
                                      className="p-0"
                                    >
                                      <Button color="success">Add</Button>
                                    </Link>
                                  </Col>
                                  <Col sm="1">&nbsp;</Col>
                                  <Col sm="1">
                                    <ReactHtmlTableToExcel
                                      id="test-table-xls-button"
                                      className="download-table-xls-button btn btn-success mb-3"
                                      table="table-to-xls"
                                      filename="tablexls"
                                      sheet="tablexls"
                                      buttonText="Export"
                                    />
                                  </Col>
                                </Row>
                              </Col>
                            </Col>
                          </Row>
                        </Col>
                       
                          <CardBody >
                            <Table
                              className="align-items-center table-flush"
                              id="table-to-xls"
                              responsive
                            >
                              <thead>
                                <tr>
                                  <th> First Name</th>
                                  <th> Last Name</th>
                                  <th>Contact</th>
                                  <th> Owner Type</th>
                                  <th>Cluster ID</th>
                                  <th> Action</th>
                                </tr>
                              </thead>
                              {farmerDataList.map((item) => (
                                <tbody>
                                  <tr>
                                    <td style={{ color: "green" }}>
                                      <strong>{item.firstName} </strong>
                                      <Link
                                        className="sidebar-text"
                                        textDecoration="none"
                                        style={{
                                          color: "green",
                                          fontSize: "13px",
                                        }}
                                        to={"/plot-register/" + item._id}
                                      >
                                        <br />
                                        Add Plot
                                      </Link>
                                    </td>

                                    <td style={{ color: "green" }}>
                                      <strong>{item.lastName}</strong>
                                      <Link
                                        className="sidebar-text"
                                        textDecoration="none"
                                        style={{
                                          color: "green",
                                          fontSize: "13px",
                                        }}
                                        to={"/plot/" + item._id}
                                      >
                                        <br />
                                        Plot List
                                      </Link>
                                    </td>

                                    <td>{item.contact}</td>
                                    <td>{item.ownerType}</td>
                                    <td>{item.clusterId}</td>
                                    <td>
                                      <FarmerView
                                        props={item}
                                        handleUpdate={handleUpdate}
                                      />{" "}
                                      <FarmerEdit
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
                          </CardBody>
                        
                      </Card>
                    </Col>
                  </Row>
                </Col>
              </Col>
            </Row>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default FarmerList;
