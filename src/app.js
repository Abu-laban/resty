import React from 'react';

import './app.scss';
import { useState, useEffect, useReducer } from 'react';
import axios from 'axios'

import historyReducer, { addHistory, emptyHistory } from './components/reducer/reducer';
import History from './components/history/history';

// Let's talk about using index.js and some other name in the component folder
// There's pros and cons for each way of doing this ...
import Header from './components/header';
import Footer from './components/footer';
import Form from './components/form';
import Results from './components/results';


const initialState = {
  history: []
}

function App(props) {

  const [requestParams, setRequestParams] = useState({});
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [state, dispatch] = useReducer(historyReducer, initialState)

  const callApi = async (requestParams) => {
    // mock output
    let url = requestParams.url;
    let method = requestParams.method;
    let body = requestParams.body;
    let results = requestParams.results

    console.log('requestParams', requestParams);
    console.log('requestParams.url', requestParams.url);
    console.log('requestParams.method', requestParams.method);
    console.log('requestParams.body', requestParams.body);

    if (method == 'get' || method == 'delete') {
      await axios[method](url).then(result => {
        setData([result.data]);
        console.log('data.data', result.data);
        dispatch(addHistory(requestParams, result.data));
        setLoading(true);
      })
    } else {
      await axios[method](url, body).then(result => {
        setData([...data, result.data]);
        console.log('data.data', result.data);
        dispatch(addHistory(requestParams, result.data));
        setLoading(true);
      })
    }
    console.log('data', data);

  }

  // This will run on every re-render of this component
  useEffect(() => {
    console.log("%c I RUN ON EVERY RE-RENDER", 'background:#ccc; color:red');
  });

  useEffect(() => {
    console.log('%c I RUN WHEN SENDING THE REQUEST:', 'background:#000; color:purple', requestParams.url);
  }, [requestParams.url]);

  useEffect(() => {
    console.log('%c I RUN WHEN HAVE THE RESULT:', 'background:blue; color:white', data);
  }, [data]);

  useEffect(() => {
    console.log('%c I RUN WHEN HAVE THE HISTORY:', 'background:purple; color:white', history);
  }, [history]);

  // run once on initial rendering 
  // can be a good case to do a GET request form an API
  useEffect(() => {
    console.log('%c Initial loading :', 'background:green; color:white', requestParams);
  }, []);

  //UNMOUNT
  useEffect(() => {
    return (() => {
      console.log("%c Component unmounted !!", "background:yellow; color:black")
    })
  });


  return (
    <React.Fragment>
      <Header />
      {/* <div>Request Method: {requestParams.method}</div> */}
      {/* <div>URL: {requestParams.url}</div> */}
      {state.history.length ? <History history={state.history} /> : null}
      <Form handleApiCall={callApi} />
      <Results data={data} />
      <Footer />
    </React.Fragment>
  );

}

export default App;
