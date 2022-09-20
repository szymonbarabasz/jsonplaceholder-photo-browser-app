import * as React from "react";
import "../styles/style.css";
import { Modal, Box, Typography, CircularProgress, Fade } from "@mui/material";

const style = {
  bgcolor: "background.paper",
  transition: "all 1s",
};

interface ModalComponentPropsTypes {
  openModal: { open: boolean; index: number };
  setOpenModal: React.Dispatch<
    React.SetStateAction<{
      open: boolean;
      index: number;
    }>
  >;
  element: {
    albumId: number;
    id: number;
    title: string;
    url: string;
    thumbnailUrl: string;
  };
}

export default function ModalComponent({
  openModal,
  setOpenModal,
  element,
}: ModalComponentPropsTypes) {
  const [imageLoaded, setImageLoaded] = React.useState(false);

  const handleClose = () => {
    setOpenModal({ open: false, index: openModal.index });
    setTimeout(() => {
      setImageLoaded(false);
      //255ms for transition
    }, 255);
  };

  return (
    <Modal className="modal" open={openModal.open} onClose={handleClose}>
      <Fade in={openModal.open}>
        <Box sx={style} className={imageLoaded ? "box" : "loadingBox"}>
          <img src={element.url} onLoad={() => setImageLoaded(true)} />
          {imageLoaded ? (
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {`Numer albumu: ${element.albumId}`}
              <br />
              {`ID zdjęcia: ${element.id}`}
              <br />
              {`Opis: ${element.title}`}
            </Typography>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <CircularProgress sx={{ marginRight: "20px" }} />
              <h2>Loading</h2>
            </div>
          )}
        </Box>
      </Fade>
    </Modal>
  );
}
