import {
  SET_ENDERECO,
  SET_ENDERECO_VALUE,
  SET_ENDERECOS,
  SET_NUMERO_CEP,
  SET_PAGE_ACTION_VIEW,
} from './cep.constants';

const buildInitialStatesEndereco = () => ({
  cep: '',
  numero: '',
  logradouro: '',
  complemento: '',
  bairro: '',
  localidade: '',
  uf: '',
});

const buildInitialStatesSnackbar = () => ({
  open: false,
  duration: 6000,
  message: '',
});

const INITIAL_STATES = {
  numeroCepControls: '',
  endereco: buildInitialStatesEndereco(),
  enderecos: [],
  pageViewActions: {
    snackbar: buildInitialStatesSnackbar(),
  },
};

export const setPageViewActions = (object, value) => ({
  type: SET_PAGE_ACTION_VIEW,
  object,
  value,
});

export const setEnderecosActions = (enderecos) => ({
  type: SET_ENDERECOS,
  enderecos,
});

export const setNumeroCepAction = (name, value) => ({
  type: SET_NUMERO_CEP,
  object: 'numeroCepControls',
  name,
  value,
});

export const setEnderecoValueAction = (name, value) => ({
  type: SET_ENDERECO_VALUE,
  object: 'endereco',
  name,
  value,
});

export const setEnderecoAction = (value) => ({
  type: SET_ENDERECO,
  value,
});

function setEnderecosHandler(states, actions) {
  const { enderecos } = actions;
  return {
    ...states,
    enderecos: [...enderecos],
  };
}

function setValuObject(states, actions) {
  const { name, value, object } = actions;
  return {
    ...states,
    [object]: {
      ...states[object],
      [name]: value,
    },
  };
}

function setPageViewHandler(states, actions) {
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

function setEnderecoHandler(states, actions) {
  const { value } = actions;
  return {
    ...states,
    endereco: {
      ...states.endereco,
      ...value,
    },
  };
}

export default function (states = INITIAL_STATES, actions) {
  switch (actions.type) {
    case SET_NUMERO_CEP:
      return setValuObject(states, actions);
    case SET_ENDERECO_VALUE:
      return setValuObject(states, actions);
    case SET_ENDERECOS:
      return setEnderecosHandler(states, actions);
    case SET_ENDERECO:
      return setEnderecoHandler(states, actions);
    case SET_PAGE_ACTION_VIEW:
      return setPageViewHandler(states, actions);
    default:
      return states;
  }
}
