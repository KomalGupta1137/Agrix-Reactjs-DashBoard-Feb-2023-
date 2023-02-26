import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
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
} from "reactstrap";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const DriverEdit = ({ props, handleUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [driver, setDriver] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    ownerType: props.ownerType,
    contactDetails: props.contactDetails,
    state: props.state,
    district: props.district,
    village: props.village,
    clusterId: props.clusterId,
  });
  const [stateId, setStateId] = useState("");
  const [cluster, setCluster] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [filteredDistricts, setFilteredDistricts] = useState([]);
  const [errorContact, setErrorContact] = useState(false);
  const [districtFlag, setDistrictFlag] = useState(false);
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  //function for handling toggle for modal/nested modal
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

//hooks call for state dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/state`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateList) => {
      stateList.json().then((data) => {
        setStateList(data);
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
        console.log(data);
        setDistrictFlag(true);
      });
    });
  };


  //function for setting updated data to key
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setDriver((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };


  //function for getting driver data according to objectID
  const DriverEdit = () => {
    fetch(`${BaseAPI}/api/driver/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfdriver) => {
      listOfdriver.json().then((datalist) => {
        setDriver(datalist);
        setStateId(datalist.state);
      });
    });
  };


  //function for update API
  const UpdateDriver = (e) => {
    e.preventDefault();
    if (driver.contactDetails.length != 10) {
      setErrorContact(true);
    } else {
      fetch(`${BaseAPI}/api/driver/${props._id}`, {
        method: "PUT",
        headers: authHeader(),
        body: JSON.stringify(driver),
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
    }
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
      <Col xs="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            toggle();
            DriverEdit();
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
              {driver.firstName} {driver.lastName} &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              <Button color="success" onClick={UpdateDriver}>
                Update
              </Button>
              &nbsp; &nbsp; &nbsp;
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
                            <div className="col-md-6">
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
                                    id="example-text-input"
                                    type="text"
                                    name="driverId"
                                    value={driver.driverId}
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
                                  First Name
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="First Name "
                                    id="example-text-input"
                                    type="text"
                                    name="firstName"
                                    value={driver.firstName}
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
                                  Last Name
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="Last Name"
                                    id="example-text-input"
                                    type="text"
                                    name="lastName"
                                    value={driver.lastName}
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
                                  Contact Details
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="Contact Details"
                                    id="example-text-input"
                                    name="contactDetails"
                                    value={driver.contactDetails}
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

                              <br />
                            </div>
                            <div className="col-md-6">
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
                                    name="state"
                                    value={driver.state}
                                    onChange={(e) => {
                                      handleState(e.target.value);
                                      handleChange(e);
                                    }}
                                  >
                                    <option>Select State</option>
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
                                    placeholder="District"
                                    id="example-text-input"
                                    type="select"
                                    name="district"
                                    value={driver.district}
                                    onChange={handleChange}
                                  >
                                    {districtFlag === true ? (
                                      <option>Select District</option>
                                    ) : (
                                      <option selected>
                                        {driver.district}
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
                                    value={driver.village}
                                    onChange={handleChange}
                                  ></Input>
                                </Col>
                              </FormGroup>
                              <FormGroup className="row">
                                <Label
                                  className="form-control-label"
                                  htmlFor="example-text-input"
                                  md="4"
                                >
                                  cluster Id
                                </Label>
                                <Col md="6">
                                  <Input
                                    id="example-text-input"
                                    type="select"
                                    name="clusterId"
                                    value={driver.clusterId}
                                    onChange={handleChange}
                                  >
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
              <Modal
                isOpen={nestedModal}
                toggle={toggleNested}
                onClosed={closeAll ? toggle : undefined}
              >
                <ModalHeader toggle={toggle}>Do you want to exit</ModalHeader>
                <ModalBody className="text-center">
                  {" "}
                  &nbsp; &nbsp; &nbsp;
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

export default DriverEdit;
