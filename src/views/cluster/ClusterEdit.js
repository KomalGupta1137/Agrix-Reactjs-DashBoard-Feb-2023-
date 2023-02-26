import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const ClusterEdit = ({ props, handleUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [cluster, setCluster] = useState({
    clusterCode: "",
    clusterName: "",
    clusterManager: "",
    village: "",
    district: "",
    state: "",
    latitude: "",
    longitude: "",
    officeAddress: "",
    contactDetail: "",
    customerState: "",
    hrBasicDetails: "",
    leadDetails: "",
  });
  const [stateList, setStateList] = useState([]);
  const [errorContact, setErrorContact] = useState(false);
  const [districtFlag, setDistrictFlag] = useState(false);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [errorLatitude, setErrorLatitude] = useState(false);
  const [errorLongitude, setErrorLongitude] = useState(false);
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  //function for modal toggle
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };


//function for cluster edit
  const ClusterEdit = () => {
    fetch(`${BaseAPI}/api/cluster/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((cluster) => {
      cluster.json().then((data) => {
        console.log(data);
        setCluster(data);
      });
    });
  };


//hooks call state dropdown
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


//function for district as per selected state
  const handleState = (selected) => {
    fetch(`${BaseAPI}/api/district/${selected}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((dataValue) => {
        setFilteredDistricts(dataValue);
        setDistrictFlag(true);
      });
    });
  };


//function for updating key
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setCluster((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };
  

//function for calling update API
  const UpdateCluster = (e) => {
    e.preventDefault();
    if (cluster.contactDetail.toString().length != 10) {
      setErrorContact(true);
      return;
    }
    if (!cluster.latitude.toString().includes(".")) {
      setErrorLatitude(true);
      return;
    }
    if (!cluster.longitude.toString().includes(".")) {
      setErrorLongitude(true);
      return;
    }
    fetch(`${BaseAPI}/api/cluster/${props._id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(cluster),
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
    });
    handleUpdate();
    toggle();
  };

  return (
    <>
      <Col xs="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            toggle();
            ClusterEdit();
          }}
        >
          {" "}
          Edit
        </Link>
        <Row>
          <Modal
            size="xl"
            isOpen={modal}
            toggle={toggle}
            unmountOnClose={unmountOnClose}
            className="text-center"
          >
            <ModalHeader toggle={toggle}>
              {cluster.clusterCode} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;
              <Button color="success" onClick={UpdateCluster}>
                Update
              </Button>{" "}
              &nbsp; &nbsp;
              <Button color="danger" onClick={toggleNested}>
                Cancel
              </Button>
            </ModalHeader>
            <ModalBody className="text-center">
              <Col>
                <Col>
                  <Row>
                    <Col lg="12">
                      <Form>
                        <Card className="rounded-0 p-4">
                          <Row>
                            <div className="col-sm">
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="5"
                                >
                                  Cluster Id
                                </Label>
                                <Col md="7">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="clusterCode"
                                    value={cluster.clusterCode}
                                    onChange={handleChange}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="5"
                                >
                                  Cluster Name
                                </Label>
                                <Col md="7">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="clusterName"
                                    value={cluster.clusterName}
                                    onChange={handleChange}
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
                                </Label>
                                <Col md="7">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="clusterManager"
                                    value={cluster.clusterManager}
                                    onChange={handleChange}
                                  />
                                </Col>
                              </FormGroup>
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="5"
                                >
                                  Contact Detail
                                </Label>
                                <Col md="7">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    value={cluster.contactDetail}
                                    name="contactDetail"
                                    onChange={(e) => {
                                      const check = e.target.value;
                                      const flag = true;
                                      for (var i of check) {
                                        if (!"0123456789".includes(i)) {
                                          flag = false;
                                        }
                                      }
                                      if (flag) {
                                        handleChange(e);
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
                                    id="example-text-input"
                                    type="select"
                                    value={cluster.state}
                                    name="state"
                                    onChange={(e) => {
                                      handleState(e.target.value);
                                      handleChange(e);
                                    }}
                                  >
                                    {stateList.map((states, index) => {
                                      return (
                                        <option key={index} value={states._id}>
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
                                    id="example-text-input"
                                    type="select"
                                    value={cluster.district}
                                    name="district"
                                    onChange={handleChange}
                                  >
                                    {districtFlag === true ? (
                                      <option>Select District</option>
                                    ) : (
                                      <option selected>
                                        {cluster.district}
                                      </option>
                                    )}

                                    {filteredDistricts.map((filters, index) => {
                                      return (
                                        <option key={index}>
                                          {filters.name}
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
                                  Village
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="text"
                                    name="village"
                                    value={cluster.village}
                                    onChange={handleChange}
                                  />
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
                                    id="example-text-input"
                                    type="text"
                                    name="latitude"
                                    value={cluster.latitude}
                                    onChange={(e) => {
                                      const check = e.target.value;
                                      const flag = true;
                                      for (var i of check) {
                                        if (!"0123456789.".includes(i)) {
                                          flag = false;
                                        }
                                      }
                                      if (flag) {
                                        handleChange(e);
                                        setErrorLatitude(false);
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
                            </div>

                            <div className="col-sm">
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
                                    id="example-text-input"
                                    type="text"
                                    name="longitude"
                                    value={cluster.longitude}
                                    onChange={(e) => {
                                      const check = e.target.value;
                                      const flag = true;
                                      for (var i of check) {
                                        if (!"0123456789.".includes(i)) {
                                          flag = false;
                                        }
                                      }
                                      if (flag) {
                                        handleChange(e);
                                        setErrorLongitude(false);
                                      }
                                    }}
                                  />
                                  <div className="my-2">
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
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="4"
                                >
                                  Office Address
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="textarea"
                                    value={cluster.officeAddress}
                                    name="officeAddress"
                                    onChange={handleChange}
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
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
              >
                <ModalHeader>Do you want to exit ?</ModalHeader>
                <ModalBody className="text-center">
                  {" "}
                  <Button color="danger" onClick={toggleAll}>
                    Yes
                  </Button>{" "}
                  &nbsp; &nbsp;
                  <Button color="success" onClick={toggleNested}>
                    No
                  </Button>{" "}
                </ModalBody>
              </Modal>
            </ModalBody>
          </Modal>
        </Row>
      </Col>
    </>
  );
};

export default ClusterEdit;
