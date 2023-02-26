import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import {
  Button,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const ClusterView = ({ props, handleUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [cluster, setCluster] = useState({});
  const [stateId, setStateId] = useState("");
  const [stateData, setStateData] = useState([]);

  //function for default state for modal/nestedModal
  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  //function for modal/nestedModal toggle
  const toggle = () => setModal(!modal);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };

  //function for clusterdata according to objectId
  const ClusterView = () => {
    fetch(`${BaseAPI}/api/cluster/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((listOfCluster) => {
      listOfCluster.json().then((datalist) => {
        setCluster(datalist);
        setStateId(datalist.state);
      });
    });
  };


  //hooks call for state name  according to objectId
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
  

  //function to call DELETE API
  const DeleteCluster = () => {
    fetch(`${BaseAPI}/api/cluster/${props._id}`, {
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
      <div>
        <Link
          className="sidebar-text "
          onClick={() => {
            ClusterView();
            toggle();
          }}
        >
          {" "}
          View
        </Link>
        <Modal size="xl" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {cluster.clusterCode} &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp;
            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;
            &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            <Link to={"/cluster"}>
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
                  <th>Cluster Id</th>
                  <td>{cluster.clusterCode}</td>
                  <th>State</th>
                  <td>
                    {" "}
                    {stateData.map((data) => {
                      return (
                        <>{data._id === stateId ? <td>{data.name}</td> : ""}</>
                      );
                    })}{" "}
                  </td>
                </tr>
                <tr>
                  <th>Cluster Name</th>
                  <td>{cluster.clusterName}</td>
                  <th>District</th>
                  <td>{cluster.district}</td>
                </tr>
                <tr>
                  <th>Cluster Manager</th>
                  <td>{cluster.clusterManager}</td>
                  <th>Latitude</th>
                  <td>{cluster.latitude}</td>
                </tr>
                <tr>
                  <th>Contact Detail</th>
                  <td>{cluster.contactDetail}</td>
                  <th>Longitude</th>
                  <td>{cluster.longitude}</td>
                </tr>

                <tr>
                  <th>Village</th>
                  <td>{cluster.village}</td>
                </tr>
                <tr></tr>
                <tr>
                  <th>Office Address</th>
                  <td>{cluster.officeAddress}</td>
                </tr>
              </thead>
            </Table>
            <Modal
              className="text-center"
              isOpen={nestedModal}
              toggle={toggleNested}
              onClosed={closeAll ? toggle : undefined}
            >
              <ModalHeader toggle={toggle}>
                Do you want to Delete Record
              </ModalHeader>
              <ModalBody className="text-center">
                <Link to={"/cluster"}>
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleAll();
                      DeleteCluster();
                    }}
                  >
                    Yes
                  </Button>
                </Link>{" "}
                &nbsp; &nbsp;
                <Button color="success" onClick={toggleNested}>
                  No
                </Button>
              </ModalBody>
            </Modal>
          </ModalBody>
        </Modal>
      </div>
    </>
  );
};

export default ClusterView;
