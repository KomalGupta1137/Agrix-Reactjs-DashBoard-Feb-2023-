import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const RecordDriver = ({ driverList }) => {
  return (
    <>
      <Table hover>
        <thead>
          <tr>
            <th > Sr. NO.</th>
            <th > Driver ID</th>
            <th > First Name</th>
            <th > last Name</th>
            <th > Contact Details</th>
            <th > Action</th>
          </tr>
        </thead>
        {driverList.map((item, index) => (
          <tbody>
            <tr>
              <td>{index + 1}</td>
              <td>{item.driverId}</td>
              <td>
                {item.firstName}
              </td>
              <td>
                {item.lastName}

              </td>
              <td>
                {item.contactDetails}
              </td>
              <td>
                <Link className="sidebar-text" to={`/driver-view/` + item._id}> View </Link> |
                <Link className="sidebar-text" to={`/driver-edit/` + item._id}> Edit </Link>
              </td>
            </tr>
          </tbody>
        ))}
      </Table>
    </>
  );
};
export default RecordDriver;




