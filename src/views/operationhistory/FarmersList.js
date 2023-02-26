import {
faHistory
  } from "@fortawesome/free-solid-svg-icons";
  import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
  import React, { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import { Card, Table, Container, Row, Col, CardBody } from "reactstrap";
  import ReactPaginate from "react-paginate";
  import Sidebar from "../../components/Sidebar";
  import Header from "../../components/Header";
  import authHeader from "../../services/auth-header";
  import OperationHistory from "./OperationHistory"
  
  const FarmersList = () => {
    const BaseAPI = process.env.REACT_APP_SERVER_URL;
    const [farmerDataList, setFarmerDataList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setpageCount] = useState("");
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
      console.log("value update");
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
                                <Col>
                                  <h3>
                                    <b>Farm-Machine-History</b>
                                  </h3>
                                </Col>
                              </Row>
                            </Col>
                            <CardBody className="p-4">
                              <Table
                                className="align-items-center table-flush"
                                id="table-to-xls"
                                responsive
                                bordered
                              >
                                <thead>
                                  <tr>
                                    <th>FarmerName</th>
                                    <th>Contact</th>
                                    <th>History</th>
                                  </tr>
                                </thead>
                                {farmerDataList.map((item) => (
                                  <tbody>
                                    <tr>
                                      <td style={{ color: "green" }}>
                                        <strong>{item.firstName}</strong>
                                      </td>
  
                                      <td style={{ color: "green" }}>
                                        <strong>{item.contact}</strong>
                                      </td>
                                      <td>
                                      <OperationHistory props={item}/>
                                       
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
                </Col>
              </Row>
            </Col>
          </Container>
        </Col>
      </>
    );
  };
  
  export default FarmersList;
  