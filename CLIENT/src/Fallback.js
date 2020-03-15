import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "./animations/SMILE.json";
import styled from "styled-components";
import { connect } from "react-redux";
import { UNAUTHORIZED } from "./actions";
import { getAllUserSeries } from "./services";

const Container = styled.div`
  display: grid;
  grid-template-areas:
    "header"
    "error"
    "cta"
    "hunts";
  justify-content: center;
  max-width: 400px;
  margin: 1rem auto 0;
  grid-template-columns: 1fr;
  padding: 2rem;
`;

const H1 = styled.div`
  font-size: 2rem;
  margin: 0 0 7px;
  text-decoration: underline;
`;

const Paragraph = styled.div``;

const HuntParagraph = styled(Paragraph)`
  div {
    background: black;
    color: white;
    padding: 0.5rem;
  }
`;

const ErrorMessage = styled.div`
  background: red;
  color: white;
  padding: 11px;
`;

const errorMessage = error => {
  switch (error) {
    case UNAUTHORIZED:
      return "hmm you aren't authorized for whatever you tried to do";
    default:
      return "";
  }
};

const Fallback = ({ clearErrors, email, error, getAllUserSeries, history }) => {
  const [availableSeries, setAvailableSeries] = useState([]);

  useEffect(() => {
    getAllUserSeries().then(setAvailableSeries);
  }, [getAllUserSeries]);

  useEffect(() => {
    document
      .getElementsByTagName("svg")[0]
      .setAttribute("viewBox", "0 -300 1080 1080");
  }, []);

  return (
    <div>
      <div style={{ height: 110 }}>
        <Lottie options={{ loop: true, autoplay: true, animationData }} />
      </div>
      <Container>
        <H1>hi {email.split("@")[0]}!</H1>
        {error && <ErrorMessage>{errorMessage(error)}</ErrorMessage>}
        <HuntParagraph>
          <h3>Here are your available hunts</h3>
          {availableSeries && availableSeries.length > 0 ? (
            availableSeries.map(s => (
              <div
                onClick={() => {
                  clearErrors();
                  history.push(`/map/${s.id}`);
                }}
                key={s.id}
              >
                {s.name}
              </div>
            ))
          ) : (
            <div style={{ background: "red" }}>
              there are no hunts for you :(
            </div>
          )}
        </HuntParagraph>
      </Container>
    </div>
  );
};

const mapStateToProps = ({ device: { email, error } }) => ({ email, error });
const mapDispatchToProps = dispatch => ({
  clearErrors: () => dispatch({ type: "CLEAR_ERRORS" }),
  getAllUserSeries: () => getAllUserSeries(dispatch)
});
export default connect(mapStateToProps, mapDispatchToProps)(Fallback);
