import * as types from "./actionTypes";
import * as contactListApi from "../api/contactListApi";
import { beginApiCall, apiCallError } from "../api/apiStatusActions";

export function loadContactSuccess(contacts) {
  return { type: types.LOAD_CONTACTS_SUCCESS, contacts };
}

export function deleteContactOptimistic(contact) {
  return { type: types.DELETE_CONTACT_OPTIMISTIC, contact };
}

export function loadContacts() {
  return function(dispatch) {
    dispatch(beginApiCall());
    return contactListApi
      .getContacts()
      .then(contacts => {
        dispatch(loadContactSuccess(contacts));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function deleteContact(contact) {
  return function(dispatch) {
    // Doing Optimistic delete, so dnot dispatching begin/end api call
    // actions, or apiCallError action since we're not showing the loading status for this
    dispatch(deleteContactOptimistic(contact));
    return contactListApi.deleteContact(contact);
  };
}
