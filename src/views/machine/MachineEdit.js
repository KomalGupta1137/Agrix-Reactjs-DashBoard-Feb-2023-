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
} from "reactstrap";
import authHeader from "../../services/auth-header";
import Swal from "sweetalert2";

const MachineEdit = ({ props, handleUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [machine, setMachine] = useState({
    implementCode: "",
    ownershipId: "",
    implementNameId: "",
    implementCategoryId: "",
    horsePower: "",
    wheelDrive: "",
    machineBrand: "",
    model: "",
    cluster: "",
    clusterCode: "",
    implementIdentifier: "",
    imieNo: "",
    simNo: "",
    simType: "",
  });
  const [hpList, setHpList] = useState([]);
  const [implementList, setImplementList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [clusterList, setClusterList] = useState([]);
  const [vendorList, setVendorList] = useState([]);
  const [clusterId, setClusterId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [implementId, setImplementId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [clusterName, setClusterName] = useState("");
  const [implementClusterId, setImplementClusterId] = useState("");
  const [implementNameId, setImplementNameId] = useState("");
  const [implementCategoryId, setImplementCategoryId] = useState("");
  const [ownershipId, setOwnershipId] = useState("");
  const [clusterCode, setClusterCode] = useState("");
  const [vendorShortName, setVendorShortName] = useState("");
  const [categoryShortName, setCategoryShortName] = useState("");
  const [implementShortName, setImplementShortName] = useState("");
  const [implementName, setImplementName] = useState("");
  const implementIdentifier =
    vendorShortName + implementShortName + categoryShortName;
  const implementCode =
    clusterCode + vendorShortName + implementShortName + categoryShortName;

  //function for handling modal state
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  //function for handling toggle for modal
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  //function for get API by machineId
  const MachineEdit = () => {
    fetch(`${BaseAPI}/api/machine/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((machine) => {
      machine.json().then((data) => {
        setMachine(data);
        setClusterId(data.clusterCode);
        setVendorId(data.ownershipId);
        setImplementId(data.implementNameId);
        setCategoryId(data.implementCategoryId);
      });
    });
  };

  //hooks call for machine-hp list
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

  //hooks call for implement category dropdown
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

  //hooks call for ownership dropdown
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

  //function for handling key value via spread operator
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setMachine((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  //function for update API
  const UpdateMachine = (e) => {
    e.preventDefault();
    fetch(`${BaseAPI}/api/machine/${props._id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(machine),
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
            MachineEdit();
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
              {machine.implementCode} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
              &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
              &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              <Button color="success" onClick={UpdateMachine}>
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
                                    name="implementCode"
                                    id="example-text-input"
                                    type="text"
                                    value={machine.implementCode}
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
                                    name="implementNameId"
                                    id="example-text-input"
                                    type="select"
                                    disabled
                                    onChange={(e) => {
                                      setImplementShortName(
                                        JSON.parse(e.target.value).shortName
                                      );
                                      setImplementName(
                                        JSON.parse(e.target.value)._id
                                      );
                                    }}
                                  >
                                    {implementList.map((implement) => {
                                      return (
                                        <>
                                          {implement._id === implementId ? (
                                            <option selected>
                                              {implement.name}
                                            </option>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}

                                    {implementList.map((implement, index) => {
                                      return (
                                        <option
                                          key={index}
                                          value={JSON.stringify(implement)}
                                        >
                                          {implement.name}
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
                                    name="implementCategoryId"
                                    id="example-text-input"
                                    type="select"
                                    disabled
                                    onChange={(e) => {
                                      setCategoryShortName(
                                        JSON.parse(e.target.value).shortName
                                      );
                                      setImplementCategoryId(
                                        JSON.parse(e.target.value)._id
                                      );
                                    }}
                                  >
                                    {categoryList.map((category) => {
                                      return (
                                        <>
                                          {category._id === categoryId ? (
                                            <option selected>
                                              {category.name}
                                            </option>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}
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
                                    name="ownershipId"
                                    id="example-text-input"
                                    type="select"
                                    disabled
                                    value={machine.ownershipId}
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
                                    {vendorList.map((vendor) => {
                                      return (
                                        <>
                                          {vendor._id === vendorId ? (
                                            <option>{vendor.name}</option>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}
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
                                    name="cluster"
                                    id="example-text-input"
                                    type="select"
                                    disabled
                                    onChange={(e) => {
                                      setClusterCode(
                                        JSON.parse(e.target.value).clusterCode
                                      );
                                      setImplementClusterId(
                                        JSON.parse(e.target.value)._id
                                      );
                                    }}
                                  >
                                    {clusterList.map((cluster) => {
                                      return (
                                        <>
                                          {cluster._id === clusterId ? (
                                            <option selected>
                                              {cluster.clusterName}
                                            </option>
                                          ) : (
                                            ""
                                          )}
                                        </>
                                      );
                                    })}

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
                                    name="clusterCode"
                                    id="example-text-input"
                                    value={machine.cluster}
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
                                    name="implementIdentifier"
                                    id="example-text-input"
                                    type="text"
                                    value={machine.implementIdentifier}
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
                                  Horse Power
                                </Label>
                                <Col md="6">
                                  <Input
                                    name="horsePower"
                                    id="example-text-input"
                                    type="select"
                                    value={machine.horsePower}
                                    onChange={handleChange}
                                  >
                                    <option selected>
                                      {machine.horsePower}
                                    </option>
                                    <option>Select Machine HP</option>

                                    {hpList.map((list, index) => {
                                      return (
                                        <option key={index} value={list.id}>
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
                                    name="wheelDrive"
                                    id="example-text-input"
                                    value={machine.wheelDrive}
                                    onChange={handleChange}
                                  >
                                    {/* <option selected>Select Machine-WD</option> */}
                                    {/* <option selected>
                                      {machine.wheelDrive}
                                    </option> */}
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
                                    name="machineBrand"
                                    id="example-text-input"
                                    type="text"
                                    value={machine.machineBrand}
                                    onChange={handleChange}
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
                                    name="model"
                                    id="example-text-input"
                                    type="text"
                                    value={machine.model}
                                    onChange={handleChange}
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
                                    name="imieNo"
                                    id="example-text-input"
                                    type="text"
                                    value={machine.imieNo}
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
                                  SIM No
                                </Label>
                                <Col md="6">
                                  <Input
                                    name="simNo"
                                    id="example-text-input"
                                    type="text"
                                    value={machine.simNo}
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
                                  SIM Type
                                </Label>
                                <Col md="6">
                                  <Input
                                    placeholder="SIM Type"
                                    id="example-text-input"
                                    type="text"
                                    name="simType"
                                    value={machine.simType}
                                    onChange={handleChange}
                                  ></Input>
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

export default MachineEdit;
