import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import "./style.css";
import { Helmet, HelmetProvider } from "react-helmet-async";
import { meta } from "../../content_option";
import { Container, Row, Col, Alert } from "react-bootstrap";
import { contactConfig } from "../../content_option";

export const ContactUs = () => {
  const formRef = useRef();

  const [formData, setFormdata] = useState({
    email: "",
    name: "",
    message: "",
    loading: false,
    show: false,
    alertmessage: "",
    variant: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setFormdata((prev) => ({
      ...prev,
      loading: true,
    }));

    emailjs
      .sendForm(
        contactConfig.YOUR_SERVICE_ID,
        contactConfig.YOUR_TEMPLATE_ID,
        formRef.current,
        contactConfig.YOUR_PUBLIC_KEY,
      )
      .then(
        () => {
          setFormdata({
            email: "",
            name: "",
            message: "",
            loading: false,
            alertmessage: "Message sent successfully ✅",
            variant: "success",
            show: true,
          });

          formRef.current.reset(); // مهم
        },
        (error) => {
          console.log(error);
          setFormdata((prev) => ({
            ...prev,
            loading: false,
            alertmessage: "Failed to send message ❌",
            variant: "danger",
            show: true,
          }));
        },
      );
  };

  return (
    <HelmetProvider>
      <Container>
        <Helmet>
          <title>{meta.title} | Contact</title>
        </Helmet>

        <Row className="mb-5 mt-3 pt-md-3">
          <Col lg="8">
            <h1 className="display-4 mb-4">Contact Me</h1>
            <hr className="t_border my-4 ml-0 text-left" />
          </Col>
        </Row>

        <Row className="sec_sp">
          <Col lg="12">
            <Alert
              variant={formData.variant}
              className={`rounded-0 co_alert ${
                formData.show ? "d-block" : "d-none"
              }`}
              dismissible
              onClose={() => setFormdata((prev) => ({ ...prev, show: false }))}
            >
              <p className="my-0">{formData.alertmessage}</p>
            </Alert>
          </Col>

          <Col lg="5" className="mb-5">
            <h3 className="color_sec py-4">Get in touch</h3>
            <address>
              <strong>Email:</strong>{" "}
              <a href={`mailto:${contactConfig.YOUR_EMAIL}`}>
                {contactConfig.YOUR_EMAIL}
              </a>
            </address>
            <p>{contactConfig.description}</p>
          </Col>

          <Col lg="7" className="d-flex align-items-center">
            {/* 👇 مهم جدًا: ref هنا */}
            <form
              ref={formRef}
              onSubmit={handleSubmit}
              className="contact__form w-100"
            >
              <Row>
                <Col lg="6">
                  <input
                    className="form-control"
                    name="from_name" // ✅ مهم
                    placeholder="Name"
                    type="text"
                    required
                  />
                </Col>

                <Col lg="6">
                  <input
                    className="form-control"
                    name="reply_to" // ✅ مهم
                    placeholder="Email"
                    type="email"
                    required
                  />
                </Col>
              </Row>

              <textarea
                className="form-control mt-3"
                name="message" // ✅ مهم
                placeholder="Message"
                rows="5"
                required
              ></textarea>

              <br />

              <button className="btn ac_btn w-100" type="submit">
                {formData.loading ? "Sending..." : "Send"}
              </button>
            </form>
          </Col>
        </Row>
      </Container>

      <div className={formData.loading ? "loading-bar" : "d-none"}></div>
    </HelmetProvider>
  );
};
