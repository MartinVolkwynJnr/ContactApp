import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => (
  <div className="jumbotron">
    <h1>Home</h1>
    <Link to="contacts" className="btn btn-primary btn-lg">
      See list
    </Link>
  </div>
);

export default HomePage;
