import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Table,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
} from "reactstrap";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const MachineView = ({ props, handleUpdate }) => {
  const history = useNavigate();
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [machine, setMachine] = useState([]);
  const [implement, setImplement] = useState([]);
  const [category, setCategory] = useState([]);
  const [vendor, setVendor] = useState([]);
  const [cluster, setCluster] = useState([]);
  const [implementId, setImplementId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [clusterId, setClusterId] = useState("");
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

  //function for handling machine data by objectId
  const MachineView = () => {
    fetch(`${BaseAPI}/api/machine/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((datalist) => {
        setMachine(datalist);
        setImplementId(datalist.implementNameId);
        setCategoryId(datalist.implementCategoryId);
        setVendorId(datalist.ownershipId);
        setClusterId(datalist.clusterCode);
        console.log(datalist);
      });
    });
  };

  //hooks call for implement dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/implementname`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((datalist) => {
        setImplement(datalist);
        console.log(datalist);
      });
    });
  }, []);

  //hooks call for category dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/category`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((datalist) => {
        setCategory(datalist);
        console.log(datalist);
      });
    });
  }, []);

  //hooks call for vendor dropdown
  useEffect(() => {
    fetch(`${BaseAPI}/api/vendor`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((datalist) => {
        setVendor(datalist);
        console.log(datalist);
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
        setCluster(data);
      });
    });
  }, []);

  //function for handling deletemachine
  const DeleteMachine = () => {
    fetch(`${BaseAPI}/api/machine/${props._id}`, {
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
            MachineView();
            toggle();
          }}
        >
          {" "}
          View
        </Link>
        <Modal size="xl" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {machine.implementCode} &nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp;&nbsp;
            <Link to={"/machine"}>
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
                  <th>Implement Name</th>

                  {implement.map((data) => {
                    return (
                      <>
                        {data._id === implementId ? <td>{data.name}</td> : ""}
                      </>
                    );
                  })}
                  <th>Implement Category</th>
                  {category.map((data) => {
                    return (
                      <>{data._id === categoryId ? <td>{data.name}</td> : ""}</>
                    );
                  })}
                </tr>
                <tr>
                  <th>Implement Identifier</th>
                  <td>{machine.implementIdentifier}</td>
                  <th>Ownership</th>
                  {vendor.map((data) => {
                    return (
                      <>{data._id === vendorId ? <td>{data.name}</td> : ""}</>
                    );
                  })}
                </tr>

                <tr>
                  <th>Implement-WD</th>
                  <td>{machine.wheelDrive}</td>
                  <th>Cluster</th>

                  {cluster.map((data) => {
                    return (
                      <>
                        {data._id === clusterId ? (
                          <td>{data.clusterName}</td>
                        ) : (
                          ""
                        )}
                      </>
                    );
                  })}
                </tr>
                <tr>
                  <th>Implement Brand</th>
                  <td>{machine.machineBrand}</td>
                  <th>Implement Model</th>
                  <td>{machine.model}</td>
                </tr>

                <tr>
                  <th>Horse Power</th>
                  <td>{machine.horsePower}</td>
                  <th>Sim Type</th>
                  <td>{machine.simType}</td>
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
                <Link to={"/machine"}>
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleAll();
                      DeleteMachine();
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

export default MachineView;
