export const buildQueryParam = (params: Record<string, any>) => {
  const query = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    const value = params[key];
    if (Array.isArray(value)) {
      value.forEach((val) => query.append(key, val));
    } else if (typeof value === "object" && value) {
      query.append(key, JSON.stringify(value));
    } else if (value) {
      query.append(key, String(value));
    }
  });
  return query.toString();
};

export const url = (enpoint:string) => {
    return `${process.env.REACT_APP_API_URL}${enpoint}`;
}
