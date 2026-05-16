export const getPriorityScore = (
  type: string,
  timestamp: string
) => {
  let typeScore = 0;

  if (type === "Placement") {
    typeScore = 3;
  } else if (type === "Result") {
    typeScore = 2;
  } else {
    typeScore = 1;
  }

  const timeScore =
    new Date(timestamp).getTime() / 1000000000000;

  return typeScore * 10 + timeScore;
};

export const getTopNotifications = (
  notifications: any[]
) => {
  return [...notifications]
    .sort((a, b) => {
      return (
        getPriorityScore(
          b.Type,
          b.Timestamp
        ) -
        getPriorityScore(
          a.Type,
          a.Timestamp
        )
      );
    })
    .slice(0, 10);
};