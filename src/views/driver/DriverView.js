import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import {
  Button,
  Table,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const DriverView = ({ props, handleUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [driver, setDriver] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [stateId, setStateId] = useState("");
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

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

  //function to get driver data according to objectID
  const DriverView = () => {
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

  //hooks call for getting state name in according to objectID
  useEffect(() => {
    fetch(`${BaseAPI}/api/state/${stateId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((stateData) => {
      stateData.json().then((state) => {
        setStateData(state);
      });
    });
  }, []);

  //function for deleting driver
  const DeleteDriver = () => {
    fetch(`${BaseAPI}/api/driver/${props._id}`, {
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
      res.json().then((data) => {
        handleUpdate();
      });
    });
  };

  return (
    <>
      <Col lg="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            DriverView();
            toggle();
          }}
        >
          {" "}
          View
        </Link>
        <Modal size="md" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {driver.firstName} {driver.lastName} &nbsp; &nbsp; &nbsp;&nbsp;
            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            <Link to={"/driver"}>
              <Button
                color="danger"
                onClick={() => {
                  toggleNested();
                }}
              >
                Delete
              </Button>
            </Link>
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Driver Id</th>
                  <td>{driver.driverId}</td>
                </tr>
                <tr>
                  <th>First Name</th>
                  <td>{driver.firstName}</td>
                </tr>
                <tr>
                  <th>Last Name</th>
                  <td>{driver.lastName}</td>
                </tr>
                <tr>
                  <th>Contact Detail</th>
                  <td>{driver.contactDetails}</td>
                </tr>
                <tr>
                  <th>State</th>
                  {stateData &&
                    stateData.map((data) => {
                      return (
                        <>{data._id === stateId ? <td>{data.name}</td> : ""}</>
                      );
                    })}
                </tr>
                <tr>
                  <th>District</th>
                  <td>{driver.district}</td>
                </tr>
                <tr>
                  <th>Village</th>
                  <td>{driver.village}</td>
                </tr>
                <tr>
                  <th>Cluster Id</th>
                  <td>{driver.clusterId}</td>
                </tr>
              </thead>
            </Table>
            <Modal
              className="text-center"
              isOpen={nestedModal}
              toggle={toggleNested}
              onClosed={closeAll ? toggle : undefined}
            >
              <ModalHeader>Do you want to Delete Record</ModalHeader>
              <ModalBody className="text-center">
                <Link to={"/driver"}>
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleAll();
                      DeleteDriver();
                    }}
                  >
                    Yes
                  </Button>
                </Link>
                &nbsp; &nbsp;
                <Button color="success" onClick={toggleNested}>
                  No
                </Button>
              </ModalBody>
            </Modal>
          </ModalBody>
        </Modal>
      </Col>
    </>
  );
};

export default DriverView;
