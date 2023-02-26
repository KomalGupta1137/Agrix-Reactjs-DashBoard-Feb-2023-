import React, { useEffect, useState } from "react";
import Moment from "react-moment";
import {
  Button,
  Card,
  CloseButton,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Popover,
  PopoverBody,
  Row,
  Table,
} from "reactstrap";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import authHeader from "../../services/auth-header";
import ReactPaginate from "react-paginate";

const DeviceManagement = () => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [machine, setManchine] = useState([]);
  const [pageCount, setpageCount] = useState([]);
  let size = 10;

  //function for current page machinelist
  let currentPage = 1;
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/farm-machine/page/?page=${currentPage}&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setManchine(data.farmMachine);
      setpageCount(data.total);
    };

    getComments();
  }, [size, currentPage]);

  //function for fetching current page data
  const FechCluster = (currentPage) => {
    fetch(
      `${BaseAPI}/api/farm-machine/page/?page=${currentPage}&size=${size}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    ).then((machineData) => {
      machineData.json().then((datalist) => {
        setManchine(datalist.farmMachine);
      });
    });
  };

  //function for handling page click
  const handlePageClick = (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    localStorage.setItem("page", JSON.stringify(currentPage));
    const value = FechCluster(currentPage);
  };

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
                  <Card className="rounded-0 p-4">
                    <Col xs="4">
                      <h4>
                        <b>Machine History</b>
                      </h4>
                    </Col>
                    <br />
                    <Table border>
                      <thead>
                        <tr>
                          <th style={{ color: "black" }}>Machine-Id</th>
                          <th style={{ color: "black" }}>Cluster-Id</th>
                          <th style={{ color: "black" }}>Attachment-Id</th>
                          <th style={{ color: "black" }}>Driver-Id</th>
                          <th style={{ color: "black" }}>Phone Number</th>
                          <th style={{ color: "black" }}>Schedule Date</th>
                          <th style={{ color: "black" }}>Service Date</th>
                          <th style={{ color: "black" }}>Start Time</th>
                          <th style={{ color: "black" }}>Stop Time</th>
                        </tr>
                      </thead>
                      {machine.map((post, index) => (
                        <tbody>
                          <tr key={index}>
                            <td style={{color:"green"}}><strong>{post.machineId}</strong></td>
                            <td>{post.clusterId}</td>
                            <td>{post.attachmentId}</td>
                            <td>{post.driverId}</td>
                            <td>{post.phoneNumber}</td>
                            <td>
                              <Moment format="MMM DD YYYY">
                                {post.scheduleDate}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="MMM DD YYYY">
                                {post.startTime}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="HH:mm:ss">
                                {post.startTime}
                              </Moment>
                            </td>
                            <td>
                              <Moment format="HH:mm:ss">{post.stopTime}</Moment>
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
                      containerClassName={"pagination justify-content-center"}
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
              </Col>
            </Row>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default DeviceManagement;
