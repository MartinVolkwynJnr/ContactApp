import React from "react";
import { connect } from "react-redux";
import * as contactsActions from "../../actions/contactsActions";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import ContactList from "./ContactList";
import { Redirect } from "react-router-dom";
import Spinner from "../common/Spinner";
import { toast } from "react-toastify";

class ContactListPage extends React.Component {
  state = {
    headers: { "Access-Control-Allow-Origin": "*" },
    redirectToAddContactPage: false
  };

  componentDidMount() {
    const { actions } = this.props;
    actions.loadContacts().catch(error => {
      alert("loading contacts failed" + error);
    });

    // if (contacts.length === 0) {
    //   actions.loadContacts().catch(error => {
    //     alert("loading contacts failed" + error);
    //   });
    // }
  }

  handleDeleteContact = async contact => {
    toast.success("contact deleted");
    try {
      await this.props.actions.deleteContact(contact);
    } catch (error) {
      toast.error("Delete failed. " + error.message, { autoClose: false });
    }
  };

  render() {
    return (
      <>
        {this.state.redirectToAddContactPage && <Redirect to="/contact" />}
        <h2>Contacts</h2>
        {this.props.loading ? (
          <Spinner />
        ) : (
          // below <> </> "FRAGMENTS" are preferable over divs since fragments avoid creating needless elements in the DOM... JSX needs a parent wrapper to display
          <>
            <button
              style={{ marginBottom: 20 }}
              className="btn btn-primary add-contact"
              onClick={() => this.setState({ redirectToAddContactPage: true })}
            >
              Add Contact
            </button>

            <ContactList
              onDeleteClick={this.handleDeleteContact}
              contacts={this.props.contacts}
            />
          </>
        )}
      </>
    );
  }
}
ContactListPage.propTypes = {
  contacts: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    contacts:
      state.contacts.length === 0
        ? []
        : state.contacts.map(contact => {
            // debugger;
            return {
              ...contact,
              id: state.contacts.find(a => a.id === contact.id).id
            };
          }),
    loading: state.apiCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadContacts: bindActionCreators(contactsActions.loadContacts, dispatch),
      deleteContact: bindActionCreators(contactsActions.deleteContact, dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactListPage);
