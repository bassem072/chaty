export const validatePagination = (data) => {
  const params = {};

  params.searchString = data.searchString ?? "";
  params.inc = data.inc ?? "inc";

  if (data.limit) {
    params.limit = data.limit;
  }

  if (data.page) {
    params.page = data.page;
  }
};

export const validateAddChat = (data) => {
    const body = {};

    if (Array.isArray(data.users)) {}
    else {}
};