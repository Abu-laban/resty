import React from "react";
import "./form.scss";
import { useState } from 'react';


function Form(props) {

  const [method, setMethod] = useState('get');
  const [url, setUrl] = useState('https://pokeapi.co/api/v2/pokemon');
  const [showText, setShowText] = useState(false);
  const [request, setrequest] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      method: method,
      url: url
    };
    props.handleApiCall(formData, request);
  };

  const urlSetState = (e) => {
    setUrl(e.target.value);
  }

  const methodSetState = (e) => {
    setShowText(false);
    setMethod(e.target.id);
  }

  const textSetState = (e) => {
    setShowText(true);
    setMethod(e.target.id);
  }

  const requestSetState = (e) => {
    setrequest(e.target.value);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <span>URL: </span>
          <input name="url" type="text" onChange={urlSetState} />
          <button type="submit">GO!</button>
        </label>
        <label className="methods">
          <span id="get" onClick={methodSetState}>GET</span>
          <span id="post" onClick={textSetState}>POST</span>
          <span id="put" onClick={textSetState}>PUT</span>
          <span id="delete" onClick={methodSetState}>DELETE</span>
        </label>
      </form>
      {showText && <textarea rows="7" cols="12" onChange={requestSetState} />}
    </>
  );
}

export default Form;
