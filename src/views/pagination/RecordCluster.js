import React from "react"
import { Link } from "react-router-dom"
import { Table } from "reactstrap"
const RecordCluster = ({ clusterList }) => {
    return (
        <>
            <Table id="table-to-xls" responsive>
                <thead >
                    <tr>
                        <th >Sr.No.</th>
                        <th > Cluster Id</th>
                        <th > Cluster Name</th>
                        <th > Cluster Manager</th>
                        <th > Contact Detail </th>
                        <th > Village</th>
                        <th > Action</th>
                    </tr>
                </thead>
                {clusterList.map((item, index) => (
                    <tbody>
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.clusterCode}</td>
                            <td>{item.clusterName}</td>
                            <td>{item.clusterManager}</td>
                            <td>{item.contactDetail}</td>
                            <td>{item.village}</td>
                            <td>
                                <Link className="sidebar-text" to={`/cluster-view/${item._id}`}>View</Link> |
                                <Link className="sidebar-text " to={`/cluster-edit/${item._id}`}>  Edit</Link>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </>
    )
}
export default RecordCluster