import React from "react";

const Scan = ({ match }) => {
  const myRe = new RegExp(process.env.REACT_APP_REG);
  const meepo = myRe.exec(match.params.code);
  console.log({ code: match.params.code });
  fetch(process.env.REACT_APP_SERVER, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ code: match.params.code })
  });
  return <div>{meepo ? <div>Scan</div> : <div>nomeepo</div>}</div>;
};

export default Scan;
