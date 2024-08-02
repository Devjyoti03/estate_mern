import React, { useState } from "react";
import SearchBar from "../../components/SearchBar/SearchBar";
import "./Properties.css";
import useProperties from "../../hooks/useProperties";
import { PuffLoader } from "react-spinners";
import { useAuth0 } from "@auth0/auth0-react";
import PropertyCard from "../../components/Card/PropertyCard";
const Properties = () => {
  const { data, isError, isLoading } = useProperties();
  const [filter, setFilter] = useState("");
  if (isError) {
    return (
      <div className="wrapper">
        <span>Error while fetching data</span>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="wrapper flexCenter" style={{ height: "60vh" }}>
        <PuffLoader
          height="80"
          width="80"
          radius={1}
          color="#4066ff"
          aria-label="puff-loading"
        />
      </div>
    );
  }
  const { user } = useAuth0();

  return (
    <div className="wrapper">
      <div className="flexColCenter paddings innerWidth properties-container">
        <SearchBar filter={filter} setFilter={setFilter} />

        <div className="paddings flexCenter properties">
          {
            // data.map((card, i)=> (<Card card={card} key={i}/>))

            data
            .filter(
              (property) =>
                // Exclude properties with the same userEmail as the logged-in user
                property.userEmail !== user?.email &&
                // Apply the search filter
                (property.title.toLowerCase().includes(filter.toLowerCase()) ||
                  property.city.toLowerCase().includes(filter.toLowerCase()) ||
                  property.country.toLowerCase().includes(filter.toLowerCase()))
            )
            .map((card, i) => (
              <PropertyCard card={card} key={i} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Properties;