import makeStyles from '@material-ui/core/styles/makeStyles';

const PURE_GRAY = '#e8e8e8e8';

export default makeStyles({
  titleList: {
    backgroundColor: PURE_GRAY,
    borderRadius: '5px 5px 0px 2px',
  },
  itemsList: {
    maxHeight: '60vh',
    overflow: 'auto',
  },
});
