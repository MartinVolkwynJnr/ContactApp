import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { saveContact } from "../../actions/addcontactActions";
import PropTypes from "prop-types";
import AddNewContactForm from "./AddNewContactForm";
import { newContact } from "../addcontact/newContactModel";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

export function ManageContactPage({
  contacts,
  loadContacts,
  saveContact,
  history,
  ...props
}) {
  const [contact, setContact] = useState({ ...props.contact });
  const [errors, setErrors] = useState({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contacts.length === 0) {
      loadContacts().catch(error => {
        alert("Loading contacts failed" + error);
      });
    } else {
      setContact({ ...props.contact }); // if contacts is available then setState to ...props.contact
    }
  }, [props.contact]);

  function handleChange(event) {
    const { name, value } = event.target;
    setContact(prevContact => ({
      ...prevContact,
      [name]: name === "id" ? parseInt(value, 10) : value
    }));
  }

  function formIsValid() {
    const { contactName, surname, cell, email } = contact;
    const errors = {};

    if (!contactName) errors.contactName = "Name is required.";
    if (!surname) errors.surname = "Surname is required.";
    if (!cell) errors.cell = "Cell is required.";
    if (!email) errors.email = "Email is required.";
    // debugger;
    setErrors(errors);
    //Form is valid if the errors object still has no properties...
    return Object.keys(errors).length === 0;
  }

  function handleSave(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    setSaving(true);
    saveContact(contact)
      .then(() => {
        toast.success("Contact Saved");
        history.push("/contacts");
      })
      .catch(error => {
        setSaving(false);
        setErrors({ onSave: error.message });
      });
  }

  return contacts.length === 0 ? ( // adds a spinner untill the data is available to display the data
    <Spinner />
  ) : (
    <AddNewContactForm
      contact={contact}
      errors={errors}
      onChange={handleChange}
      onSave={handleSave}
      saving={saving}
    />
  );
}

ManageContactPage.propTypes = {
  contact: PropTypes.object.isRequired,
  contacts: PropTypes.array.isRequired,
  loadContacts: PropTypes.func.isRequired,
  saveContact: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired
};

export function getContactById(contacts, id) {
  return contacts.find(contact => contact.id === id) || null;
}

function mapStateToProps(state, ownProps) {
  const id = ownProps.match.params.id;
  const contact =
    id && state.contacts.length > 0
      ? getContactById(state.contacts, id)
      : newContact;
  return {
    contact,
    contacts: state.contacts
  };
}

const mapDispatchToProps = {
  saveContact
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ManageContactPage);
