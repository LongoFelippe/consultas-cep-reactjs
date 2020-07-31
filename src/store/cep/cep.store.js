import { SET_ENDERECO, SET_NUMERO_CEP, SET_PAGE_ACTION_VIEW } from './cep.constants';

const buildInitialStatesEndereco = () => ({
  cep: '',
  logradouro: '',
  complemento: '',
  bairro: '',
  localidade: '',
  uf: '',
  unidade: '',
  ibge: '',
  gia: '',
});

const buildInitialStatesControls = () => ({
  name: 'value',
  value: '',
  required: true,
});

const buildInitialStatesSnackbar = () => ({
  open: false,
  duration: 6000,
  message: '',
});

const INITIAL_STATES = {
  numeroCepControls: buildInitialStatesControls(),
  enderecos: [buildInitialStatesEndereco()],
  pageViewActions: {
    snackbar: buildInitialStatesSnackbar(),
  },
};

export const onChangePageViewActions = (object, value) => ({
  type: SET_PAGE_ACTION_VIEW,
  object,
  value,
});

export const onSetEnderecoAction = (data) => ({
  type: SET_ENDERECO,
  data,
});

export const onChangeNumeroCepControlsActions = (name, value) => ({
  type: SET_NUMERO_CEP,
  name,
  value,
});

function onSetEnderecoHandler(states, actions) {
  const { data } = actions;

  const {
    cep,
    logradouro,
    complemento,
    bairro,
    localidade,
    uf,
    unidade,
    ibge,
    gia,
  } = data;

  return {
    ...states,
    enderecos: [
      ...states.enderecos,
      {
        cep,
        logradouro,
        complemento,
        bairro,
        localidade,
        uf,
        unidade,
        ibge,
        gia,
      },
    ],
  };
}

function onChangeNumeroCepControlsHandler(states, actions) {
  const { name, value } = actions;
  return {
    ...states,
    numeroCepControls: {
      ...states.numeroCepControls,
      [name]: value,
    },
  };
}

function onChangePageViewHandler(states, actions) {
  const { object, value } = actions;

  return {
    ...states,
    pageViewActions: {
      ...states.pageViewActions,
      [object]: {
        ...states.pageViewActions[object],
        ...value,
      },
    },
  };
}

export default function (states = INITIAL_STATES, actions) {
  switch (actions.type) {
    case SET_NUMERO_CEP:
      return onChangeNumeroCepControlsHandler(states, actions);
    case SET_ENDERECO:
      return onSetEnderecoHandler(states, actions);
    case SET_PAGE_ACTION_VIEW:
      return onChangePageViewHandler(states, actions);
    default:
      return states;
  }
}
