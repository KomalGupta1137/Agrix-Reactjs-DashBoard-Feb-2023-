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

const MachineRegister = () => {
  let history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [implementName, setImplementName] = useState("");
  const [implementCategory, setImplementCategory] = useState("");
  const [horsePower, setHorsePower] = useState("");
  const [wheelDrive, setWheelDrive] = useState("");
  const [ownershipId, setOwnershipId] = useState("");
  const [machineBrand, setmachineBrand] = useState("");
  const [model, setModel] = useState("");
  const [cluster, setCluster] = useState("");
  const [imieNo, setImieNo] = useState("");
  const [simNo, setsimNo] = useState("");
  const [simType, setSimType] = useState("");
  const [hpList, setHpList] = useState([]);
  const [implementList, setImplementList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [vendorShortName, setVendorShortName] = useState("");
  const [categoryShortName, setCategoryShortName] = useState("");
  const [implementShortName, setImplementShortName] = useState("");
  const [clusterCode, setClusterCode] = useState("");

  //concatanating short names for implement identifier
  const implementIdentifier =
    vendorShortName + implementShortName + categoryShortName;
  const implementCode =
    clusterCode + vendorShortName + implementShortName + categoryShortName;

  //function for states of modal  
  const [modal, setModal] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);
  const toggle = () => setModal(!modal);
  const changeUnmountOnClose = (e) => {
    let { value } = e.target;
    setUnmountOnClose(JSON.parse(value));
  };

  //function for POST API for adding machine
  const AddMachine = (e) => {
    e.preventDefault();
    let addMachine = {
      implementNameId: implementName,
      implementCategoryId: implementCategory,
      implementCode: implementCode,
      ownershipId: ownershipId,
      machineBrand: machineBrand,
      cluster: clusterCode,
      clusterCode: cluster,
      implementIdentifier: implementIdentifier,
      horsePower: horsePower,
      wheelDrive: wheelDrive,
      model: model,
      imieNo: imieNo,
      simNo: simNo,
      simType: simType,
    };
    fetch(`${BaseAPI}/api/machine`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(addMachine),
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
    history(`/machine`);
  };

  //hooks call for machine-hp dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/machinehp`, {
      method: "GET",
      headers: authHeader(),
    }).then((hpData) => {
      hpData.json().then((data) => {
        setHpList(data);
      });
    });
  }, []);


  //hooks call for implement name dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/implementname`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((dataList) => {
        setImplementList(dataList);
        console.log(dataList);
      });
    });
  }, []);


  //hooks call for category dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/category`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((categoryList) => {
        setCategoryList(categoryList);
      });
    });
  }, []);


  //hooks call for cluster dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/cluster`, {
      method: "GET",
      headers: authHeader(),
    }).then((cluster) => {
      cluster.json().then((data) => {
        setClusterList(data);
      });
    });
  }, []);

  //hooks call for vendor dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/vendor`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((vendor) => {
        setVendorList(vendor);
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
                        <Form onSubmit={AddMachine}>
                          <Card className="rounded-0 p-4">
                            <Col className="m-2">
                              <Row>
                                <Col>
                                  <h4>
                                    <b>Machine</b>
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
                                      <Link to={"/machine"}>
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

                            <div>&nbsp;</div>
                            <Row>
                              <div className="col-sm">
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Implement Code
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Implement Code"
                                      id="example-text-input"
                                      type="text"
                                      value={implementCode}
                                      disabled
                                    />
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Implement Type
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Implement Name"
                                      id="example-text-input"
                                      type="select"
                                      onChange={(e) => {
                                        setImplementShortName(
                                          JSON.parse(e.target.value).shortName
                                        );
                                        setImplementName(
                                          JSON.parse(e.target.value)._id
                                        );
                                      }}
                                    >
                                      <option
                                        selected
                                        value={JSON.stringify({
                                          _id: "",
                                          shortName: "",
                                        })}
                                      >
                                        Select Impliment Type
                                      </option>

                                      {implementList.map((list, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={JSON.stringify(list)}
                                          >
                                            {list.name}
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
                                    md="5"
                                  >
                                    Implement Category
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Implement Category"
                                      id="example-text-input"
                                      type="select"
                                      onChange={(e) => {
                                        setCategoryShortName(
                                          JSON.parse(e.target.value).shortName
                                        );
                                        setImplementCategory(
                                          JSON.parse(e.target.value)._id
                                        );
                                      }}
                                    >
                                      <option
                                        selected
                                        value={JSON.stringify({
                                          _id: "",
                                          shortName: "",
                                        })}
                                      >
                                        Select Impliment Category
                                      </option>
                                      {categoryList.map((list, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={JSON.stringify(list)}
                                          >
                                            {list.name}
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
                                    md="5"
                                  >
                                    Ownership
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Ownership"
                                      id="example-text-input"
                                      type="select"
                                      onChange={(e) => {
                                        setVendorShortName(
                                          JSON.parse(e.target.value)
                                            .vendorIdentifier
                                        );
                                        setOwnershipId(
                                          JSON.parse(e.target.value)._id
                                        );
                                      }}
                                    >
                                      <option
                                        selected
                                        value={JSON.stringify({
                                          _id: "",
                                          vendorIdentifier: "",
                                        })}
                                      >
                                        Select Vendor
                                      </option>
                                      {vendorList.map((list, index) => {
                                        return (
                                          <>
                                            <option
                                              role={index}
                                              key={index}
                                              value={JSON.stringify(list)}
                                            >
                                              {list.name}
                                            </option>
                                          </>
                                        );
                                      })}
                                    </Input>
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
                                  <Col md="6">
                                    <Input
                                      placeholder="Cluster Name"
                                      id="example-text-input"
                                      type="select"
                                      onChange={(e) => {
                                        setClusterCode(
                                          JSON.parse(e.target.value).clusterCode
                                        );
                                        setCluster(
                                          JSON.parse(e.target.value)._id
                                        );
                                      }}
                                    >
                                      <option
                                        selected
                                        value={JSON.stringify({
                                          _id: "",
                                          clusterCode: "",
                                        })}
                                      >
                                        Select Cluster Name{" "}
                                      </option>
                                      {clusterList.map((list, index) => {
                                        return (
                                          <option
                                            key={index}
                                            value={JSON.stringify(list)}
                                          >
                                            {list.clusterName}
                                          </option>
                                        );
                                      })}
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <br />
                              </div>
                              <div className="col-sm">
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Cluster ID
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Cluster ID"
                                      id="example-text-input"
                                      value={clusterCode}
                                      disabled
                                    ></Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Implement Identifier
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Implement Identifier"
                                      id="example-text-input"
                                      type="text"
                                      disabled
                                      value={implementIdentifier}
                                    />
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Horse Power
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Machine-HP"
                                      id="example-text-input"
                                      type="select"
                                      onChange={(e) =>
                                        setHorsePower(e.target.value)
                                      }
                                    >
                                      <option selected>
                                        Select Machine HP
                                      </option>
                                      {hpList.map((list, index) => {
                                        return (
                                          <option key={index} value={list.name}>
                                            {list.range}
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
                                    md="5"
                                  >
                                    Wheel Drive
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Machine-WD"
                                      type="select"
                                      id="example-text-input"
                                      onChange={(e) =>
                                        setWheelDrive(e.target.value)
                                      }
                                    >
                                      <option selected>
                                        Select Machine-WD
                                      </option>
                                      <option>2WD</option>
                                      <option>4WD</option>
                                      <option>NA</option>
                                    </Input>
                                  </Col>
                                </FormGroup>

                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    Machine Brand
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Machine Brand"
                                      id="example-text-input"
                                      type="text"
                                      onChange={(e) =>
                                        setmachineBrand(e.target.value)
                                      }
                                    />
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
                                    Model
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="Model"
                                      id="example-text-input"
                                      type="text"
                                      onChange={(e) => setModel(e.target.value)}
                                    ></Input>
                                  </Col>
                                </FormGroup>
                                <FormGroup className="row">
                                  <Label
                                    className="form-control-label"
                                    htmlFor="example-text-input"
                                    md="5"
                                  >
                                    IMEI NO
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="IMEI No"
                                      id="example-text-input"
                                      type="text"
                                      value={imieNo}
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setImieNo(e.target.value);
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
                                    SIM No
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="SIM No"
                                      id="example-text-input"
                                      type="text"
                                      value={simNo}
                                      onChange={(e) => {
                                        const check = e.target.value;
                                        const flag = true;
                                        for (var i of check) {
                                          if (!"0123456789".includes(i)) {
                                            flag = false;
                                          }
                                        }
                                        if (flag) {
                                          setsimNo(e.target.value);
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
                                    SIM Type
                                  </Label>
                                  <Col md="6">
                                    <Input
                                      placeholder="SIM Type"
                                      id="example-text-input"
                                      type="text"
                                      onChange={(e) =>
                                        setSimType(e.target.value)
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

export default MachineRegister;
