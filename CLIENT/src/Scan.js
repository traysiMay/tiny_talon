import React from "react";

const Scan = ({ match }) => {
  const myRe = new RegExp(process.env.REACT_APP_REG);
  const meepo = myRe.exec(match.params.code);
  //   console.log({ code: match.params.code });
  //   console.log(localStorage.getItem("token"));
  //   fetch(process.env.REACT_APP_SERVER, {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Authorization: `Bearer ${localStorage.getItem("token")}`
  //     },
  //     body: JSON.stringify({ code: match.params.code })
  //   })
  //     .then(response => response.json())
  //     .then(data => {
  //       localStorage.setItem("token", data.token);
  //     });
  return <div>{meepo ? <div>Scan</div> : <div>nomeepo</div>}</div>;
};

export default Scan;
