import * as React from "react";
import "../styles/style.css";
import {
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Button,
} from "@mui/material";

export default function ErrorMessage({
  errorStorage,
}: {
  errorStorage: {
    isError: boolean;
    errorMessage: string;
  };
}) {
  const [openDialog, setOpenDialog] = React.useState(true);

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog} aria-describedby="alert-dialog-description">
      <DialogContent>
        <DialogContentText component={"span"} id="alert-dialog-description">
          <Alert
            severity="error"
            sx={{
              width: "max-content",
            }}
          >
            {`We've got an error! ${errorStorage.errorMessage}`}
          </Alert>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRefresh} autoFocus>
          Refresh
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
