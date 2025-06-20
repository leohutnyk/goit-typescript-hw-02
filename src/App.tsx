import { useEffect, useMemo, useRef, useState } from "react";
import "./App.css";
import SearchBar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Loader from "./components/Loader/Loader";
import ErrorMessage from "./components/ErrorMessage/ErrorMessage";
import LoadMoreBtn from "./components/LoadMoreBtn/LoadMoreBtn";
import ImageModal from "./components/ImageModal/ImageModal";
import { Toaster } from "react-hot-toast";
import fetchImages from "./services/api";

interface Image {
  id: number;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
  };
}
interface fetchImagesResponse {
  total: number;
  total_pages: number;
  results: Image[];
}

function App() {
  const [page, setPage] = useState<number>(1);
  const [queryValue, setQueryValue] = useState<string>("");
  const [gallery, setGallery] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [modalIsOpen, setIsOpen] = useState<boolean>(false);
  const [modalImage, setModalImage] = useState<string>("");
  const [altDescription, setAltDescription] = useState<string>("");

  const ref = useRef<HTMLDivElement>(null!);
  const maxImages = 50;

  useEffect(() => {
    if (queryValue === "") return;

    const handleSearch = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const data: fetchImagesResponse = await fetchImages(queryValue, page);
        console.log("data: ", data);
        if (data.total === 0) return;

        setGallery((prevGallery) => {
          const updatedGallery = [...prevGallery, ...data.results];
          if (updatedGallery.length > maxImages) {
            return updatedGallery.slice(0, maxImages);
          }
          return updatedGallery;
        });
        setTotalPages(data.total_pages);
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };
    handleSearch();
  }, [page, queryValue]);

  useEffect(() => {
    if (page === 1) return;

    ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [page, gallery]);

  const handleQuery = (newQuery: string): void => {
    setQueryValue(newQuery);
    setGallery([]);
    setPage(1);
  };

  const handleLoadMore = (): void => {
    setPage(page + 1);
  };

  const isActive = useMemo(() => page === totalPages, [page, totalPages]);

  const openModal = (): void => {
    setIsOpen(true);
  };

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const updateModalStateData = (src: string, alt: string): void => {
    setModalImage(src);
    setAltDescription(alt);
  };

  return (
    <div ref={ref}>
      <SearchBar onSubmit={handleQuery} />
      {gallery.length > 0 && (
        <ImageGallery
          gallery={gallery}
          openModal={openModal}
          updateModalStateData={updateModalStateData}
        />
      )}
      {isLoading && <Loader />}
      {isError && (
        <ErrorMessage message="Щось пішло не так. Спробуйте ще раз." />
      )}
      {gallery.length > 0 && !isLoading && !isError && (
        <LoadMoreBtn handleLoadMore={handleLoadMore} isActive={isActive} />
      )}
      <ImageModal
        modalIsOpen={modalIsOpen}
        closeModal={closeModal}
        src={modalImage}
        alt={altDescription}
      />
      <Toaster position="top-right" reverseOrder={true} />
    </div>
  );
}

export default App;
