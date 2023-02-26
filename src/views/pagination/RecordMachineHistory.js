import React from "react"
import Moment from "react-moment"
import { Table } from "reactstrap"
const RecordMachineHistory = ({ machine }) => {
  return (
    <>
      <Table hover border>
        <thead>
          <tr>
            <th style={{ color: "black" }}>Machine-Id</th>
            <th style={{ color: "black" }}>Cluster-Id</th>
            <th style={{ color: "black" }}>Attachment-Id</th>
            <th style={{ color: "black" }}>Driver-Id</th>
            <th style={{ color: "black" }}>Phone Number</th>
            <th style={{ color: "black" }}>Schedule Date</th>
            <th style={{ color: "black" }}>Service Date</th>
            <th style={{ color: "black" }}>Start Time</th>
            <th style={{ color: "black" }}>Stop Time</th>
          </tr>
        </thead>
        {machine.map((post, index) => (
          <tbody>
            <tr key={index}>
              <td>{post.machineId}</td>
              <td>{post.clusterId}</td>
              <td>{post.attachmentId}</td>
              <td>{post.driverId}</td>
              <td>{post.phoneNumber}</td>
              <td><Moment format="MMM DD YYYY">{post.scheduleDate}</Moment></td>
              <td><Moment format="MMM DD YYYY">{post.startTime}</Moment></td>
              <td><Moment format="HH:mm:ss">{post.startTime}</Moment></td>
              <td><Moment format="HH:mm:ss">{post.stopTime}</Moment></td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  )
}
export default RecordMachineHistory