import React from "react";
import { Card, Col, Container, Row } from "reactstrap";
import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CropType from "./CropType";
import Implement from "./Implement";

const Settings = () => {
  return (
    <>
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
                      <Col>
                        <Card className="p-4 rounded-0">
                          <Col>
                            <Col>
                              <Row>
                                <Tabs
                                  defaultActiveKey="home"
                                  id="fill-tab-example"
                                  className="mb-3"
                                  fill
                                >
                                  <Tab eventKey="home" title="CropType/Variety">
                                    <CropType />
                                  </Tab>
                                  <Tab eventKey="" title="Implement">
                                    <Implement />
                                  </Tab>
                                  <Tab
                                    eventKey=""
                                    title="Other Crud Operation"
                                  ></Tab>
                                </Tabs>
                              </Row>
                            </Col>
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

export default Settings;
