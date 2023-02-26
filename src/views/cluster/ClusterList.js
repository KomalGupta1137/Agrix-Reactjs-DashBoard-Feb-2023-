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
} from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";
import ReactHtmlTableToExcel from "react-html-table-to-excel";
import ReactPaginate from "react-paginate";
import ClusterView from "./ClusterView";
import ClusterEdit from "./ClusterEdit";

const ClusterList = () => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [clusterList, setClusterList] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");

  let size = 10;

  //hooks call list of cluster for 1st page
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/cluster/page/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setClusterList(data.cluster);
      setpageCount(data.total);
    };

    getComments();
  }, [size]);

  //list of cluster in accordance with current page && size
  const FetchCluster = (currentPage) => {
    fetch(`${BaseAPI}/api/cluster/page/?page=${currentPage}&size=${size}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfCluster) => {
      listOfCluster.json().then((datalist) => {
        if (datalist.cluster.length == 0 && currentPage > 1) {
          FetchCluster(currentPage - 1);
          return;
        }
        setClusterList(datalist.cluster);
        setpageCount(datalist.total);
      });
    });
  };

  //props for updating view/edit Modal
  const handleUpdate = () => {
    FetchCluster(currentPage);
  };

  //function for handling page click
  const handlePageClick = (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const value = FetchCluster(currentPage);
    setCurrentPage(currentPage);
  };

  //counting number of pages for pagination
  const nPages = Math.ceil(pageCount / size);

  //function for search filter by clusterCode
  if (query.toString().length >= 2) {
    var filterBySearch = async () => {
      const res = await fetch(
        `${BaseAPI}/api/cluster/clusterSearch/data?clusterName=${query}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setClusterList(data);
    };
  }

  //hooks call updating the list after removing query from searchbar
  useEffect(() => {
    if (query.trim().length === 0) {
      FetchCluster(currentPage);
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
                                  <b>Cluster</b>
                                </h3>
                              </Col>
                              <Col xs="5"></Col>
                              <Col xs="3">
                                <FormGroup className="row">
                                  <Input
                                    id="example-text-input"
                                    placeholder="Enter at least 3 character to search cluster name"
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
                                <Link to={"/cluster-register"}>
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

                          <Table id="table-to-xls" responsive>
                            <thead>
                              <tr>
                                <th> Cluster Id</th>
                                <th> Cluster Name</th>
                                <th> Cluster Manager</th>
                                <th> Contact Detail </th>
                                <th> Village</th>
                                <th> Action</th>
                              </tr>
                            </thead>
                            {clusterList.map((item, index) => (
                              <tbody>
                                <tr key={index}>
                                  <td style={{ color: "green" }}>
                                    <strong>{item.clusterCode}</strong>
                                  </td>
                                  <td>{item.clusterName}</td>
                                  <td>{item.clusterManager}</td>
                                  <td>{item.contactDetail}</td>
                                  <td>{item.village}</td>
                                  <td>
                                    <ClusterView
                                      props={item}
                                      handleUpdate={handleUpdate}
                                    />
                                    <ClusterEdit
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

export default ClusterList;
