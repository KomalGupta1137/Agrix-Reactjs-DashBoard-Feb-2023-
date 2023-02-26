import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useParams, useNavigate } from "react-router-dom";
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

const Implement = () => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [implementName, setImplementName] = useState("");
  const [shortName, setShortName] = useState("");
  const [ImplementList, setImplementList] = useState([]);
  const [id, setId] = useState("");
  const [implement, setImplement] = useState({
    name: "",
    shortName: "",
  });
  const [listUpdate, setlistUpdate] = useState(0);
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

  //function for adding implement name
  const AddImplementName = (e) => {
    e.preventDefault();
    let addimplement = {
      name: implementName,
      shortName: shortName,
    };
    fetch(`${BaseAPI}/api/implementname`, {
      method: "POST",
      headers: authHeader(),
      body: JSON.stringify(addimplement),
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
        setImplementList([...ImplementList, data]);
      });
    });
  };

  //hooks call for dropdown of implement name
  useEffect(() => {
    fetch(`${BaseAPI}/api/implementname`, {
      method: "GET",
      headers: authHeader(),
    }).then((implement) => {
      implement.json().then((data) => {
        setImplementList(data);
      });
    });
  }, [listUpdate]);

  //function for deleting implement
  const DeleteImplement = () => {
    fetch(`${BaseAPI}/api/implementname/${id}`, {
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
      setlistUpdate(listUpdate + 1);
    });
  };

  //function for updating value of key in implement
  const handleChange = (e) => {
    console.log(e.target.name);
    var key = e.target.name;
    var value = e.target.value;
    setImplement((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

//function for updating implement
  const UpdateImplement = (e) => {
    e.preventDefault();
    fetch(`${BaseAPI}/api/implementname/${id}`, {
      method: "PUT",
      headers: authHeader(),
      body: JSON.stringify(implement),
    }).then((data) => {
      if (data.status === 200) {
        Swal.fire({
          text: "Updated Successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
      }
      setlistUpdate(listUpdate + 1);
    });
  };

  return (
    <>
      <Col lg="12" className="p-0">
        <Col className="p-0">
          <Row className="p-0">
            <Col lg="12">
              <Card className="p-4">
                <Form onSubmit={AddImplementName}>
                  <Col>
                    <Col lg="12">
                      <Row>
                        <Col lg="3">
                          <FormGroup>
                            <Input
                              placeholder="Implement Name"
                              id="example-text-input"
                              type="text"
                              name="name"
                              value={implement.name}
                              onChange={(e) => {
                                setImplementName(e.target.value);
                                handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="3">
                          <FormGroup>
                            <Input
                              placeholder="Short Name"
                              id="example-text-input"
                              type="text"
                              name="shortName"
                              value={implement.shortName}
                              onChange={(e) => {
                                setShortName(e.target.value);
                                handleChange(e);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col lg="1">
                          <Button color="success" type="submit">
                            Submit
                          </Button>
                        </Col>
                        <Col lg="1">
                          <Button color="success" onClick={UpdateImplement}>
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
                          <th> Implement</th>
                          <th> Short Name</th>
                          <th> Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {ImplementList.map((item, index) => (
                          <>
                            <tr>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.shortName}</td>
                              <td>
                                <Link
                                  className="sidebar-text"
                                  onClick={(e) => {
                                    setId(item._id);
                                    setImplement({
                                      name: item.name,
                                      shortName: item.shortName,
                                    });
                                  }}
                                >
                                  Edit
                                </Link>
                                &nbsp; | &nbsp;
                                <Link
                                  className="sidebar-text"
                                  onClick={(e) => {
                                    {
                                      setId(item._id);
                                      toggleNested();
                                    }
                                  }}
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
                            DeleteImplement();
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
          </Row>
        </Col>
      </Col>
    </>
  );
};

export default Implement;
