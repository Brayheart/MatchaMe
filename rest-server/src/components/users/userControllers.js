import {
  fetchAllUsersQuery,
  fetchSingleUsersQuery,
  fetchMultipleUsersQuery,
  fetchUsersTagsForRatingQuery,
  fetchSingleUserAttractivenessQuery,
  updateRaterRateeRelationshipQuery,
  updateTotalAttractivenessQuery,
  updateAverageAttractivenessQuery,
  updateUserInfoQuery,
  updateUserRankingForTrueQuery,
  updateUserRankingForFalseQuery
} from './userQueries';

export const fetchAllUsersController = async (req, res) => {
  try {
  } catch (err) {}
};

export const fetchSingleUserController = async (req, res) => {
  try {
    const data = await fetchSingleUsersQuery(req.params);
    res.status(200).send(data);
  } catch (err) {
    console.log('Error on fetchSingleUserController', err);
  }
};

export const fetchMultipleUsersController = async (req, res) => {
  try {
    const id = req.params.id;
    const { rows } = await fetchSingleUserAttractivenessQuery(id);
    const attractiveness = rows[0].averageattractiveness;
    const constraints = {
      min: (attractiveness - 3),
      max: (attractiveness + 3)
    }
    const users = await fetchMultipleUsersQuery(constraints);
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
  }
};

export const updateUserAttractivenessController = async (req, res) => {
  try {
    const score = {
      attractiveness: req.body.attractiveness,
      ratee: req.body.ratee
    }
    let { rows } = await updateTotalAttractivenessQuery(score);
    const newTotalAttractivenessScore = rows[0].totalattractiveness;
    let newTotalNumOfRatings = (rows[0].totalnumofratings + 1);
      // change math.floor to reflect proper rounding ...later
    const newAverageAttractiveness = Math.floor(newTotalAttractivenessScore / (newTotalNumOfRatings));
    const body = {
      ratee: req.body.ratee,
      newAverageAttractiveness: newAverageAttractiveness,
      newTotalNumOfRatings: newTotalNumOfRatings
    };
    await updateAverageAttractivenessQuery(body);
    const raterRatee = {
      rater: req.body.rater,
      ratee: req.body.ratee
    };
    await updateRaterRateeRelationshipQuery(raterRatee);
    return res.send('user attractiveness updated');
  } catch (err) {
    console.error;
  }
};

export const updateUserInfoController = async (req, res) => {
  try {
    await updateUserInfoQuery(req.body);
    return res.status(200).send('success');
  } catch (err) {
    console.error;
  }
};

//'success' referring to both users accepting the match
export const updateUserRankingController = async (req, res) => {
  try {
    const { finalDecision } = req.body;
    const { matchId } = req.params;
    if(finalDecision ==='success') {
      updateUserRankingForTrueQuery(matchId)
    } 
    if (finalDecision === 'fail') {
      updateUserRankingForFalseQuery(matchId);
    }
    console.log('Success on updateUserRankingController');
    res.status(200).send();
  } catch (err) {
    console.log('Error on updateUserRankingController', err);
  }
};
