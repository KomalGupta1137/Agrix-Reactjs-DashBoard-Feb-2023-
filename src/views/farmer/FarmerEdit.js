
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
import authHeader from "../../services/auth-header";
import Swal from "sweetalert2";

const FarmerEdit = ({props, handleUpdate}) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [varietyFlag, setVarietyFlag] = useState(false)
  const [farmer, setFarmer] = useState({
    firstName: props.firstName,
    lastName: props.lastName,
    ownerType: props.ownerType,
    address: props.address,
    contact:props.contact,
    farmingSeason: props.farmingSeason,
    clusterId: props.clusterId,
    cropType: props.cropType,
    cropSubType:props.cropSubType,
  });
  const [cropTypeList, setCropTypeList] = useState([]);
  const [varietyList, setVarietyList] = useState([]);
  const [cluster, setCluster] = useState([])
  const [errorContact, setErrorContact] = useState(false)
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const [unmountOnClose, setUnmountOnClose] = useState(true);

  
  //function for handling modal/nestedModal toggle
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };


//function for getting farmer by objectID
const FarmerEdit =() => {
  fetch(`${BaseAPI}/api/farmer/${props._id}`, {
    method: "GET",
    headers: authHeader()
  }).then((farmer) => {
    farmer.json().then((data) => {
      console.log(data);
      setFarmer(data);
    });
  });
}

//hooks call for croptype dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/croptype`, {
      method: "GET",
      headers: authHeader()
    }).then((cropLists) => {
      cropLists.json().then((data) => {
        setCropTypeList(data)
      });
    });
  }, []);


  //function for handling croptype and varieties
  const handleCropType = (selected) => {
    fetch(`${BaseAPI}/api/varieties/${selected}`, {
      method: "GET",
      headers: authHeader()
    }).then((data) => {
      data.json().then((dataValue) => {
        setVarietyList(dataValue)
        setVarietyFlag(true)
       
      });
    });
  };

  
  //function for handle change through spread operator
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setFarmer((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  
  //function for Update API for farmer
  const UpdateFarmer = (e) => {
    e.preventDefault();
    
    if (farmer.contact.toString().length != 10) {
      setErrorContact(true);
    }
   else{
    fetch(`${BaseAPI}/api/farmer/${props._id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(farmer),
    }).then((res) => {
      if (res.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Updated Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });}
    })
    handleUpdate();
    toggle();
  }
  };

 
  //hooks call for cluster dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/cluster`, {
      method: "GET",
      headers: authHeader()
    }).then(cluster => {
      cluster.json().then((data) => {
        setCluster(data)
      })
    })
  }, [])

  return (
    <>
      <Col xs="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            toggle();
            FarmerEdit();
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
              {farmer.firstName} {farmer.lastName} &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
              <Button color="success" onClick={UpdateFarmer}>
                Update
              </Button>&nbsp; &nbsp; &nbsp;
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
                              md="4"
                            >
                              First Name
                            </Label>
                            <Col md="6">
                              <Input
                                id="example-text-input"
                                type="text"
                                name="firstName"
                                value={farmer.firstName}
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
                              <Input id="example-text-input"
                                type="text"
                                name="lastName"
                                value={farmer.lastName}
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
                            Contact Detail
                          </Label>
                          <Col md="6">
                            <Input
                              placeholder="Contact Number"
                              id="example-text-input"
                              name="contact"
                              value={farmer.contact}
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
                                id="example-text-input"
                                type="textarea"
                                name="address"
                                value={farmer.address}
                                onChange={handleChange}
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
                                value={farmer.clusterId}
                                name="clusterId"
                                onChange={handleChange}
                              >
                                {cluster.map((List, index) => {
                                  return (
                                    <option key={index} value={List.id} selected>
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
                                value={farmer.farmingSeason}
                                name="farmingSeason"
                                onChange={handleChange}
                              >
                                <option selected>Select Farmer Season</option>
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
                                value={farmer.cropType}
                                name="cropType"
                                onChange={(e) => {
                                  handleCropType(e.target.value)
                                  handleChange(e)
                                }}
                              >
                                <option selected>Select Crop Type</option>
                                {cropTypeList.map((cropLists, index) => {
                                  return (
                                    <option key={cropLists.id} value={cropLists._id}>
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
                                value={farmer.cropSubType}
                                name="cropSubType"
                                onChange={handleChange}
                              >
                                {varietyFlag === true ? <option>Select Variety</option> : <option selected>{farmer.cropSubType}</option>}
                                {varietyList.map((variety, index) => {
                                  return (
                                    <option key={index} value={variety.id}>
                                      {variety.name}
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
                            Owner Type
                          </Label>
                          <Col md="6">
                            <Input
                              id="example-text-input"
                              type="select"
                              name="ownerType"
                              value={farmer.ownerType}
                              onChange={handleChange}
                            >
                              <option selected>Select Owner Type</option>
                              <option>Lease</option>
                              <option>Owner</option>
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
                  {" "}  &nbsp; &nbsp; &nbsp;
                  <Button color="danger" onClick={toggleAll}>
                    Yes
                  </Button> &nbsp; &nbsp;
                  <Button color="success" onClick={toggleNested}>
                    No
                  </Button>{" "}
                </ModalBody>
              </Modal>
            </ModalBody>
          </Modal>
        </Row>
      </Col >
    </>
  );
};
 

export default FarmerEdit;
