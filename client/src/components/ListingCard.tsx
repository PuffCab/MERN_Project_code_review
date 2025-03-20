import { Card } from "react-bootstrap";
import { ListingType } from "../types/customTypes";
import { NavLink } from "react-router";
import SendMessageModal from "./SendMessageModal";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

type ListingCardProps = {
  listing: ListingType;
};

function ListingCard({ listing }: ListingCardProps) {
  console.log(listing.seller);

  const { user } = useContext(AuthContext);
  console.log(user);

  return (
    <Card style={{ width: "18rem" }}>
      <NavLink to={listing._id}>
        <Card.Img
          variant="top"
          src={listing.image}
          style={{ height: 250, objectFit: "cover" }}
        />
      </NavLink>
      <Card.Body className="card-body">
        <NavLink to={listing._id}>
          <Card.Title>{listing.name}</Card.Title>
        </NavLink>

        <Card.Text>{listing.description}</Card.Text>

        <Card.Text>
          {listing.likes ? `Liked by ${listing.likes} people` : ""}
        </Card.Text>
        <div>
          {listing.seller._id !== user?._id ? (
            <SendMessageModal listingId={listing._id} />
          ) : (
            ""
          )}
        </div>
      </Card.Body>
    </Card>
  );
}

export default ListingCard;
