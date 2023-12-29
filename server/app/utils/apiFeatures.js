export class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }

  filter = () => {
    const queryStringObj = { ...this.queryString };
    const excludesFields = ["sort", "fields", "skip", "limit"];

    excludesFields.forEach((field) => delete queryStringObj[field]);

    let queryStr = JSON.stringify(queryStringObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    this.mongooseQuery = this.mongooseQuery.find(JSON.parse(queryStr));

    return this;
  };

  sort = () => {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.sort(sortBy);
    } else {
      this.mongooseQuery = this.mongooseQuery.sort("-created");
    }

    return this;
  };

  limitFields = () => {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery = this.mongooseQuery.select(fields);
    } else {
      this.mongooseQuery = this.mongooseQuery.select("-__v");
    }

    return this;
  };

  search = (fields) => {
    if (this.queryString.keyword) {
      let query = {
        $or: fields.map((field) => {
          const obj = {};
          obj[field] = { $regex: this.queryString.keyword, $options: "i" };
          return obj;
        }),
      };

      this.mongooseQuery = this.mongooseQuery.find(query);
    }

    return this;
  };

  paginate = () => {
    const limit = this.queryString.limit || 1;
    const skip = this.queryString.skip || 0;

    this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
    
    return this;
  }
}
