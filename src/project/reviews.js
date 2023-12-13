import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as collectionsClient from "./collections/collectionsClient";
import * as reviewClient from "./reviews/reviewsClient";
import * as userClient from "./users/userClient";

function Reviews() {
  const { id } = useParams();
  const [account, setAccount] = useState();
  const [collabIds, setCollabIds] = useState();
  const [curSession, setCurSession] = useState();
  const [collection, setCollection] = useState();
  const [review, setReview] = useState();
  const [reviews, setReviews] = useState();

  const getCollection = async (id) => {
    const coll = await collectionsClient.getCollectionByUserId(id);
    setCollection(coll);
    const ids = coll.collaberators.map((item) => item.userId);
    setCollabIds(ids);

    const revs = await reviewClient.findReviewByCollectionId(String(coll._id));
    setReviews(revs);
  };

  const leaveReview = async (review) => {
    if (review !== "") {
      setReview("");
      const reviewObj = {
        collectionId: collection._id,
        authorName: curSession.username,
        authorId: curSession._id,
        contents: review,
      };
      await reviewClient.createReview(reviewObj);
    }
  };

  useEffect(() => {
    const fetchCurSession = async () => {
      const session = await userClient.account();
      if (session) {
        setCurSession(session);
      }
    };

    const fetchAccount = async () => {
      const acc = await userClient.findUserById(id);
      if (acc) {
        await getCollection(acc._id);
        setAccount(acc);
      }
    };

    fetchCurSession();
    fetchAccount();
    console.log(
      "account",
      account,
      "\ncollabids",
      collabIds,
      "\ncursession",
      curSession,
      "\ncoll",
      collection
    );
  }, [id, review]);

  return (
    <div class="d-flex justify-content-center w-100 container">
      {curSession &&
      collabIds &&
      curSession &&
      (collabIds.includes(String(curSession._id)) || curSession._id === id) ? (
        <div class="rounded bg-secondary-subtle p-2 w-50">
          {curSession._id !== id && (
            <div class="input-group mb-2">
              <input
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Review"
                class="form-control"
                aria-describedby="button-addon2"
              />
              <button
                class="btn btn-secondary"
                id="button-addon2"
                onClick={() => leaveReview(review)}
              >
                Review Collection
              </button>
            </div>
          )}
          <h3>Reviews</h3>
          {reviews && reviews.length > 0 ? (
            <table class="w-100">
              <thead>
                <tr>
                  <td class="p-1">
                    <h4>Username</h4>
                  </td>
                  <td class="p-1">
                    <h4>Review</h4>
                  </td>
                </tr>
              </thead>
              <tbody>
                {reviews &&
                  reviews.map((item) => {
                    return (
                      <tr key={item._id}>
                        <td class="p-1">
                          <a href={`/#/account/${item.authorId}`}>
                            {item.authorName}
                          </a>
                        </td>
                        <td class="p-1">{item.contents}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          ) : (
            <h3>None Yet</h3>
          )}
        </div>
      ) : (
        <h3>
          Please sign in and make sure you are authoized to review this users
          collection
        </h3>
      )}
    </div>
  );
}

export default Reviews;
