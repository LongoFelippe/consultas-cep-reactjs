import {
  call, select, takeLatest, put,
} from 'redux-saga/effects';
import { ADD_ENDERECO, GET_CEP } from './cep.constants';
import { findCepByNumber } from '../../services/cep.service';
import {
  setPageViewActions,
  setEnderecoAction,
  setEnderecosActions,
} from './cep.store';

export const findCepForNumberAction = () => ({
  type: GET_CEP,
});

export const addEnderecoActions = () => ({
  type: ADD_ENDERECO,
});

function* addEnderecoHandler() {
  const endereco = yield select((states) => [states.cepStore.endereco]);
  if (endereco[0].cep === '') {
    yield put(setPageViewActions('snackbar',
      {
        open: true,
        message: 'Informe o endereço',
      }));
  } else {
    const enderecos = yield select((states) => states.cepStore.enderecos);
    yield put(setEnderecosActions([...endereco, ...enderecos]));
  }
}

function* enderecoFinded(endereco) {
  yield put(setEnderecoAction(endereco));
  yield put(setPageViewActions('snackbar',
    {
      open: true,
      message: 'Endereço encontrado com sucesso',
    }));
}

function* findEnderecoForApiHandler() {
  const numeroCep = yield select((states) => states.cepStore.numeroCepControls.value);
  const { data } = yield call(findCepByNumber, numeroCep);
  const { erro } = data;

  if (erro) {
    yield put(setPageViewActions('snackbar',
      {
        open: true,
        message: 'Endereço não encontrado',
      }));
  } else {
    yield enderecoFinded(data);
  }
}

export default function* watchCepSaga() {
  yield takeLatest(GET_CEP, findEnderecoForApiHandler);
  yield takeLatest(ADD_ENDERECO, addEnderecoHandler);
}
