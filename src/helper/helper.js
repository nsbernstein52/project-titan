/**
   * Use of Parameters:
  http://example.com/page?parameter=value&also=another
  * */

// ///////////////// PRODUCTS ////////////////////////////////

const getAllProducts = callback => {
  fetch(`http://3.134.102.30/products/list`) // CHANGE: default is 5. example: /?count=50 to get 50...
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
  // returns array of objects with id, name, description, ...
};

// example how to use:
// getAllProducts(result => console.log(result));

const getOneProduct = (productId, callback) => {
  fetch(`http://3.134.102.30/products/${productId}`)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
  // returns object with id, name, description, ...
};

const getOneProductStyle = (productId, callback) => {
  fetch(`http://3.134.102.30/products/${productId}/styles`)
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
  // returns object with style_id, name, prices, photos,...
};

const getRelatedProducts = (productId, callback) => {
  fetch(`http://3.134.102.30/products/${productId}/related`)
    .then(response => response.json())
    .then(data => callback(data)) // CHANGE: to do what you want with it
    .catch(err => callback(err));
  // This returns an array of related product id's
};

// ////////////Questions And Answers///////////////////

// Retrieves a list of questions for a particular product. This list does not include any reported questions
const getListQuestions = (productId, callback) => {
  fetch(`http://3.134.102.30/qa/${productId}`) // CHANGE: default is 5. example: /?count=50 to get 50...
    .then(response => response.json())
    .then(data => callback(data)) // CHANGE: to do what you want with it
    .catch(err => callback(err));
  // returns object of productId, results: {questionId, question_body...}
};

const getAnswersList = (questionId, callback) => {
  fetch(`http://3.134.102.30/qa/${questionId}/answers`) // CHANGE: default is 5. example: /?count=50 to get 50...
    .then(response => response.json())
    .then(data => callback(data)) // CHANGE: to do what you want with it
    .catch(err => callback(err));
  // returns an object with a results array that has more info
};

// Adds a question for the given product
const postAQuestion = (productId, body, name, email, callback) => {
  // Parameter |	Type |	Description
  // ------------------------------------------------
  // body	     |  text |	Text of question being asked
  // name	     |  text |	Username for question asker
  // email	 |  text |	Email address for question asker

  fetch(`http://3.134.102.30/qa/${productId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      body,
      name,
      email
    })
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
};

// Add an Answer
const postAnAnswer = (questionId, body, name, email, photos, callback) => {
  // Parameter |	Type  |	Description
  // ------------------------------------------------
  // body	     |  text  |	Text of question being asked
  // name	     |  text  |	Username for question asker
  // email	 |  text  |	Email address for question asker
  // phone     | [text] | an array of urls corresponding to images to display

  fetch(`http://3.134.102.30/qa/${questionId}/answers`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      body,
      name,
      email,
      photos
    })
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
};

// Updates a question to show it was found helpful
const putHelpfulQuestion = (questionId, callback) => {
  fetch(`http://3.134.102.30/qa/question/${questionId}/helpful`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => callback(data))
    .catch(err => callback(err));
};

const putReportQuestion = (questionId, callback) => {
  fetch(`http://3.134.102.30/qa/question/${questionId}/report`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => callback(data))
    .catch(err => callback(err));
};

const putHelpfulAnswer = (answerId, callback) => {
  fetch(`http://3.134.102.30/qa/answer/${answerId}/helpful`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json:"
    }
  })
    .then(data => callback(data))
    .catch(err => callback(err));
};

const putReportAnswer = (answerId, callback) => {
  fetch(`http://3.134.102.30/qa/answer/${answerId}/report`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json:"
    }
  })
    .then(data => callback(data))
    .catch(err => callback(err));
};

// ///////// REVIEWS ////////////////////////////////

// Returns a list of reviews for a particular product. This list does not include any reported reviews
const getListReviews = (productId, callback) => {
  fetch(`http://3.134.102.30/reviews/${productId}/list/?count=99999999`) // You can sort by /?sort="helpful" or "newest" or ...
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
};
// example:
// getListReviews(3, data => console.log(data));

// Returns review metadata for a given product
const getReviewMetadata = (productId, callback) => {
  fetch(`http://3.134.102.30/reviews/${productId}/meta`) // You can sort by /?sort="helpful" or "newest" or ...
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
  // this returns an object with results which has RATINGS, recommend, and summary...
};

const postReview = (productId, review, callback) => {
  /**
     * Parameter |	Type     |	Description
     * ------------------------------------------------------------
       rating	       |    int	     | Integer (1-5) indicating the review rating
       summary         |	text     | Summary text of the review
       body	           |    text     | Continued or full text of the review
       recommend       |	bool     | Value indicating if the reviewer recommends the product
       name	text       |  Username   | for question asker
       email	       |    text     | Email address for question asker
       photos	       |   [text]	 | Array of text urls that link to images to be shown
       characteristics |   object	 | Object of keys representing characteristic_id and values representing the review value for that characteristic. { "14": 5, "15": 5 //...}
     */

  //* **EITHER send it over in one object called review OR in individual parts***//

  //   let review = {
  //     rating: rating,
  //     summary: summary,
  //     body: body,
  //     recommend: recommend,
  //     name: name,
  //     email: email,
  //     photos: [],
  //     characteristics: characteristics
  //   };

  // Add a review
  fetch(`http://3.134.102.30/reviews/${productId}/`, {
    // You can sort by /?sort="helpful" or "newest" or ...
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(review) // we need to make sure this is an object of all necessary info
  })
    .then(response => response.json())
    .then(data => callback(data))
    .catch(err => callback(err));
  // this returns an object with results which has RATINGS, recommend, and summary...
};

// Updates a review to show it was found helpful
const putHelpfulReview = (reviewId, callback) => {
  fetch(`http://3.134.102.30/reviews/helpful/${reviewId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    }
  })
    .then(data => callback(data))
    .catch(err => callback(err));
};

const calculateReviewRating = productMetaData => {
  const calculated =
    (productMetaData.ratings["1"] +
      productMetaData.ratings["2"] * 2 +
      productMetaData.ratings["3"] * 3 +
      productMetaData.ratings["4"] * 4 +
      productMetaData.ratings["5"] * 5) /
    (productMetaData.ratings["1"] +
      productMetaData.ratings["2"] +
      productMetaData.ratings["3"] +
      productMetaData.ratings["4"] +
      productMetaData.ratings["5"]);
  return Math.trunc(calculated * 100) / 100;
};

// const calculateStarRating = productMetaData => {
//   let average = calculateReviewRating(productMetaData);
//   let stars = { whole: 0, half: 0, quarter: 0, threeQuarter: 0 };
//   stars.whole =
//     average - (average % 1)(average % 1 >= 0.5 && average % 1 < 0.75)
//       ? (stars.half = 1)
//       : average % 1 >= 0.25 && average % 1 < 0.5
//       ? (stars.quarter = 1)
//       : average % 1 >= 0.75
//       ? (stars.threeQuarter = 1)
//       : null;
//   return stars;
// };

module.exports = {
  getAllProducts,
  getOneProduct,
  getOneProductStyle,
  getRelatedProducts,
  getListQuestions,
  getAnswersList,
  postAQuestion,
  postAnAnswer,
  putHelpfulQuestion,
  putReportQuestion,
  putHelpfulAnswer,
  putReportAnswer,
  getListReviews,
  getReviewMetadata,
  postReview,
  putHelpfulReview,
  // putHelpfulReview,
  calculateReviewRating
  // calculateStarRating
};
