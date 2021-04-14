import React from "react";
import PropTypes from "prop-types";
import TextInput from "../common/TextInput";

const AddNewContactForm = ({
  contact,
  onSave,
  onChange,
  saving = false,
  errors = {}
}) => {
  return (
    <form onSubmit={onSave}>
      <h2>{contact.id ? "Edit" : "Add"} Contact</h2>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      {errors.onUpdate && (
        <div className="alert alert-danger" role="alert">
          {errors.onUpdate}
        </div>
      )}
      <TextInput
        name="contactName"
        label="Firstname"
        value={contact.contactName}
        onChange={onChange}
        error={errors.contactName}
      />

      <TextInput
        name="surname"
        label="Surname"
        value={contact.surname}
        onChange={onChange}
        error={errors.surname}
      />

      <TextInput
        name="cell"
        label="Cell"
        value={contact.cell}
        onChange={onChange}
        error={errors.cell}
      />

      <TextInput
        name="email"
        label="Email"
        value={contact.email}
        onChange={onChange}
        error={errors.email}
      />

      <button type="submit" disabled={saving} className="btn btn-primary">
        {saving
          ? contact.id
            ? "Updating..."
            : "Saving..."
          : contact.id
          ? "Update"
          : "Save"}
      </button>
    </form>
  );
};

AddNewContactForm.propTypes = {
  contact: PropTypes.object.isRequired,
  errors: PropTypes.object,
  onSave: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  saving: PropTypes.bool
};

export default AddNewContactForm;
