import React, { useState, useEffect } from "react";
import { Link, useNavigate} from "react-router-dom";
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

const FarmerRegister = () => {
  let history = useNavigate();
  const [cluster, setCluster] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [errorContact, setErrorContact] = useState(false);
  const [ownerType, setOwnerType] = useState("");
  const [address, setAddress] = useState("");
  const [farmingSeason, setFarmingSeason] = useState("");
  const [clusterId, setClusterId] = useState("");
  const [cropType, setCropType] = useState("");
  const [cropSubType, setCropSubType] = useState("");
  const [cropTypeList, setCropTypeList] = useState([]);
  const [filteredVariety, setFilteredVariety] = useState([]);

  //function for setting state for modal
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  //function for handling toggle for modal
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };
  const BaseAPI = process.env.REACT_APP_SERVER_URL;

  //function for POST API for adding farmer
  const AddFarmer = (e) => {
    e.preventDefault();
    if (contact.length != 10) {
      setErrorContact(true);
    } else {
      let registerFarmer = {
        firstName: firstName,
        lastName: lastName,
        ownerType: ownerType,
        contact: contact,
        address: address,
        farmingSeason: farmingSeason,
        clusterId: clusterId,
        cropType: cropType,
        cropSubType: cropSubType,
      };
      fetch(`${BaseAPI}/api/farmer`, {
        method: "POST",
        headers: authHeader(),
        body: JSON.stringify(registerFarmer),
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

      history(`/farmer`);
    }
  };

  //hooks call for croptype dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/croptype`, {
      method: "GET",
      headers: authHeader(),
    }).then((cropLists) => {
      cropLists.json().then((data) => {
        setCropTypeList(data);
         console.log(data);
      });
    });
  }, []);

  //function for handling croptype and varieties
  const handleCropType = (selected) => {
    fetch(`${BaseAPI}/api/varieties/${selected}`, {
      method: "GET",
      headers: authHeader(),
    }).then((varietyList) => {
      varietyList.json().then((data) => {
        setFilteredVariety(data);
        setCropType(selected);
      });
    });
  };

  //hooks call for handling cluster dropdown
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
                        <Form onSubmit={AddFarmer}>
                          <Card className="rounded-0 p-4">
                            <Col className="m-2">
                              <Row>
                                <Col>
                                  <h4>
                                    <b>Farmer</b>
                                  </h4>
                                </Col>
                                <Col xs="8">&nbsp;</Col>

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
                                      <Link to={"/farmer"}>
                                        <Button color="danger">Yes</Button>
                                      </Link>
                                      &nbsp; &nbsp;
                                      <Button color="success" onClick={toggle}>
                                        No
                                      </Button>
                                    </ModalBody>
                                  </Modal>
                                </Col>
                              </Row>
                            </Col>
                            <Col xs="6">
                              {/* <h3 className="mb-0">Farmer Details</h3> */}
                            </Col>
                            <div>&nbsp;</div>
                            <Row>
                              <div className="col-sm">
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
                                      placeholder="Name"
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
                                      placeholder="Last Name "
                                      id="example-text-input"
                                      type="text"
                                      required
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
                                    Contact
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Contact Number"
                                      id="example-text-input"
                                      type="text"
                                      value={contact}
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setContact(e.target.value);
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
                                    md="4"
                                  >
                                    Address
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Address"
                                      id="example-text-input"
                                      type="textarea"
                                      required
                                      onChange={(e) =>
                                        setAddress(e.target.value)
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
                                    Cluster Id
                                  </Label>
                                  <Col md="6">
                                    <Input
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
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Farming Season
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        setFarmingSeason(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select Farmer Season
                                      </option>
                                      <option>Summer</option>
                                      <option>Winter</option>
                                      <option>Rainy</option>
                                      <option>Autumn</option>
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="4"
                                  >
                                    Crop Type
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        handleCropType(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select Crop Type
                                      </option>
                                      {cropTypeList.map((cropLists, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={cropLists._id}
                                          >
                                            {cropLists.name}
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
                                    Variety
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="select"
                                      // required
                                      onChange={(e) =>
                                        setCropSubType(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select Variety
                                      </option>
                                      {filteredVariety.map((variety) => {
                                        return <option>{variety.name}</option>;
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
                                    Owner Type
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      id="example-text-input"
                                      type="select"
                                      required
                                      onChange={(e) =>
                                        setOwnerType(e.target.value)
                                      }
                                    >
                                      <option selected value="">
                                        Select Owner Type
                                      </option>
                                      <option>Owner</option>
                                      <option>Lease</option>
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

export default FarmerRegister;
