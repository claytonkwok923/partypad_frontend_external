import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { createListing, editListing, deleteListing } from "./listingsSlice";

function ListingForm({ listing, onSubmit }) {
    const { register, handleSubmit, errors } = useForm({
        defaultValues: {
            title: listing?.title || "",
            description: listing?.description || "",
            price: listing?.price || "",
            bedrooms: listing?.bedrooms || "",
            bathrooms: listing?.bathrooms || "",
            location: listing?.location || "",
        },
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>
                Title:
                <input name="title" ref={register({ required: true })} />
                {errors.title && <span>This field is required</span>}
            </label>
            <label>
                Description:
                <textarea name="description" ref={register({ required: true })} />
                {errors.description && <span>This field is required</span>}
            </label>
            <label>
                Price:
                <input name="price" type="number" ref={register({ required: true })} />
                {errors.price && <span>This field is required</span>}
            </label>
            <label>
                Bedrooms:
                <input
                    name="bedrooms"
                    type="number"
                    ref={register({ required: true })}
                />
                {errors.bedrooms && <span>This field is required</span>}
            </label>
            <label>
                Bathrooms:
                <input
                    name="bathrooms"
                    type="number"
                    ref={register({ required: true })}
                />
                {errors.bathrooms && <span>This field is required</span>}
            </label>
            <label>
                Location:
                <input name="location" ref={register({ required: true })} />
                {errors.location && <span>This field is required</span>}
            </label>
            <button type="submit">Save</button>
        </form>
    );
}

function Listing({ listing, onEdit, onDelete }) {
    return (
        <div>
            <h2>{listing.title}</h2>
            <p>{listing.description}</p>
            <p>Price: {listing.price}</p>
            <p>Bedrooms: {listing.bedrooms}</p>
            <p>Bathrooms: {listing.bathrooms}</p>
            <p>Location: {listing.location}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={onDelete}>Delete</button>
        </div>
    );
}

function ListingsPage() {
    const listings = useSelector((state) => state.listings);
    const dispatch = useDispatch();
    const [editing, setEditing] = React.useState(false);
    const [selectedListing, setSelectedListing] = React.useState(null);

    useEffect(() => {
        // Load listings from server
        // dispatch(loadListings());
    }, [dispatch]);

    const handleCreate = (data) => {
        dispatch(createListing(data));
        setEditing(false);
        setSelectedListing(null);
    };

    const handleUpdate = (data) => {
        dispatch(editListing({ id: selectedListing.id, ...data }));
        setEditing(false);
        setSelectedListing(null);
    };

    const handleDelete = (listing) => {
        dispatch(deleteListing(listing.id));
    };

    const handleEdit = (listing) => {
        setEditing(true);
        setSelectedListing(listing);
    };

    const handleCancel = () => {
        setEditing(false);
        setSelectedListing(null);
    };

    return (
        <div>
            <h1>Listings</h1>
            {editing && (
                <div>
                    <h2>{selectedListing ? "Edit" : "Create"} Listing</h2>
                    <ListingForm
                        listing={selectedListing}
                        onSubmit={selectedListing ? handleUpdate : handleCreate}
                    />
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            )}
            {!editing && (
                <div>
                    <button onClick={() => setEditing(true)}>Create Listing</button>
                    {listings?.map((listing) => (
                        <Listing
                            key={listing.id}
                            listing={listing}
                            onEdit={() => handleEdit(listing)}
                            onDelete={() => handleDelete(listing)}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default ListingsPage;
