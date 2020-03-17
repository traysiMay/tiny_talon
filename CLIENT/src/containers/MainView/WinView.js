import React, { useEffect, useState } from "react";
import Lottie from "react-lottie";
import animationData from "../../animations/SMILE.json";
import yay from "../../animations/YAY.json";
import styled from "styled-components";
import { connect } from "react-redux";
import { getPlace } from "../../services";
import Smiler from "../../graphics/Smiler";
import Loading from "../../animations/Loading";

const H1 = styled.h1`
  text-align: center;
  font-size: 4rem;
`;

const Paragraph = styled.div`
  margin: 17px 10%;
  font-size: 2rem;
  text-align: center;
`;

const WinView = ({ hunt, name, reset }) => {
  const [place, setPlace] = useState();
  useEffect(() => {
    if (!place) {
      getPlace(hunt).then(place => setTimeout(() => setPlace(place), 1000));
    } else {
      document
        .getElementsByTagName("svg")[0]
        .setAttribute("viewBox", "0 -200 1080 1080");
    }
  }, [place]);

  useEffect(() => {
    return () => reset();
  }, [reset]);
  if (!place) return <Loading message="checking your place..." />;
  return (
    <div>
      <div style={{ height: 200 }}>
        <Lottie options={{ loop: true, autoplay: true, animationData }} />
      </div>
      <div style={{ margin: "20px 0" }}>
        <Lottie options={{ loop: true, autoplay: true, animationData: yay }} />
      </div>
      <Paragraph>You finished</Paragraph>
      <Paragraph>
        {place.place.place} out of {place.place.outof}
      </Paragraph>
      <Paragraph>on</Paragraph>
      <div
        style={{ textAlign: "center", margin: "1rem 0 4rem", fontSize: "4rem" }}
      >
        {name}
      </div>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  reset: () => dispatch({ type: "RESET" })
});
export default connect(null, mapDispatchToProps)(WinView);
