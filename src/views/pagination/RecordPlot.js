import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Table } from "reactstrap";
import authHeader from "../../services/auth-header";

const RecordPlot = ({farmerPlotList}) => {

    const BaseAPI=process.env.REACT_APP_SERVER_URL;
    const [plot,setPlot]=useState("");
    const [plotList,setPlotList]=useState([]);
    const {farmerId}=useParams();

    // useEffect(() => {
    //     fetch(`${BaseAPI}/api/plot/${farmerId}`, {
    //       method: 'GET',
    //       headers: authHeader()
    //     }).then((data) => {
    //       data.json().then((datalist) => {
    //           setPlotList(datalist);
    //           console.log("***********",datalist);
            
    //       })
    //     })
    
    //   }, []);


    //   useEffect(() => {
    //     fetch(`${BaseAPI}/api/state/${plot}`, {
    //       method: 'GET',
    //       headers: authHeader()
    //     }).then((data) => {
    //       data.json().then((data) => {
    //         console.log(data)
    //         setPlotList(data);
    //         setPlot(data.state)
    //       })
    //     })
    //   }, []);

    return (
        <>
            <Table className="align-items-center table-flush" id="table-to-xls" responsive>
                <thead className="thead-light">
                    <tr>
                        <th>Sr. No.</th>
                        <th>Plot Id</th>
                        <th>Latitude</th>
                        <th>Longitude</th>
                        <th>Area</th>
                        <th>Perimeter</th>
                        <th>Action</th>
                    </tr>
                </thead>
                {farmerPlotList.map((item, index) => (
                    <tbody>
                        <tr>
                            <td>{index + 1}</td>
                            <td>{item.plotId}</td>
                            <td>{item.latitude}</td>
                            <td>{item.long}</td>
                            <td>{item.areaOfPlot}</td>
                            <td>{item.perimeterOfPlot}</td>
                            <td>
                                <Link className="sidebar-text" to={`/plot-view/${item._id}`}>View</Link> |
                                <Link className="sidebar-text" to={`/plot-edit/${item._id}`}> Edit</Link>
                            </td>
                        </tr>
                    </tbody>
                ))}
            </Table>
        </>
    )
}
export default RecordPlot;