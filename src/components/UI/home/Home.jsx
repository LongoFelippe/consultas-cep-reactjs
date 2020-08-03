import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import LanguageIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import { addEnderecoActions, findCepForNumberAction } from '../../../store/cep/cep.saga';
import {
  setEnderecoAction,
  setEnderecosActions,
  setEnderecoValueAction,
  setNumeroCepAction,
  setPageViewActions,
} from '../../../store/cep/cep.store';
import InputField from '../input/InputField';
import InteractiveList from '../list/InteractiveList';
import Title from '../title/Title';
import homeStyles from './home.styles';

function Home() {
  const styles = homeStyles();
  const dispatch = useDispatch();

  const [disabledViewActions, setDisabledViewActions] = useState(true);

  const enderecos = useSelector((states) => states.cepStore.enderecos);
  const endereco = useSelector((states) => ({ ...states.cepStore.endereco }));
  const snackBarControls = useSelector((states) => ({ ...states.cepStore.pageViewActions.snackbar }));
  const numeroCepControls = useSelector((states) => ({ ...states.cepStore.numeroCepControls }));

  const onChangeNumeroCepHandler = useCallback((event) => {
    const { name, value } = event.target;
    setDisabledViewActions(value.length !== 8);
    dispatch(setNumeroCepAction(name, value));
  }, [dispatch]);

  const onChangeEnderecoValueHanlder = useCallback((event) => {
    const { name, value } = event.target;
    dispatch(setEnderecoValueAction(name, value));
  }, [dispatch]);

  const onFindCepForNumberHandler = useCallback(() => {
    dispatch(findCepForNumberAction());
  }, [dispatch]);

  const onCloseSnackbarHandler = useCallback(() => {
    dispatch(setPageViewActions('snackbar', { open: false }));
  }, [dispatch]);

  const onAddEnderecoHandler = useCallback(() => {
    dispatch(addEnderecoActions());
  }, [dispatch]);

  const onSetEnderecosHandler = useCallback((value) => {
    dispatch(setEnderecosActions(value));
  }, [dispatch]);

  const onClearEnderecoHandler = useCallback(() => {
    dispatch(setEnderecoAction({
      cep: '',
      numero: '',
      logradouro: '',
      complemento: '',
      bairro: '',
      localidade: '',
      uf: '',
    }));
  }, [dispatch]);

  return (
    <Container maxWidth="lg">
      <Snackbar
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        message={snackBarControls.message}
        open={snackBarControls.open}
        autoHideDuration={snackBarControls.duration}
        variant={snackBarControls.variant}
        onClose={onCloseSnackbarHandler}
      />
      <Grid container spacing={2}>
        <Title title="CONSULTA CEP" />
        <Grid container item spacing={2}>
          <Grid container item spacing={2}>
            <Grid item xl={2} md={2} sm={4} xs={7}>
              <TextField
                id="input-textfield-cep"
                required
                size="small"
                name="value"
                value={numeroCepControls.value}
                onChange={onChangeNumeroCepHandler}
                label="CEP"
                variant="outlined"
                InputProps={{
                  inputComponent: InputField,
                  startAdornment: (
                    <InputAdornment position="start">
                      <LanguageIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid container item xl={2} md={2} sm={8} xs={5} alignItems="flex-end">
              <Button
                size="small"
                variant="contained"
                color="primary"
                disabled={disabledViewActions}
                onClick={onFindCepForNumberHandler}
                startIcon={<SearchIcon />}
              >
                Consultar
              </Button>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid container item xl={1} md={1} sm={12}>
              <TextField
                id="input-textfield-numero"
                name="numero"
                size="small"
                fullWidth
                required
                disabled={disabledViewActions}
                value={endereco.numero}
                onChange={onChangeEnderecoValueHanlder}
                label="N°"
                variant="outlined"
              />
            </Grid>
            <Grid container item xl={3} md={3} sm={12}>
              <TextField
                id="input-textfield-complemento"
                name="complemento"
                size="small"
                fullWidth
                disabled={disabledViewActions}
                value={endereco.complemento}
                onChange={onChangeEnderecoValueHanlder}
                label="Complemento"
                variant="outlined"
              />
            </Grid>
            <Grid container item xl={4} md={4} sm={12}>
              <TextField
                id="input-textfield-logradouro"
                disabled
                fullWidth
                size="small"
                value={endereco.logradouro}
                label="Logradouro"
                variant="outlined"
              />
            </Grid>
            <Grid container item xl={3} md={3} sm={12}>
              <TextField
                id="input-textfield-localidade"
                fullWidth
                size="small"
                disabled
                value={endereco.localidade}
                label="Cidade"
                variant="outlined"
              />
            </Grid>
            <Grid container item xl={1} md={1} sm={12}>
              <TextField
                id="input-textfield-uf"
                disabled
                fullWidth
                size="small"
                value={endereco.uf}
                label="Estado"
                variant="outlined"
              />
            </Grid>
          </Grid>
          <Grid container item spacing={2} justify="flex-end">
            <Grid item>
              <Button
                className={styles.limparButton}
                size="small"
                type="submit"
                variant="contained"
                color="primary"
                onClick={onClearEnderecoHandler}
                startIcon={<DeleteIcon />}
              >
                Limpar
              </Button>
            </Grid>
            <Grid item>
              <Button
                className={styles.salvarButton}
                size="small"
                variant="contained"
                color="primary"
                onClick={onAddEnderecoHandler}
                startIcon={<SaveIcon />}
              >
                Salvar
              </Button>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <InteractiveList
              items={enderecos}
              setNewItem={onSetEnderecosHandler}
            />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Home;
