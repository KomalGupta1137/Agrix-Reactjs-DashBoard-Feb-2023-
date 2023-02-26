import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";

const DriverRegister = () => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [driverId, setDriverId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contactDetails, setContactDetails] = useState("");
  const [errorContact, setErrorContact] = useState(false);
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [clusterId, setClusterId] = useState("");
  const [cluster, setCluster] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  //function for setting modal state
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  //function for POST API for adding driver
  const AddDriver = (e) => {
    e.preventDefault();

    if (contactDetails.length != 10) {
      setErrorContact(true);
    } else {
      let addDriver = {
        driverId: driverId,
        firstName: firstName,
        lastName: lastName,
        contactDetails: contactDetails,
        village: village,
        district: district,
        state: state,
        clusterId: clusterId,
      };
      fetch(`${BaseAPI}/api/driver`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(addDriver),
      }).then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          Swal.fire({
            title: "Success",
            text: "Registered Successfully",
            icon: "success",
            confirmButtonText: "OK",
          });
        }
      });

      history(`/driver`);
    }
  };

  //hooks call for state dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/state`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateList) => {
      stateList.json().then((data) => {
        setStateList(data);
        console.log(data);
      });
    });
  }, []);

  //function for handling state && district
  const handleState = (selected) => {
    fetch(`${BaseAPI}/api/district/${selected}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((dataValue) => {
        setFilteredDistricts(dataValue);
        setState(selected);
      });
    });
  };

  //hooks call for cluster dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/cluster`, {
      method: "GET",
      headers: authHeader(),
    }).then((cluster) => {
      cluster.json().then((data) => {
        setCluster(data);
      });
    });
  }, []);
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
                        <Form onSubmit={AddDriver}>
                          <Card className="rounded-0 p-4">
                            <Col className="m-2">
                              <Row>
                                <Col>
                                  <h4>
                                    <b>Driver</b>
                                  </h4>
                                </Col>
                                <Col xs="7">&nbsp;</Col>
                                <Col xs="1">
                                  <Button color="success" type="submit">
                                    Add
                                  </Button>
                                </Col>
                                <Col xs="1">
                                  <Button color="danger" onClick={toggle}>
                                    Cancel
                                  </Button>
                                  <Modal
                                    isOpen={modal}
                                    toggle={toggle}
                                    unmountOnClose={unmountOnClose}
                                    className="text-center"
                                  >
                                    <ModalHeader toggle={toggle}>
                                      Do you want to exit
                                    </ModalHeader>
                                    <ModalBody className="text-center">
                                      <Link to={"/driver"}>
                                        <Button color="danger">Yes</Button>
                                      </Link>
                                      &nbsp; &nbsp;
                                      <Button color="success" onClick={toggle}>
                                        No
                                      </Button>
                                    </ModalBody>
                                  </Modal>
                                </Col>
                                <Col xs="1">&nbsp;</Col>
                              </Row>
                            </Col>
                            <Col xs="6">
                              {/* <h3 className="mb-0">Driver Details</h3> */}
                            </Col>
                            <div>&nbsp;</div>
                            <br />
                            <Row>
                              <div className="col-sm">
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Driver Id
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Driver Id"
                                      id="example-text-input"
                                      type="text"
                                      required
                                      onChange={(e) =>
                                        setDriverId(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    First Name
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="First Name "
                                      id="example-text-input"
                                      type="text"
                                      required
                                      onChange={(e) =>
                                        setFirstName(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Last Name
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Last Name"
                                      id="example-text-input"
                                      type="text"
                                      onChange={(e) =>
                                        setLastName(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Contact Details
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Contact Details"
                                      id="example-text-input"
                                      value={contactDetails}
                                      required
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setContactDetails(e.target.value);
                                          setErrorContact(false);
                                        }
                                      }}
                                    />
                                    <div className="my-2">
                                      {errorContact === true ? (
                                        <span style={{ color: "red" }}>
                                          Please Enter Valid Contact Details
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </Col>
                                </FormGroup>

                                <br />
                              </div>
                              <div className="col-sm">
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    State
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="State"
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        handleState(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select State
                                      </option>
                                      {stateList.map((states, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={states._id}
                                          >
                                            {" "}
                                            {states.name}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    District
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="District"
                                      id="example-text-input"
                                      required
                                      type="select"
                                      onChange={(e) =>
                                        setDistrict(e.target.value)
                                      }
                                    >
                                      <option selected>Select District</option>
                                      {filteredDistricts.map(
                                        (filters, index) => {
                                          return (
                                            <option key={index}>
                                              {filters.name}
                                            </option>
                                          );
                                        }
                                      )}
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Village
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Village"
                                      id="example-text-input"
                                      type="text"
                                      required
                                      onChange={(e) =>
                                        setVillage(e.target.value)
                                      }
                                    ></Input>
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Cluster Id
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Cluster Id"
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        setClusterId(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select ClusterId
                                      </option>
                                      {cluster.map((List, index) => {
                                        return (
                                          <option key={index} value={List.id}>
                                            {List.clusterCode}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </Col>
                                </FormGroup>
                              </div>
                            </Row>
                          </Card>
                        </Form>
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

export default DriverRegister;
