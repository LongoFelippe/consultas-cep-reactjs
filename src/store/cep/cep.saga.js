import {
  call, select, takeLatest, put,
} from 'redux-saga/effects';
import { GET_CEP } from './cep.constants';
import { findCepByNumber } from '../../services/cep.service';
import { onChangePageViewActions, onSetEnderecoAction } from './cep.store';

export const findCepForNumberAction = () => ({
  type: GET_CEP,
});

function* findCepForApiHandler() {
  try {
    const numeroCep = yield select((states) => states.cepStore.numeroCepControls.value);
    const { data } = yield call(findCepByNumber, numeroCep);
    const { erro } = data;

    if (!erro) {
      yield put(onSetEnderecoAction(data));
      yield put(onChangePageViewActions('snackbar',
        {
          open: true,
          message: 'CEP consultado com sucesso',
        }));

    } else {
      yield put(onChangePageViewActions('snackbar',
        {
          open: true,
          message: 'CEP não encontrado',
        }));
    }
  } catch (exception) {
    yield put((onChangePageViewActions('snackbar',
      {
        open: true,
        message: 'Ocorreu um erro ao tentar consultar o CEP inforamdo.',
      })));
    console.log(exception);
  } finally {

  }
}

export default function* watchCepSaga() {
  yield takeLatest(GET_CEP, findCepForApiHandler);
}
