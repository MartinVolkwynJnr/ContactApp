import * as types from "./actionTypes";
import * as contactListApi from "../api/contactListApi";
import { beginApiCall, apiCallError } from "../api/apiStatusActions";

export function loadContactSuccess(contacts) {
  return { type: types.LOAD_CONTACTS_SUCCESS, contacts };
}

export function createContactSuccess(contact) {
  return { type: types.CREATE_CONTACT_SUCCESS, contact };
}

export function updateContactSuccess(contact) {
  return { type: types.UPDATE_CONTACT_SUCCESS, contact };
}

export function saveContact(contact) {
  //eslint-disable-next-line no-unused-vars
  return function(dispatch, getState) {
    dispatch(beginApiCall());
    return contactListApi
      .saveContact(contact)
      .then(savedContact => {
        contact.id
          ? dispatch(updateContactSuccess(savedContact))
          : dispatch(createContactSuccess(savedContact));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}
