import React, { useState, useEffect } from "react";
import { Link} from "react-router-dom";
import { Button, Table, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import Swal from "sweetalert2";
import authHeader from "../../services/auth-header";

const PlotView = ({ props, handleUpdate, plotCountUpdate }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [plot, setPlot] = useState([]);
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

  //function for getting plot data by objectId
  const PlotView = () => {
    fetch(`${BaseAPI}/api/plot/plotById/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((plot) => {
      plot.json().then((data) => {
        console.log(data);
        setPlot(data);
        setStateId(data.state);
      });
    });
  };

  //hooks call for state name by objectId
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

  //function for delete plot
  const DeletePlot = () => {
    fetch(`${BaseAPI}/api/plot/${props._id}`, {
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
        plotCountUpdate();
      });
    });
  };
  return (
    <>
      <Col lg="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            PlotView();
            toggle();
          }}
        >
          {" "}
          View
        </Link>
        <Modal size="xl" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {plot.plotId} &nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp; &nbsp;&nbsp; &nbsp;
            &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;&nbsp; &nbsp;
            <Button
              color="danger"
              onClick={() => {
                toggleNested();
              }}
            >
              Delete
            </Button>
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <thead>
                <tr>
                  <th>Plot Id</th>
                  <td>{plot.plotId}</td>
                  <th>Latitude</th>
                  <td>{plot.latitude}</td>
                </tr>
                <tr>
                  <th>Cluster Id</th>
                  <td>{plot.clusterId}</td>
                  <th>Longitude</th>
                  <td>{plot.long}</td>
                </tr>
                <tr>
                  <th>Village</th>
                  <td>{plot.village}</td>
                  <th>Plot Shape</th>
                  <td>{plot.plotShape}</td>
                </tr>
                <tr>
                  <th>State</th>
                  <td>
                    {stateData.map((state) => {
                      return (
                        <>
                          {state._id === stateId ? <td>{state.name}</td> : ""}
                        </>
                      );
                    })}
                  </td>
                  <th>Soil Type</th>
                  <td>{plot.soilType}</td>
                </tr>
                <tr>
                  <th>District</th>
                  <td>{plot.district}</td>
                  <th>Area (acre)</th>
                  <td>{plot.areaOfPlot} acre</td>
                </tr>

                <tr>
                  <th>Perimeter</th>
                  <td>{plot.perimeterOfPlot} meter</td>
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
                <Link to={`/plot/${plot.farmerId}`}>
                  <Button
                    color="danger"
                    onClick={() => {
                      toggleAll();
                      DeletePlot();
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

export default PlotView;
