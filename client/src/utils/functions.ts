type ParamsType = {
  [key: string]: string | undefined;
};

export const makeQueries = (params: ParamsType) => {
  let queries = '';
  const entries = Object.entries(params);
  if (!entries) {
    return queries;
  }
  for (const [query, value] of entries) {
    if (value) {
      queries += `&${query}=${value}`;
    }
  }
  queries = '?' + queries.slice(1);
  return queries;
};
