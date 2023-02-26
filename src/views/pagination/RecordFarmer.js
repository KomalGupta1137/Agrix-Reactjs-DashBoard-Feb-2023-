import React from "react";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const RecordFarmer = ({ farmerDataList }) => {
    return (
        <>
            <Table className="align-items-center table-flush" id="table-to-xls" responsive>
                <thead>
                    <tr>
                        <th > Sr. NO.</th>
                        <th > First Name</th>
                        <th > Last Name</th>
                        <th >Cluster ID</th>
                        <th > Owner Type</th>
                        <th > Action</th>
                    </tr>
                </thead>
                {farmerDataList.map((item, index) => (
                    <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.firstName}
                                <Link className="sidebar-text" to={'/plot-register/' + item._id}><br />Add Plot</Link></td>
                            <td>{item.lastName}<Link className="sidebar-text" to={'/plot/' + item._id}><br />Plot List</Link></td>
                            <td>{item.clusterId}</td>
                            <td>{item.ownerType}</td>
                            <td>
                                <Link className="sidebar-text" to={`/farmer-view/` + item._id}>View</Link> |
                                <Link className="sidebar-text" to={`/farmer-edit/` + item._id}> Edit</Link>
                                {/* <Link to={`'/admin/farmer-view`+item._id}> Delete</Link> */}
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </>
    );

}
export default RecordFarmer;


