import React from 'react';

import './app.scss';
import { useState } from 'react';
import axios from 'axios'

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';

function App(props) {

  const [state, setState] = useState({ data: null, requestParams: {} });


  const callApi = async (requestParams) => {
    // mock output
    const dataurl = await axios.get(requestParams.url);
    const data = {
      headers: [dataurl.headers], results: [dataurl.data.results],
    };
    setState({ data, requestParams });
  }


  return (
    <React.Fragment>
      <Header />
      <div>Request Method: {state.requestParams.method}</div>
      <div>URL: {state.requestParams.url}</div>
      <Form handleApiCall={callApi} />
      <Results data={state.data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;
