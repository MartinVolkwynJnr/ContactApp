import React from "react";
import { Route, Switch } from "react-router-dom";
import HomePage from "./home/HomePage";
import ContactListPage from "./contacts/ContactListPage";
import AddNewContactPage from "./addcontact/ManageContactPage";
import Header from "./common/Header";
import PageNotFound from "./PageNotFound";

function App() {
  return (
    <div className="container-fluid">
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/contacts" component={ContactListPage} />
        <Route exact path="/contact/:id" component={AddNewContactPage} />
        <Route exact path="/contact" component={AddNewContactPage} />
        <Route component={PageNotFound} />
      </Switch>
    </div>
  );
}

export default App;
