import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Table, Col, Modal, ModalHeader, ModalBody } from "reactstrap";
import authHeader from "../../services/auth-header";

const OperationHistory = ({ props }) => {
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [farmer, setFarmer] = useState({});
  const [history, setHistory] = useState([]);
  const [modal, setModal] = useState(false);

  //function for handling toggle for modal
  const toggle = () => setModal(!modal);

  //fetching farmerdata according to objectId
  const FarmerData = () => {
    fetch(`${BaseAPI}/api/farmer/${props._id}`, {
      method: "GET",
      headers: authHeader(),
    }).then((farmer) => {
      farmer.json().then((data) => {
        setFarmer(data);
      });
    });
  };
  
  //fetching farm-machine history according to phone number
  const History = () => {
    fetch(`${BaseAPI}/api/farm-machine/operationhistory/${props.contact}`, {
      method: "GET",
      headers: authHeader(),
    }).then((history) => {
      history.json().then((data) => {
        setHistory(data);
      });
    });
  };

  //size per page 
  let size = 10

  //list of machine for first page
  useEffect(() => {
    const getComments = async () => {

    }

  } ,[size])

  return (
    <>
      <Col lg="12">
        <Link
          className="sidebar-text "
          onClick={() => {
            FarmerData();
            History();
            toggle();
          }}
        >
          {" "}
          History
        </Link>
        <Modal size="md" isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            {farmer.firstName} {farmer.lastName}
          </ModalHeader>
          <ModalBody>
            <Table bordered>
              <thead>
                <tr>
                  <th> Machine ID</th>
                  <th>Attatchment ID</th>
                  <th>Service Date</th>
                </tr>
              </thead>
              {history.map((item)=> (
                <tbody>
                  <tr>
                    <td style={{color:"green"}}>
                    <strong>{item.machineId}</strong></td>
                    <td style={{color:"green"}}><strong>{item.attachmentId}</strong></td>
                    <td style={{color:"green"}}><strong>{item.scheduleDate}</strong></td>
                  </tr>
                </tbody>
              ))}
             
            </Table>
            <br />
            
          </ModalBody>
        </Modal>
      </Col>
    </>
  );
};

export default OperationHistory;
