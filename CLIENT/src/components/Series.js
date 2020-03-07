import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button } from "../styles/styles";
import { sendSeries, getAllSeries } from "../services";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  margin-top: 5rem;
  font-size: 5rem;

  input {
    text-align: center;
    height: 2rem;
    width: 17rem;
    margin: 1rem auto;
    display: block;
  }
  input:last-child {
    margin-bottom: 1rem;
  }
`;

const Select = styled.select`
  margin: 2rem;
  width: 200px;
  height: 47px;
  font-size: 18px;
`;

const Series = ({ setScene, setSelectedSeries }) => {
  const [values, setValues] = useState({ name: "", cat: "", description: "" });
  const [toggle, setToggle] = useState(false);
  const vals = useRef({ name: "", cat: "", description: "" });
  const [loading, setLoading] = useState(false);
  const [series, setSeries] = useState([]);
  const [optionValue, setOptionValue] = useState();

  const getSeries = async () => {
    const allSeries = await getAllSeries();
    setSeries(allSeries);
    try {
      setOptionValue(allSeries[0].id);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (loading === true) return;
    setLoading(true);
    getSeries();
  }, [loading]);

  useEffect(() => {
    vals.current = values;
  }, [values]);

  useEffect(() => {
    window.addEventListener("keydown", e => {
      if (e.keyCode === 13) {
        submit();
      }
    });
  }, []);

  const handleChange = e =>
    setValues({ ...values, [e.target.name]: e.target.value });

  const submit = async () => {
    const keys = Object.keys(vals.current);
    for (let i = 0; i < keys.length; i++) {
      if (vals.current[keys[i]] === "") {
        return;
      }
    }
    await sendSeries(vals.current);
    setLoading(false);
  };
  return (
    <Container>
      <div>Series</div>
      <div
        style={{ fontSize: "2rem", color: "red" }}
        onClick={() => setToggle(!toggle)}
      >
        switch
      </div>
      {toggle && (
        <div>
          <form>
            <input onChange={handleChange} name="name" placeholder="name" />
            <input onChange={handleChange} name="cat" placeholder="cat" />
            <input
              onChange={handleChange}
              name="description"
              placeholder="description"
            />
          </form>
          <Button style={{ margin: "auto", display: "block" }} onClick={submit}>
            SEND
          </Button>
        </div>
      )}

      <Select
        value={optionValue}
        onChange={e => setOptionValue(e.target.value)}
      >
        {series.map(s => {
          return (
            <option key={s.name} name={s.name} value={s.id}>
              {s.name}
            </option>
          );
        })}
      </Select>
      <Button
        style={{ margin: "auto", display: "block" }}
        onClick={() => {
          setScene("MAP");
          setSelectedSeries(optionValue);
        }}
      >
        Select
      </Button>
    </Container>
  );
};
export default Series;
