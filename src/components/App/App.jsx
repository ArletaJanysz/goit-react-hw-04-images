import React, { useState, useEffect } from 'react';
import Searchbar from '../Searchbar/Searchbar';
import ImageGallery from '../ImageGallery/ImageGallery';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';
import Loader from '../Loader/Loader';

import './App.css';

export function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [page, setPage] = useState(1);

  const handleSearch = searchQuery => {
    setImages([]);
    setQuery(searchQuery);
    setPage(1);
  };

  const fetchImages = useEffect(() => {
    const apiKey = '39307945-e2807d203f602e849866feaef';
    const perPage = 12;
    setLoading(true);
    fetch(
      `https://pixabay.com/api/?q=${query}&page=${page}&key=${apiKey}&image_type=photo&orientation=horizontal&per_page=${perPage}`
    )
      .then(response => response.json())
      .then(data => {
        setImages([...images, ...data.hits]);
        setLoading(false);
      });
  }, [images, page, query]);

  const loadMoreImages = () => {
    const nextPage = page + 1;
    setPage(nextPage);
  };

  const openModal = image => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    if (query === '') return;

    fetchImages();
  }, [query, page, fetchImages]);

  return (
    <div className="App">
      <Searchbar onSubmit={handleSearch} />
      {loading && <Loader />}
      <ImageGallery images={images} onImageClick={openModal} />
      {images.length > 0 && !loading && (
        <Button onClick={loadMoreImages} isVisible={true} />
      )}
      {selectedImage && (
        <Modal
          src={selectedImage.largeImageURL}
          alt={selectedImage.tags}
          onClose={closeModal}
        />
      )}
    </div>
  );
}
