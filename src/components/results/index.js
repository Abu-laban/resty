import React from "react";
import Loading from "../loading/loading";
import JSONPretty from 'react-json-pretty';
import 'react-json-pretty/themes/monikai.css';


function Results(props) {
  return (
    <section>
      <pre>{props.data ? <JSONPretty data={props.data} /> : <Loading />}</pre>
    </section>
  );
}

export default Results;
