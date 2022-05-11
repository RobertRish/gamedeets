export const getSavedGamesIds = () => {
  const savedGameIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : [];

  return savedGameIds;
};

export const saveGamesIds = (gameIdArr) => {
  if (gameIdArr.length) {
    localStorage.setItem('saved_games', JSON.stringify(gameIdArr));
  } else {
    localStorage.removeItem('saved_games');
  }
};

export const removeGameId = (gameId) => {
  const savedGameIds = localStorage.getItem('saved_games')
    ? JSON.parse(localStorage.getItem('saved_games'))
    : null;

  if (!savedGamesIds) {
    return false;
  }

  const updatedSavedGamesIds = savedGamesIds?.filter((savedGamesId) => savedGamesId !== gameId);
  localStorage.setItem('saved_games', JSON.stringify(updatedSavedGamesIds));

  return true;
};
