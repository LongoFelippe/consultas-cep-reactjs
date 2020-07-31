import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Grid, Typography } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import LanguageIcon from '@material-ui/icons/Language';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import SearchIcon from '@material-ui/icons/Search';
import TextField from '@material-ui/core/TextField';
import { findCepForNumberAction } from '../store/cep/cep.saga';
import { onChangeNumeroCepControlsActions, onChangePageViewActions } from '../store/cep/cep.store';
import InputField from './UI/InputField';
import CollapsibleTable from './UI/table/Table';

function Home() {
  const dispatch = useDispatch();

  const [searchButtonDisabled, setSearchButtonDisabled] = useState(true);
  const enderecos = useSelector((states) => ([{ ...states.cepStore.enderecos }]));
  const snackBarControls = useSelector((states) => ({ ...states.cepStore.pageViewActions.snackbar }));
  const numeroCepControls = useSelector((states) => ({ ...states.cepStore.numeroCepControls }));

  const onChangeNumeroCepHandler = useCallback((event) => {
    const { name, value } = event.target;
    setSearchButtonDisabled(value.length !== 8);
    dispatch(onChangeNumeroCepControlsActions(name, value));
  }, [dispatch]);

  const onFindCepForNumberHandler = useCallback(() => {
    dispatch(findCepForNumberAction());
  }, [dispatch]);

  const onCloseSnackbarHandler = useCallback(() => {
    dispatch(onChangePageViewActions('snackbar', { open: false }));
  }, [dispatch]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        key="top,right"
        message={snackBarControls.message}
        open={snackBarControls.open}
        autoHideDuration={snackBarControls.duration}
        variant={snackBarControls.variant}
        onClose={onCloseSnackbarHandler}
      />
      <Grid container style={{ padding: '5%', backgroundColor: '#e8e8e8' }} justify="center">
        <Grid container item spacing={2} xs={12} sm={12} style={{ backgroundColor: 'white', borderRadius: '5px' }}>
          <Grid container item xs={12} sm={12} alignItems="center" justify="center">
            <Typography component="h2" variant="h2"> CONSULTA DE CEP </Typography>
          </Grid>
          <Grid container item xs={12} sm={2}>
            <TextField
              id="input-with-icon-textfield-lastName"
              fullWidth
              required={numeroCepControls.required}
              error={numeroCepControls.error}
              value={numeroCepControls.value}
              name={numeroCepControls.name}
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
          <Grid container item xs={12} sm={10} alignItems="flex-end">
            <Button
              variant="contained"
              onClick={onFindCepForNumberHandler}
              color="primary"
              startIcon={<SearchIcon />}
              disabled={searchButtonDisabled}
            >
              Consultar
            </Button>
          </Grid>
          <Grid container item xs={12} sm={8} alignItems="flex-end">
            <p>
              {enderecos.map((endereco) => JSON.stringify(endereco))}
            </p>
          </Grid>
          <Grid container item xs={12} sm={12} alignItems="flex-end">
            <CollapsibleTable
              rows={[enderecos]}
            />
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Home;
