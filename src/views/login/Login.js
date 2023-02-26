import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Input,
  InputGroup,
  InputGroupText,
  Label,
  Row,
} from "reactstrap";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../../services/auth.service";

const Login = () => {
  const history = useNavigate();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const LoginUser = (e) => {
    e.preventDefault();

    if (email != "" && password != "") {
      AuthService.Login(email, password)
        .then((res) => res.json())
        .then((userObject) => {
          setLoading(false);

          if (userObject.accessToken != undefined) {
            if (userObject.accessToken) {
              localStorage.setItem("user", JSON.stringify(userObject));
            }
            history(`./dashboard`);
          } else {
            const resMessage = userObject && userObject.message;
            setMessage(resMessage);
          }
        });
    } else {
      setLoading(false);
    }
  };
  return (
    <>
      <Col lg="12">
        <Container fluid className="bg-header">
          <Col lg="12" className="text-white p-5"></Col>
          <Col lg="12" className="text-white p-3">
            <Col className="text-center p-2">
              <h4>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp; AgrixTech !
              </h4>
            </Col>
          </Col>
          <Col className="Container">
            <Form onSubmit={LoginUser}>
              <Row>
                <Col xs="5"></Col>
                <Col xs="3">
                  <Card>
                    <Col lg="10" className="p-3 m-4">
                      <InputGroup>
                        <InputGroupText className="bg-white border-end text-black">
                          <Col className="fs-5">
                            <FontAwesomeIcon icon={faEnvelope} />
                          </Col>
                        </InputGroupText>
                        <Input
                          className="border-start-0"
                          placeholder="Username / Email Id"
                          type="email"
                          onChange={(e) => setEmail(e.target.value)}
                          required
                        />
                      </InputGroup>{" "}
                      <br />
                      <InputGroup>
                        <InputGroupText className="bg-white border-end text-black">
                          <Col className="fs-5">
                            <FontAwesomeIcon icon={faLock} />
                          </Col>
                        </InputGroupText>
                        <Input
                          className="border-start-0"
                          placeholder="Password"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                          required
                        />
                      </InputGroup>{" "}
                      <br />
                      <Col className="text-center">
                        <Link to="/dashboard"></Link>
                        <Button type="submit" className="bg-success text-white">
                          Login
                        </Button>
                      </Col>
                      <Col className="astarick">
                        &nbsp;<p style={{ color: "red" }}>{message}</p>
                      </Col>
                    </Col>
                  </Card>
                </Col>
                <Col xs="5"></Col>
              </Row>
            </Form>
          </Col>
          <Col className="p-2">&nbsp;</Col>
        </Container>
      </Col>
    </>
  );
};

export default Login;
