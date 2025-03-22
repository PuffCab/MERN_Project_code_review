import { useContext, useEffect, useState } from "react";
import { baseUrl } from "../utils/baseUrl";

import FavouritesCard from "../components/FavouritesCard";
import { AuthContext } from "../context/AuthContext";

export type FavType = {
  image: string;
  name: string;
  seller: string;
  _id: string;
};

function Favourites() {
  const [favListings, setFavListings] = useState<FavType[] | null>(null);
  const { checkUserStatus } = useContext(AuthContext);
  const token = localStorage.getItem("token");

  const getFavourites = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/profile/favourites`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setFavListings(result.favourites);
      } else {
        console.log("Failed to fetch favourites");
      }
    } catch (error) {
      console.log("Error while fetching favourites: ", error);
    }
  };

  const handleUpdateFavourites = async (listingId: string) => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
    };

    try {
      const response = await fetch(
        `${baseUrl}/api/users/updateFavourites/${listingId}`,
        requestOptions
      );

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        checkUserStatus(); // Refresh user status to reflect changes
        getFavourites();
      } else {
        console.log("Failed to add/remove favourite");
      }
    } catch (error) {
      console.log("Error adding/removing favourite: ", error);
    }
  };

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <div>
      {favListings && favListings.length < 1 ? (
        <h1>No favourites yet</h1>
      ) : (
        <div>
          <h1>My Favourites</h1>
          <div className="profile-cards-container">
            {favListings &&
              favListings.map((listing) => {
                return (
                  <FavouritesCard
                    listing={listing}
                    key={listing._id}
                    handleUpdateFavourites={handleUpdateFavourites}
                  />
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Favourites;
