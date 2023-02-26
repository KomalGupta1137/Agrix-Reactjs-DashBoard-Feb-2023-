import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Table,
  Row,
  Col,
  Form,
  Input,
  FormGroup,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import authHeader from "../../services/auth-header";
import Swal from "sweetalert2";

const CropType = () => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [cropTypeList, setCropTypeList] = useState([]);
  const [varietyList, setVarietyList] = useState([]);
  const [cropName, setCropName] = useState("");
  const [varietyName, setVarietyName] = useState("");
  const [cropInput, setCropInput] = useState("");
  const [cropTypeId, setCropTypeId] = useState("");
  const [id, setId] = useState("");
  const [listUpdate, setlistUpdate] = useState(0);
  const [varietyListUpdate, setVarietyListUpdate] = useState(0);
  const [cropType, setCropType] = useState({
    name: "",
  });
  const [variety, setVariety] = useState({
    name: "",
    cropId: "",
  });
  const [cropVariety, setCropVariety] = useState([]);
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  // function for adding croptype
  const AddCropType = (e) => {
    e.preventDefault();
    let addcroptype = {
      name: cropName,
    };
    fetch(`${BaseAPI}/api/croptype`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(addcroptype),
    }).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Registered Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      data.json().then((data) => {
        setCropTypeList([...cropTypeList, data]);
      });
    });
  };

  //function for adding varieties
  const AddVarieties = (e) => {
    e.preventDefault();
    let addVarieties = {
      name: varietyName,
      cropId: cropInput,
    };
    fetch(`${BaseAPI}/api/varieties`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(addVarieties),
    }).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Registered Successfully",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      data.json().then((data) => {
        setVarietyList([...varietyList, data]);
        window.location.reload()
      });
    });
  };

  //hooks call for list of croptype
  useEffect(() => {
    fetch(`${BaseAPI}/api/croptype`, {
      method: "GET",
      headers: authHeader(),
    }).then((cropLists) => {
      cropLists.json().then((data) => {
        setCropTypeList(data);
      });
    });
  }, [listUpdate]);

  //function for deleting croptype
  const DeleteCropType = (e, id) => {
    fetch(`${BaseAPI}/api/croptype/${id}`, {
      method: "DELETE",
      headers: authHeader(),
    }).then((res) => {
      if (res.status === 200) {
              Swal.fire({
                title: "Success",
                text: "Deleted Successfully!",
                icon: "success",
                confirmButtonText: "OK",
              });
            }
       setlistUpdate(listUpdate+1)
      });
   
    
  };

  //hooks call for list of varieties
  useEffect(() => {
    fetch(`${BaseAPI}/api/varieties`, {
      method: "GET",
      headers: authHeader(),
    }).then((varieties) => {
      varieties.json().then((data) => {
        setVarietyList(data);
        setCropVariety(data.croptype);
        console.log(data);
      });
    });
  }, [varietyListUpdate]);

  //function for deleting variety
  const DeleteVariety = (e, id) => {
    fetch(`${BaseAPI}/api/varieties/${cropTypeId}`, {
      method: "DELETE",
      headers: authHeader(),
    }).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Deleted Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setVarietyListUpdate(varietyListUpdate + 1);
    });
  };

  //function for updating value of key of  croptype
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setCropType((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  //HandleChange for Variety
  const handleChangeVariety = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setVariety((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  //function for updating croptype
  const UpdateCropType = () => {
    fetch(`${BaseAPI}/api/croptype/${id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(cropType),
    }).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          title: "Success",
          text: "Updated Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setlistUpdate(listUpdate + 1);
    });
  };

  //function for updating variety
  const UpdateVariety = (e) => {
    e.preventDefault();
    fetch(`${BaseAPI}/api/varieties/${cropTypeId}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(variety),
    }).then((data) => {
      if (data.status === 200) {
              Swal.fire({
                text: "Updated Successfully!",
                icon: "success",
                confirmButtonText: "OK",
              });
            }
    })
    setVarietyListUpdate(varietyListUpdate + 1);
  };

  return (
    <>
      <Col lg="12" className="p-0">
        <Col className="p-0">
          <Row className="p-0">
            <Col lg="5">
              <Card className="p-4">
                <Form onSubmit={AddCropType}>
                  <Col>
                    <Col lg="12">
                      <Row>
                        <Col lg="7">
                          <FormGroup>
                            <Input
                              placeholder="Crop Type"
                              id="example-text-input"
                              type="text"
                              name="name"
                              value={cropType.name}
                              required
                              onChange={(e) => {
                                setCropName(e.target.value);
                                handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="2">
                          <Button color="success" type="submit">
                            Submit
                          </Button>
                        </Col>
                        <Col lg="1">&nbsp;</Col>
                        <Col lg="2">
                          <Button color="success" onClick={UpdateCropType}>
                            Edit
                          </Button>
                        </Col>
                      </Row>
                    </Col>
                  </Col>
                  <Col>
                    <Table
                      className="align-items-center table-flush"
                      id="table-to-xls"
                      responsive
                    >
                      <thead className="thead-light">
                        <tr>
                          <th> Sr. NO.</th>
                          <th> CropName</th>
                          <th> Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cropTypeList.map((item, index) => (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>
                                <Link
                                  className="sidebar-text"
                                  onClick={(e) => {
                                    setId(item._id);
                                    setCropType({ name: item.name });
                                  }}
                                >
                                  Edit
                                </Link>
                                &nbsp; | &nbsp;
                                <Link
                                  className="sidebar-text"
                                  onClick={(e) => {
                                    {
                                      DeleteCropType(e, item._id);
                                    }
                                  }}
                                  // onClick={(e) => {
                                  //   {
                                  //    setId(item._id)
                                  //    toggleNested();

                                  //   }
                                  // }}
                                >
                                  Delete
                                </Link>
                              </td>
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </Table>
                    <Modal
                      className="text-center"
                      isOpen={nestedModal}
                      toggle={toggleNested}
                      onClosed={closeAll ? toggle : undefined}
                    >
                      <ModalHeader>Do you want to Delete Record</ModalHeader>
                      <ModalBody className="text-center">
                        <Button
                          color="danger"
                          onClick={() => {
                            toggleAll();
                            DeleteCropType();
                          }}
                        >
                          Yes
                        </Button>
                        &nbsp; &nbsp;
                        <Button color="success" onClick={toggleNested}>
                          No
                        </Button>
                      </ModalBody>
                    </Modal>
                  </Col>
                </Form>
              </Card>
            </Col>
            <Col lg="7">
              <Card className="p-4">
                <Col>
                  <Form onSubmit={AddVarieties}>
                    <Col>
                      <Col lg="12">
                        <Row>
                          <Col lg="4">
                            <FormGroup className="row">
                              <Input
                                id="example-text-input"
                                type="select"
                                required
                                // value={variety.cropId}
                                onChange={(e) => {
                                  setCropInput(e.target.value);
                                  handleChangeVariety(e);
                                }}
                              >
                                <option>Select Crop</option>
                                {cropTypeList.map((List, index) => {
                                  return (
                                    <option key={index} value={List._id}>
                                      {List.name}
                                    </option>
                                  );
                                })}
                              </Input>
                            </FormGroup>
                          </Col>
                          <Col lg="4">
                            <FormGroup>
                              <Input
                                placeholder="Variety"
                                id="example-text-input"
                                type="text"
                                name="name"
                                value={variety.name}
                                required
                                onChange={(e) => {
                                  setVarietyName(e.target.value);
                                  handleChangeVariety(e);
                                }}
                              />
                            </FormGroup>
                          </Col>
                          <Col lg="1">
                            <Button color="success" type="submit">
                              Submit
                            </Button>
                          </Col>
                          <Col lg="1">&nbsp;</Col>
                          <Col lg="1">
                            <Button color="success" onClick={UpdateVariety}>
                              Edit
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Col>
                    <Col>
                      <Table
                        className="align-items-center table-flush"
                        id="table-to-xls"
                        responsive
                      >
                        <thead className="thead-light">
                          <tr>
                            <th> Sr. NO.</th>
                            <th>CropType</th>
                            <th>Variety</th>
                            <th> Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {varietyList.map((item, index) => {
                            // console.log(item["crop-variety"], "item");
                            return (
                              <>
                                <tr>
                                  <td>{index + 1}</td>
                                  <td>
                                    {item["crop-variety"]
                                      ? item["crop-variety"].map((e) => e.name)
                                      : null}
                                  </td>
                                  <td>{item.name}</td>
                                  <td>
                                    <Link
                                      className="sidebar-text"
                                      onClick={(e) => {
                                        setCropTypeId(item._id);
                                        setVariety({
                                          name: item.name,
                                        });
                                      }}
                                    >
                                      Edit
                                    </Link>
                                    &nbsp; | &nbsp;
                                    <Link
                                      className="sidebar-text"
                                      onClick={() => {
                                        setCropTypeId(item._id);
                                        toggleNested();
                                      }}
                                    >
                                      Delete
                                    </Link>
                                  </td>
                                </tr>
                              </>
                            );
                          })}
                        </tbody>
                      </Table>
                      <Modal
                        className="text-center"
                        isOpen={nestedModal}
                        toggle={toggleNested}
                        onClosed={closeAll ? toggle : undefined}
                      >
                        <ModalHeader>Do you want to Delete Record</ModalHeader>
                        <ModalBody className="text-center">
                          <Button
                            color="danger"
                            onClick={() => {
                              toggleAll();
                              DeleteVariety();
                            }}
                          >
                            Yes
                          </Button>
                          &nbsp; &nbsp;
                          <Button color="success" onClick={toggleNested}>
                            No
                          </Button>
                        </ModalBody>
                      </Modal>
                    </Col>
                  </Form>
                </Col>
              </Card>
            </Col>
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default CropType;

// <Link
//   className="sidebar-text"
//   onClick={(e) => {
//     setCropTypeId(item._id);
//     setVarietyId(item._id);
//     setVariety({
//       ...variety,
//       name: item.name,
//     });
//   }}
// >
//   Edit
// </Link>
