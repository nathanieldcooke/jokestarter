import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars(props:{props:{showSnackBar:boolean,setShowSnackBar:React.Dispatch<React.SetStateAction<boolean>>}}) {
    const { showSnackBar, setShowSnackBar } = props.props
    const [open, setOpen] = React.useState(showSnackBar);


  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    setShowSnackBar(false)
  };

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'right'}}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Must be logged in to use feature
        </Alert>
      </Snackbar>
    </Stack>
  );
}