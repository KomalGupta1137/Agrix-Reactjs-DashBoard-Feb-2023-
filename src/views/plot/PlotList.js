import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import authHeader from "../../services/auth-header";
import { Card, Col, Row, Table } from "react-bootstrap";
import { CardBody, Input } from "reactstrap";
import ReactPaginate from "react-paginate";
import PlotEdit from "./PlotEdit";
import PlotView from "./PlotView";
import { text } from "@fortawesome/fontawesome-svg-core";

const BingMap = () => {
  var infobox, pushpinClicked;
  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const { farmerId } = useParams();
  const [farmerPlotList, setFarmerPlotList] = useState([]);
  const [farmer, setFarmer] = useState([]);
  const [pageCount, setpageCount] = useState(0);
  const [plotCount, setPlotCount] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [query, setQuery] = useState("");
  const [plot, setPlot] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dateList, setDateList] = useState([]);
  const [plotArea, setPlotArea] = useState([]);
  const toggle = () => setDropdownOpen((prevState) => !prevState);

  //bing map credential
  var map = new window.Microsoft.Maps.Map("#myMap", {
    credentials:
      "Aqzz7vJy_E3lMdTdyc3Wq5648lftCQIpLcnUYANnul7xMFefdRqtdzneBwfdFpWX",
    center: new window.Microsoft.Maps.Location(24.661994, 77.58655),
    zoom: 5,
  });
  var center = map.getCenter();

  //adding center location
  var pin = new window.Microsoft.Maps.Pushpin(center, {
    text: "AGRIX ",
    color: "green",
  });

  //add the pushpin to the map
  map.entities.push(pin);

  //create an infobox at the center of the map
  infobox = new window.Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false,
  });

  //assign the infobox to a map instance.
  infobox.setMap(map);

  //create  pushpin for plot
  var latlongs = plot;
  for (var i = 0; i < latlongs.length; i++) {
    var pin = new window.Microsoft.Maps.Pushpin(latlongs[i], {
      text: "",
      color: "red",
    });

    //store some metadata with the pushpin.
    pin.metadata = {
      title: latlongs[i].plotId,
      description: "Area:" + latlongs[i].areaOfPlot + "acre",
    };

    //add a click event handler to the pushpin.
    window.Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

    //add pushpin to the map.
    map.entities.push(pin);
  }

  //set the infobox options with the metadata of the pushpin.
  function pushpinClicked(e) {
    if (e.target.metadata) {
      infobox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true,
      });
    }
  }

  //set plot data for pushpin
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var templot = [];
        for (var i of data) {
          templot.push({
            latitude: i.latitude,
            longitude: i.long,
            clusterId: i.clusterId,
            plotId: i.plotId,
            areaOfPlot: i.areaOfPlot,
            village: i.village,
            perimeter: i.perimeterOfPlot,
            cultivationDate: i.cultivationDate,
          });
        }
        setPlot(templot);
      });
    });
  }, []);

  //pie Chart Data
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var pieChartData = [];
        for (var i of data) {
          pieChartData.push({
            name: i.plotId,
            value: i.areaOfPlot,
          });
        }
        setPieChartData(pieChartData);
      });
    });
  }, []);

  //farmer name by farmerId
  useEffect(() => {
    fetch(`${BaseAPI}/api/farmer/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((farmer) => {
      farmer.json().then((data) => {
        setFarmer(data);
      });
    });
  }, []);

  //plot count against each farmerId
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/plotcount/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((plot) => {
        setPlotCount(plot.plotCount);
        setpageCount(plot.plotCount);
      });
    });
  }, []);

  let size = 3;

  //page 1 data
  useEffect(() => {
    const getComments = async () => {
      const res = await fetch(
        `${BaseAPI}/api/plot/page/${farmerId}/?page=1&size=${size}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerPlotList(data.plot);
    };
    getComments();
  }, [size]);

  //plot count update
  const plotCountUpdate = () => {
    fetch(`${BaseAPI}/api/plot/plotcount/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((plot) => {
        setPlotCount(plot.plotCount);
        setpageCount(plot.plotCount);
      });
    });
  };

  //plots for current page
  const FetchPlot = (currentPage) => {
    fetch(
      `${BaseAPI}/api/plot/page/${farmerId}/?page=${currentPage}&size=${size}`,
      {
        method: "GET",
        headers: authHeader(),
      }
    ).then((plot) => {
      plot.json().then((datalist) => {
        if (datalist.plot.length == 0 && currentPage > 1) {
          FetchPlot(currentPage - 1);
          return;
        }
        setFarmerPlotList(datalist.plot);
        console.log(datalist.plot)
        // console.log("googleEarthLink" ,datalist.plot.googleEarthLink.trim());
      });
    });
  };
  const handleUpdate = () => {
    FetchPlot(currentPage);
  };

  //function for handling page click
  const handlePageClick = (data) => {
    console.log(data.selected);
    let currentPage = data.selected + 1;
    const value = FetchPlot(currentPage);
    setCurrentPage(currentPage);
  };

  const nPages = Math.ceil(pageCount / size);

  //set plot area data for pie chart
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/${farmerId}`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var plotArea = [];
        for (var i of data) {
          plotArea.push(i.areaOfPlot);
        }
        setPlotArea(plotArea);
      });
    });
  }, []);

  //sum of plot area
  let total = 0;
  plotArea.forEach((i) => {
    total += parseFloat(i);
  });
  let finalArea = total.toFixed(2);

  //function for search filter by plotId
  if (query.length >= 3) {
    var filterBySearch = async (funcquery) => {
      const res = await fetch(
        `${BaseAPI}/api/plot/plotSearch/data?plotId=${funcquery}`,
        {
          method: "GET",
          headers: authHeader(),
        }
      );
      const data = await res.json();
      setFarmerPlotList(data);
    };
  }

  useEffect(() => {
    if (query.trim().length === 0) {
      FetchPlot(currentPage);
    }
  }, [query]);

  return (
    <>
      <Col className="section">
        <Col className="container-fluid">
          <Col>
            <Col sm="12 ">
              <Row className="g-2 form ">
                <Col sm="4 " className="vh-100 ">
                  <Card className="  bg-transparent border-0 ">
                    <CardBody className=" border-0 bg-transparent ">
                      <Col sm="12">
                        <Row className="g-2 form ">
                          <Col sm="12" className="p-5 shadow">
                            <h1>Total Plot</h1>
                            <span className="h1 font-weight-bold mb-0">
                              {plotCount}
                            </span>
                          </Col>
                          <Col className="p-1">&nbsp;</Col>
                          <Col sm="12" className="shadow p-5">
                            <h1>Total Area</h1>
                            <span className="h1 font-weight-bold mb-0">
                              {finalArea} acre
                            </span>
                          </Col>
                          <Col sm="8">
                            <Row>
                              <Col sm="12" className="p-3">
                                <h3>
                                  {farmer.firstName} {farmer.lastName}'s plot
                                  lists{" "}
                                </h3>
                              </Col>
                              <Col sm="8" className="">
                                {" "}
                                <Input
                                  id="example-text-input"
                                  placeholder="Enter at least 3 character to search"
                                  type="text"
                                  className="col-sm-8"
                                  value={query}
                                  onChange={(e) => {
                                    setQuery(e.target.value);
                                    filterBySearch(e.target.value);
                                  }}
                                />
                              </Col>
                            </Row>
                          </Col>
                          <Col sm="12" className="p-2 ">
                            <Table id="table-to-xls" responsive bordered>
                              <thead className="thead-light">
                                <tr>
                                  <th>Plot Id</th>
                                  <th>Latitude</th>
                                  <th>Longitude</th>
                                  <th>Shape</th>
                                  <th>Action</th>
                                </tr>
                              </thead>
                              {farmerPlotList.map((item, index) => (
                                <tbody>
                                  <tr>
                                    <td>{item.plotId}</td>
                                    <td>{item.latitude}</td>
                                    <td>{item.long}</td>
                                    <td>
                                     <a href={item.googleEarthLink.trim()} target="_blank">Shape</a>
                                    </td>

                                    <td>
                                      <PlotView
                                        props={item}
                                        handleUpdate={handleUpdate}
                                        plotCountUpdate={plotCountUpdate}
                                      />
                                      <PlotEdit
                                        props={item}
                                        handleUpdate={handleUpdate}
                                      />
                                    </td>
                                  </tr>
                                </tbody>
                              ))}
                            </Table>

                            <ReactPaginate
                              previousLabel={"< previous"}
                              nextLabel={"next >"}
                              breakLabel={"..."}
                              pageCount={nPages}
                              marginPagesDisplayed={2}
                              pageRangeDisplayed={3}
                              onPageChange={handlePageClick}
                              containerClassName={
                                "pagination justify-content-center"
                              }
                              pageClassName={"page-item"}
                              pageLinkClassName={"page-link"}
                              previousClassName={"page-item"}
                              previousLinkClassName={"page-link"}
                              nextClassName={"page-item"}
                              nextLinkClassName={"page-link"}
                              breakClassName={"page-item"}
                              breakLinkClassName={"page-link"}
                              activeClassName={"active"}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </CardBody>
                  </Card>
                </Col>
                <Col sm="8" className="mt-4">
                  <Row className="g-2 form">
                    <Col sm="12" className="vh-100">
                      <div id="myMap"></div>
                    </Col>
                  </Row>
                  {/* <Col sm="12" className="p-1">&nbsp;</Col> */}
                </Col>
              </Row>
            </Col>
          </Col>
        </Col>
      </Col>
    </>
  );
};

export default BingMap;
