import CampaignItem from "./CampaignsItem";
import "./CampaignAll.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { campainViewAction } from "../../Redux/Slices/campains/campainsSlice";

const Campaigns = () => {
  const dispatch = useDispatch();
  const { campains } = useSelector((state) => state?.campains);
  useEffect(() => {
    dispatch(campainViewAction());
  }, [dispatch]);
  return (
    <section className="campaigns">
      <div className="section-title">
        <br />
        <h2>Kampanyalar</h2>
        <p>Öne Çıkan Kampanyalar</p>
      </div>
      <div className="container">
        <div className="campaigns-wrapper">
          {campains.map((campaign) => (
            <CampaignItem campainItem={campaign} key={campaign._id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Campaigns;
