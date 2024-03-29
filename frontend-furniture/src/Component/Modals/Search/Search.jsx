import PropTypes from "prop-types";
import { message } from "antd";
import "./Search.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../../../utils/baseURL";

const Search = ({ isSearchShow, setIsSearchShow }) => {
  const [searchResults, setSearchResults] = useState(null);

  const handleCloseModal = () => {
    setIsSearchShow(false);
    setSearchResults(null);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    const productName = e.target[0].value;

    if (productName.trim().length === 0) {
      message.warning("Boş karakter arayamazsınız!");
      return;
    }

    try {
      const res = await fetch(
        `${BASE_URL}/products/search/${productName.trim()}`
      );

      if (!res.ok) {
        message.error("Ürün getirme hatası!");
        return;
      }

      const data = await res.json();
      setSearchResults(data.product);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`modal-search ${isSearchShow ? "show" : ""} `}>
      <div className="modal-wrapper">
        <h3 className="modal-title">Ürünleri arayın</h3>
        <p className="modal-text">
          Aradığınız ürünleri görmek için yazmaya başlayın.
        </p>
        <form className="search-form" onSubmit={handleSearch}>
          <input type="text" placeholder="Bir Ürünü Arayın" />
          <button>
            <i className="bi bi-search"></i>
          </button>
        </form>
        <div className="search-results">
          <div className="search-heading">
            <h3>Ürünün sonuçları</h3>
          </div>
          <div
            className="results"
            style={{
              display: `${
                searchResults?.length === 0 || !searchResults ? "flex" : "grid"
              }`,
            }}
          >
            {!searchResults && (
              <b
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                Ürün Ara...
              </b>
            )}
            {searchResults?.length === 0 && (
              <a
                href="#"
                className="result-item"
                style={{
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                😔Aradığınız Ürün Bulunamadı😔
              </a>
            )}
            {searchResults?.length > 0 &&
              searchResults?.map((resultItem) => (
                <a
                  href={`product/${resultItem._id}`}
                  className="result-item"
                  key={resultItem._id}
                >
                  <img
                    src={resultItem.img[0]}
                    className="search-thumb"
                    alt=""
                  />
                  <div className="search-info">
                    <h4>{resultItem.name}</h4>
                    <span className="search-sku">
                      SKU: {resultItem.stokCode}
                    </span>
                    <span className="search-price">
                      ${resultItem.price.current.toFixed(2)}
                    </span>
                  </div>
                </a>
              ))}
          </div>
        </div>
        <i
          className="bi bi-x-circle"
          id="close-search"
          onClick={handleCloseModal}
        ></i>
      </div>
      <div className="modal-overlay" onClick={handleCloseModal}></div>
    </div>
  );
};

export default Search;

Search.propTypes = {
  isSearchShow: PropTypes.bool,
  setIsSearchShow: PropTypes.func,
};
