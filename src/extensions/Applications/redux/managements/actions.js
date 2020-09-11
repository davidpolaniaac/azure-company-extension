import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import managementServices from '../../service/documents';
import { MANAGEMENTS, MANAGEMENT } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';
import { actionCreators as dialogActions } from '../dialog/actions';
import { normalizeValue } from '../../schema/document';

const completedTypes = completeTypes(['ADD_INFO', 'GET_INFO', 'DELETE_INFO', 'UPDATE_INFO'], ['SET_INFO']);

export const actions = createTypes(completedTypes, '@@MANAGEMENT');

export const actionCreators = {
  createManagement: ( collection, values) => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: managementServices.createDocument,
    payload: normalizeValue(collection, values),
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements(collection));
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  getManagements: (value) => ({
    type: actions.GET_INFO,
    target: MANAGEMENTS,
    service: managementServices.getDocuments,
    payload: value,
    failureSelector: response => response.code,
    successSelector: response => response.data,
    injections: [
      withPostFailure((dispatch, response) => {
        console.log('ERROR GET MANAGEMENTS :', response);
      }),
    ],
  }),
  deleteManagement: (collection, values) => ({
    type: actions.DELETE_INFO,
    target: DELETE_TARGET,
    service: managementServices.deleteDocument,
    payload: normalizeValue(collection, values),
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements(collection));
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  updateManagement: (collection, values) => ({
    type: actions.UPDATE_INFO,
    target: UPDATE_TARGET,
    service: managementServices.updateDocument,
    payload: normalizeValue(collection, values),
    injections: [
      withPostSuccess(async (dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(dialogActions.dismissDialog());
        dispatch(actionCreators.getManagements(collection));
      }),
      withPostFailure((dispatch, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  setManagement: values => (dispatch) => {
    dispatch({
      type: actions.SET_INFO,
      target: MANAGEMENT,
      payload: values,
    });
  },
};
