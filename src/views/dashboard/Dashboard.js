import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col } from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import authHeader from "../../services/auth-header";

const BingMap = () => {
  var infobox, pushpinClicked, clusterLayer;

  const BaseAPI = process.env.REACT_APP_SERVER_URL;
  const [plot, setPlot] = useState([]);
  const [cluster, setCluster] = useState([]);

  //function for fetching bing map credential
  var map = new window.Microsoft.Maps.Map("#myMap", {
    credentials:
      "Aqzz7vJy_E3lMdTdyc3Wq5648lftCQIpLcnUYANnul7xMFefdRqtdzneBwfdFpWX",
    center: new window.Microsoft.Maps.Location(20.5937, 78.9629),
    zoom: 5,
  });
  var center = map.getCenter();

  //Adding shapes to pushpin
  var latLongCordinates = cluster;
  for (var i = 0; i < latLongCordinates.length; i++) {
    var lat = parseFloat(latLongCordinates[i].latitude);
    var long = parseFloat(latLongCordinates[i].longitude);

    var pin = new window.Microsoft.Maps.Pushpin(
      new window.Microsoft.Maps.Location(lat, long),
      {
        title: "ClusterId :" + latLongCordinates[i].clusterId,
        subTitle: "Village" + latLongCordinates[i].village,
        text: "",
        color: "green",
      }
    );

    //adding infobox with pushpin.
    pin.metadata = {
      title: latLongCordinates[i].clusterId,
      description: latLongCordinates[i].manager + "  is Manager",
    };

    //add a click event handler to the pushpin.
    window.Microsoft.Maps.Events.addHandler(pin, "click", pushpinClicked);

    //add pushpin to the map.
    map.entities.push(pin);
  }

  //adding center location
  var agrixLocation = new window.Microsoft.Maps.Location(23.2599, 77.4126);
  var pin = new window.Microsoft.Maps.Pushpin(agrixLocation, {
    text: "AGRIX ",
    color: "green",
  });

  //add the pushpin to the map
  map.entities.push(pin);

  //create an infobox at the center of the map but don't show it.
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
      description: "Area :" + latlongs[i].areaOfPlot + "acre",
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

  //function to set plot data to map
  useEffect(() => {
    fetch(`${BaseAPI}/api/plot/`, {
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
          });
        }
        setPlot(templot);
      });
    });
  }, []);

  //function to set cluster data to map
  useEffect(() => {
    fetch(`${BaseAPI}/api/cluster/`, {
      method: "GET",
      headers: authHeader(),
    }).then((data) => {
      data.json().then((data) => {
        var tempcluster = [];
        for (var i of data) {
          tempcluster.push({
            latitude: i.latitude,
            longitude: i.longitude,
            clusterId: i.clusterCode,
            clusterName: i.clusterName,
            village: i.village,
            manager: i.clusterManager,
          });
        }
        setCluster(tempcluster);
      });
    });
  }, []);

  //load the Clustering module.
  window.Microsoft.Maps.loadModule("Microsoft.Maps.Clustering", function () {
    var latlongs = plot;
    for (var i = 0; i < latlongs.length; i++) {
      console.log("MyTotalPlot", latlongs.length);
      var pins = new window.Microsoft.Maps.Pushpin(
        latlongs[i],
        {
          text: "",
          color: "red",
        },
        map.getBounds()
      );
    }

    //create a ClusterLayer and add it to the map.
    clusterLayer = new window.Microsoft.Maps.ClusterLayer(pins);
    map.layers.insert(clusterLayer);
  });

  return (
    <>
      {" "}
      <Col lg="12">
        <Container fluid lg="12">
          <Col lg="12">
            <Row>
              {/* Sidebar */}
              <Col className="start-end  bg-white" lg="2">
                <Sidebar />
              </Col>

              {/* Header */}
              <Col className="end-start" lg="10">
                <Header />

                {/* Body */}
                <Col>
                  <Col>
                    <Row>
                      <Col xs="12">
                        <Card className="rounded-0 p-0">
                          <Col className="m-2">
                            <Row>
                              <Col className="vh-100 ">
                                <div id="myMap" width="100%"></div>
                              </Col>
                            </Row>
                          </Col>
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                </Col>
              </Col>
            </Row>
          </Col>
        </Container>
      </Col>
    </>
  );
};

export default BingMap;
