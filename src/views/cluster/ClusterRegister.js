import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";
import Swal from "sweetalert2";

const ClusterRegister = () => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [clusterName, setCluserName] = useState("");
  const [clusterCode, setCluserCode] = useState("");
  const [errorClusterCode, setErrorClusterCode] = useState(false);
  const [clusterManager, setClusterManager] = useState("");
  const [village, setVillage] = useState("");
  const [district, setDistrict] = useState("");
  const [state, setState] = useState("");
  const [latitude, setLatitude] = useState("");
  const [errorLatitude, setErrorLatitude] = useState(false);
  const [longitude, setLongitude] = useState("");
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [officeAddress, setOfficeAddress] = useState("");
  const [contactDetail, setContactDetail] = useState("");
  const [errorContact, setErrorContact] = useState(false);
  const [customerState, setCustomerState] = useState("");
  const [hrBasicDetails, setHrBasicDetails] = useState("");
  const [leadDetails, setLeadDetails] = useState("");
  const [stateList, setStateList] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);

  //function for modal mount/unmount
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  //function for modal toggle
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };


  //function for POST API
  const AddCluster = (e) => {
    e.preventDefault();

    if (contactDetail.length != 10) {
      setErrorContact(true);
      return;
    }
    if (!latitude.includes(".")) {
      setErrorLatitude(true);

      return;
    }
    if (!longitude.includes(".")) {
      setErrorLongitude(true);
      return;
    }
    let addcluster = {
      clusterName: clusterName,
      clusterCode: clusterCode,
      clusterManager: clusterManager,
      village: village,
      district: district,
      state: state,
      latitude: latitude,
      longitude: longitude,
      officeAddress: officeAddress,
      contactDetail: contactDetail,
      customerState: customerState,
      hrBasicDetails: hrBasicDetails,
      leadDetails: leadDetails,
    };

    fetch(`${BaseAPI}/api/cluster`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(addcluster),
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
    history(`/cluster`);
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
  

  //function for handling state for districts
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
                        <Form onSubmit={AddCluster}>
                          <Card className="rounded-0 p-4">
                            <Col className="m-2">
                              <Row>
                                <Col>
                                  <h4>
                                    <b>Cluster</b>
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
                                      <Link to={"/cluster"}>
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
                            <Col xs="6"></Col>
                            <div>&nbsp;</div>
                            <Row>
                              <div className="col-sm">
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Cluster Id{" "}
                                    <sup style={{ color: "red" }}>*</sup>
                                  </Label>
                                  <Col md="7">
                                    <Input
                                      placeholder="Cluster ID "
                                      id="example-text-input"
                                      type="text"
                                      value={clusterCode}
                                      required
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (
                                            "!@#$%^&*()?><{}[]/:;".includes(i)
                                          ) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setCluserCode(e.target.value);
                                          errorClusterCode(true);
                                        }
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Cluster Name{" "}
                                    <sup style={{ color: "red" }}>*</sup>
                                  </Label>
                                  <Col md="7">
                                    <Input
                                      placeholder="Cluster Name"
                                      id="example-text-input"
                                      value={clusterName}
                                      required
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (
                                            "!@#$%^&*()?><{}[]/:;".includes(i)
                                          ) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setCluserName(e.target.value);
                                        }
                                      }}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Cluster Manager
                                    <sup style={{ color: "red" }}>*</sup>
                                  </Label>
                                  <Col md="7">
                                    <Input
                                      placeholder="Cluster Manager"
                                      id="example-text-input"
                                      type="text"
                                      required
                                      value={clusterManager}
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (
                                            "!@#$%^&*()?><{}[]/:;".includes(i)
                                          ) {
                                            flag = false;
                                          }
                                        }
                                        setClusterManager(e.target.value);
                                      }}
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Contact Details{" "}
                                    <sup style={{ color: "red" }}>*</sup>
                                  </Label>
                                  <Col md="7">
                                    <Input
                                      placeholder="Contact Details"
                                      value={contactDetail}
                                      id="example-text-input"
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setContactDetail(e.target.value);
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
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Office Address
                                  </Label>
                                  <Col md="7">
                                    <Input
                                      placeholder="Office Address"
                                      id="example-text-input"
                                      type="textarea"
                                      onChange={(e) =>
                                        setOfficeAddress(e.target.value)
                                      }
                                    />
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
                                      type="select"
                                      onChange={(e) =>
                                        setDistrict(e.target.value)
                                      }
                                    >
                                      <option selected>Select District</option>
                                      {filteredDistricts.map(
                                        (filters, index) => {
                                          return (
                                            <option>{filters.name}</option>
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
                                    Latitude
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Latitude"
                                      id="example-text-input"
                                      type="text"
                                      value={latitude}
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789.".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setErrorLatitude(false);
                                          setLatitude(e.target.value);
                                        }
                                      }}
                                    />
                                    <div className="my-2">
                                      {errorLatitude === true ? (
                                        <span style={{ color: "red" }}>
                                          Please Enter Correct Latitude
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Longitude
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Longitude"
                                      id="example-text-input"
                                      type="text"
                                      value={longitude}
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789.".includes(i)) {
                                            flag(false);
                                          }
                                        }
                                        if (flag) {
                                          setLongitude(e.target.value);
                                          setErrorLongitude(false);
                                        }
                                      }}
                                    />
                                    <div className="my-6">
                                      {errorLongitude === true ? (
                                        <span style={{ color: "red" }}>
                                          Please Enter Correct Longitude
                                        </span>
                                      ) : (
                                        ""
                                      )}
                                    </div>
                                  </Col>
                                </FormGroup>
                              </div>
                              <div className="col-sm">
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    HR Basic Details
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="HR Basic Details"
                                      id="example-text-input"
                                      type="text"
                                      onChange={(e) =>
                                        setHrBasicDetails(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Customer Stat
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      placeholder="Customer Statt"
                                      type="text"
                                      onChange={(e) =>
                                        setCustomerState(e.target.value)
                                      }
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Lead Details
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      placeholder="Lead Details"
                                      type="text"
                                      onChange={(e) =>
                                        setLeadDetails(e.target.value)
                                      }
                                    />
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

export default ClusterRegister;
