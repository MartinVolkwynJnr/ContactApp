import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Table from "react-bootstrap/Table";

const ContactList = ({ contacts, onDeleteClick }) => (
  <Table striped bordered hover>
    <thead>
      <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>Contact number</th>
        <th>Email</th>
        <th />
      </tr>
    </thead>
    <tbody>
      {contacts.map(contact => {
        return (
          <tr key={contact.id}>
            <td>
              <Link to={"/contact/" + contact.id}>{contact.contactName}</Link>
            </td>
            <td>{contact.surname}</td>
            <td>{contact.cell}</td>
            <td>{contact.email}</td>
            <button
              className="btn btn-outline-danger"
              onClick={() => onDeleteClick(contact)}
            >
              Delete
            </button>
          </tr>
        );
      })}
    </tbody>
  </Table>
);

ContactList.propTypes = {
  contacts: PropTypes.array.isRequired,
  onDeleteClick: PropTypes.func.isRequired
};

export default ContactList;
