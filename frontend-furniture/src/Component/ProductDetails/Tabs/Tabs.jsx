import { useState } from "react";
import Reviews from "../../Reviews/Reviews";
import "./Tabs.css";
import PropTypes from "prop-types";

const Tabs = ({ singleProduct }) => {
  const [activeTab, setActiveTab] = useState("desc");

  const handleTabClick = (e, tab) => {
    e.preventDefault();
    setActiveTab(tab);
  };

  return (
    <div className="single-tabs">
      <ul className="tab-list">
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "desc" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "desc")}
          >
            Ürün Açıklama
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "info" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "info")}
          >
            Ürün Hakkında
          </a>
        </li>
        <li>
          <a
            href="#"
            className={`tab-button ${activeTab === "reviews" ? "active" : ""}`}
            onClick={(e) => handleTabClick(e, "reviews")}
          >
            Yorumlar
          </a>
        </li>
      </ul>
      <div className="tab-panel">
        <div
          className={`tab-panel-descriptions content ${
            activeTab === "desc" ? "active" : ""
          }`}
        >
          <div
            className="product-description"
            dangerouslySetInnerHTML={{
              __html: singleProduct?.product?.description,
            }}
          ></div>
        </div>
        <div
          className={`tab-panel-information content ${
            activeTab === "info" ? "active" : ""
          }`}
          id="info"
        >
          <h3>Additional information</h3>
          <table>
            <tbody>
              <tr>
                <th>Stok Kod</th>
                <td>
                  <p>{singleProduct?.product?.stokCode}</p>
                </td>
              </tr>
              <tr>
                <th>Stok Adet</th>
                <td>
                  <p>{singleProduct?.product?.stokCount}</p>
                </td>
              </tr>
              <tr>
                <th>Garanti Süresi</th>
                <td>
                  <p>{singleProduct?.product?.warranty} Ay</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <Reviews
          active={activeTab === "reviews" ? "content active" : "content"}
          singleProduct={singleProduct}
        />
      </div>
    </div>
  );
};

export default Tabs;

Tabs.propTypes = {
  singleProduct: PropTypes.object,
  setSingleProduct: PropTypes.func,
};
