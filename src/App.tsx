import * as React from "react";
import "./styles/style.css";
import {
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import ModalComponent from "./components/Modal";
import ErrorMessage from "./components/Error";
import ErrorBoundary from "./ErrorBoundary";
import axios from "axios";

function App() {
  const [imagesArr, setImagesArr] = React.useState([
    {
      albumId: 0,
      id: 0,
      title: "",
      url: "",
      thumbnailUrl: "",
    },
  ]);
  const [openModal, setOpenModal] = React.useState({ open: false, index: 0 });
  const [contentLoaded, setContentLoaded] = React.useState(false);
  const [errorStorage, setErrorStorage] = React.useState({
    isError: false,
    errorMessage: "",
  });

  React.useEffect(() => {
    const cleanupAbort = new AbortController();

    axios
      .get("https://jsonplaceholder.typicode.com/albums/1/photos", {
        signal: cleanupAbort.signal,
      })
      .then((response) => setImagesArr(response.data))
      .then(() => setContentLoaded(true))
      .catch(
        (err) =>
          err.name != "CanceledError" &&
          setErrorStorage({ isError: true, errorMessage: err.name })
      );

    return () => cleanupAbort.abort();
  });

  const imagesArrMapped = imagesArr.map(
    ({ id, title, thumbnailUrl }, index) => (
      <ImageListItem
        key={id}
        onClick={() => setOpenModal({ open: true, index: index })}
      >
        <img src={thumbnailUrl} alt={title} />
        <ImageListItemBar title={title} />
      </ImageListItem>
    )
  );

  return (
    <ErrorBoundary>
      {errorStorage.isError ? (
        <ErrorMessage errorStorage={errorStorage} />
      ) : (
        <ImageList style={{ marginTop: "4px" }} cols={3}>
          {contentLoaded ? (
            imagesArrMapped
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={!contentLoaded}
            >
              <CircularProgress color="inherit" sx={{ marginRight: "20px" }} />
              <h2>Loading</h2>
            </Backdrop>
          )}{" "}
          <ModalComponent
            openModal={openModal}
            setOpenModal={setOpenModal}
            element={imagesArr[openModal.index]}
          />
        </ImageList>
      )}
    </ErrorBoundary>
  );
}

export default App;
