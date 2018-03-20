import {
  fetchPendingMatchmakingQuery,
  updateMatchmakingQuery
} from './matchmakingQueries';

// fetch multiple matches to vote on, based on user params
export const fetchPendingMatchmakingController = async (req, res) => {
  try {
    const { userId } = req.params;
    const { rows } = await fetchPendingMatchmakingQuery(userId);
    res.send(rows);
  } catch (err) {}
};

// approve or disapprove a match
export const updateMatchmakingController = async (req, res) => {
  const { userId, matchId, decision } = req.body;
  const { approvedcount, rejectedcount } = await updateMatchmakingQuery(
    matchId,
    decision
  );

  res.send();
  try {
  } catch (err) {
    console.log(err);
  }
};
