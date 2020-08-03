import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import RoomIcon from '@material-ui/icons/Room';
import interactiveListStyles from './interactiveList.styles';

function InteractiveList({ items = [], setNewItem }) {
  const styles = interactiveListStyles();

  const onRemoveItemHandler = (index) => {
    const allItems = [...items];
    allItems.splice(index, 1);
    setNewItem(allItems);
  };

  const buildItemList = (item, index) => (
    <div key={index}>
      <ListItem divider>
        <ListItemAvatar>
          <Avatar>
            <RoomIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText
          primary={`(${item.cep}) ${item.logradouro} - ${item.numero}, ${item.complemento} - ${item.bairro}`}
          secondary={`${item.localidade} - ${item.uf}`}
        />
        <ListItemSecondaryAction>
          <IconButton edge="end" aria-label="delete" onClick={() => onRemoveItemHandler(index)}>
            <DeleteIcon color="error" />
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    </div>
  );

  return (
    <Grid item xs className={styles.wrapper} zeroMinWidth>
      <Grid container item spacing={1} className={styles.titleList}>
        <Grid item>
          <RoomIcon />
        </Grid>
        <Grid item>
          <Typography variant="h6">
            Endereços
          </Typography>
        </Grid>
      </Grid>
      <div className={styles.itemsList}>
        <List dense>
          {items.map(buildItemList)}
        </List>
      </div>
    </Grid>
  );
}

export default React.memo(InteractiveList);
