import { completeTypes, createTypes, withPostSuccess, withPostFailure } from 'redux-recompose';
import { SubmissionError, reset } from 'redux-form';
import FORM_NAMES from '../../constants/formNames';
import componentServices from '../../service/documents';
import { COMPONENTS } from './constants';
import { CREATE_TARGET, DELETE_TARGET, UPDATE_TARGET } from '../constants';
import { actionCreators as dialogActions } from '../dialog/actions';
import { normalizeValue } from '../../schema/document';

const completedTypes = completeTypes(['ADD_INFO', 'GET_INFO', 'DELETE_INFO', 'UPDATE_INFO'], ['SET_INFO']);

export const actions = createTypes(completedTypes, '@@COMPONENT');

export const actionCreators = {
  createComponent: (collection, values) => ({
    type: actions.ADD_INFO,
    target: CREATE_TARGET,
    service: componentServices.createDocument,
    payload: normalizeValue(collection, values),
    injections: [
      withPostSuccess((dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(actionCreators.getComponents(collection));
        dispatch(dialogActions.dismissDialog());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  getComponents: value => ({
    type: actions.GET_INFO,
    target: COMPONENTS,
    service: componentServices.getDocuments,
    payload: value,
    failureSelector: response => response.code,
    successSelector: response => response.data,
    injections: [
      withPostFailure((_, response) => {
        console.log('ERROR GET COMPONENTS :', response);
      }),
    ],
  }),
  deleteComponent: (collection, values) => ({
    type: actions.DELETE_INFO,
    target: DELETE_TARGET,
    service: componentServices.deleteDocument,
    payload: normalizeValue(collection, values),
    injections: [
      withPostSuccess((dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(actionCreators.getComponents(collection));
        dispatch(dialogActions.dismissDialog());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
  updateComponent: (collection, values) => ({
    type: actions.UPDATE_INFO,
    target: UPDATE_TARGET,
    service: componentServices.updateDocument,
    payload: normalizeValue(collection, values),
    injections: [
      withPostSuccess((dispatch) => {
        dispatch(reset(FORM_NAMES.FORM.GENERIC));
        dispatch(actionCreators.getComponents(collection));
        dispatch(dialogActions.dismissDialog());
      }),
      withPostFailure((_, response) => {
        throw new SubmissionError({ _error: response.message });
      }),
    ],
  }),
};
