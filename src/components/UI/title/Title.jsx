import React from 'react';
import { Grid, Typography } from '@material-ui/core';
import titleStyles from './title.styles';

function Title({ title }) {
  const styles = titleStyles();

  return (
    <Grid
      container
      item
      justify="center"
      className={styles.wrapper}
    >
      <Typography component="h4" variant="h4">
        {title}
      </Typography>
    </Grid>
  );
}

export default Title;
