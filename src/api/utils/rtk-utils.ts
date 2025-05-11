// eslint-disable-next-line @typescript-eslint/no-explicit-any
const appendParam = (params: URLSearchParams, key: string, value: any) => {
  if (value !== undefined && value !== null && value !== '') {
    if (Array.isArray(value)) {
      value.forEach(item => {
        if (item !== undefined && item !== null && item !== '') {
          params.append(key, item.toString());
        }
      });
    } else {
      params.append(key, value.toString());
    }
  } else {
    params.delete(key);
  }
};

export const buildQueryWithParams = (
  query: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options: Record<string, any>,
): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(options)) {
    appendParam(params, key, value);
  }

  return `${query}?${params.toString()}`;
};
