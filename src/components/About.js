import React from 'react';

import Nirmit from '../images/Nirmit.jpg';
import Harsh from '../images/Harsh.jpg';
import Preksha from '../images/Preksha.jfif';
import Archan from '../images/Archan.jfif';


function About() {
  return (
    <div>
      <div className="container-fluid w-70 mt-2">
        <div className="d-flex row col-12">
          <div className="col-12">
            <h3 className="mx-auto text-lg-center w-75 text-info">
              Designed and Developed by: 
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
            <img src={Harsh} alt="Developer Harsh" className="rounded-circle"  width="100" height="100" />  
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/keval-shah-67b74616b/" rel="external" className="text-success">Harsh Patel</a> <br></br>
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
              <img src={Nirmit} alt="Developer Nirmit" className="rounded-circle"  width="100" height="100" /> 
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/nirmit-patel-7b1562196/" rel="external" className="text-success">Nirmit Patel</a> <br></br>
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
              <img src={Preksha} alt="Developer Preksha" className="rounded-circle"  width="100" height="100" />  
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/prekshapatel18/" rel="external" className="text-success">Preksha Patel</a> <br></br>
            </h3>
          </div>
        </div>

        <div className="row col-12">
          <div className="col-6">
            <h3 className="text-lg-right">
              <img src={Archan} alt="Developer Archan Shah" className="rounded-circle"  width="100" height="100" />  
            </h3>
          </div>
          <div className="col-6">
            <h3 className="text-lg-left text-info mt-4">
              <a href="https://www.linkedin.com/in/archanshahh/" rel="external" className="text-success">Archan Shah</a> <br></br>
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;