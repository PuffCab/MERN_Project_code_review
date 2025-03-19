import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ListingType } from "../types/customTypes";
import { Button, Card } from "react-bootstrap";
import { baseUrl } from "../utils/baseUrl";

function ListingDetails() {
  const { listingId } = useParams<string>();
  const [listing, setListing] = useState<ListingType | null>(null);

  const getListingById = async () => {
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `${baseUrl}/api/listings/${listingId}`,
        requestOptions
      );

      if (!response.ok) {
        throw new Error("Something went wrong fetching the single listing");
      }

      if (response.ok) {
        const result = await response.json();
        console.log(result);
        setListing(result.listing);
      }
    } catch (error) {
      console.log("error fetching the single listing :>> ", error);
    }
  };

  useEffect(() => {
    getListingById();
  }, []);

  return (
    <div className="single-listing-container">
      <Card style={{ width: "23rem" }}>
        <Card.Img variant="top" src={listing?.image} />
        <Card.Body>
          <Card.Title>{listing?.name}</Card.Title>
          {/* <UserModal user={listing?.user} /> */}

          <Card.Text>{listing?.description}</Card.Text>
          <Button variant="primary">Contact</Button>
        </Card.Body>
      </Card>
    </div>
  );
}

export default ListingDetails;
