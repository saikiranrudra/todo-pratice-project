import { Model } from "mongoose";

type FilterObject = { [key: string]: string | number | boolean };

/**
 * Take object and array of allowed properties returs filtered object
 * @example
 * const result =  filterObject(["name", "email"], {name: "abc", email: "a@g.com", password: 123})
 * console.log(result) // { name: "abc", email: "a@g.com" }
 * @param filters - Array of properties supported in the query Object
 * @param object - filter object on which filter is to be applied
 * @returns - filtered object only contains allowed properties
 */
export const filterObject = (
  filters: String[],
  object: FilterObject
): FilterObject => {
  let filteredQuery: FilterObject = {};
  filters.forEach((filter) => {
    if (object["" + filter]) {
      filteredQuery["" + filter] = object["" + filter];
    }
  });
  return filteredQuery;
};

/**
 * A async function used to create a document in mongodb collection
 * @example
 * import { create } from "./factory.ts";
 * try {
 *  const data = {name: 'saikiran', enrollment: 123456}
 *  const document = await create(User, data);
 * } catch(err) {
 *  //handle error
 * }
 * @param Model - Mongoose model in with which document has to be created
 * @param data - Object which is used to create a document
 * @returns document if created or throws error
 */
export const create = async (Model: Model<any>, data: Object): Promise<any> => {
  try {
    const document = await Model.create(data);
    return document;
  } catch (err) {
    throw err;
  }
};

/**
 * A async function used to get document by Id
 * @example
 * import { getOneById } from "./factory.ts";
 * try {
 *  const document = await getOneById(User, '1das5d4a2sd6546ads');
 * } catch(err) {
 *  //handle error
 * }
 * @param Model - Mongoose model in with which document exist
 * @param _id - _id of the document
 * @returns document if executed or throws error
 */
export const getOneById = async (
  Model: Model<any>,
  _id: string
): Promise<any> => {
  try {
    const document = await Model.findById(_id);
    return document;
  } catch (err) {
    throw err;
  }
};

/**
 * A async function used to get document exist
 * @example
 * import { getOneByQuery } from "./factory.ts";
 * try {
 *  const document = await getOneByQuery(User, { email: 'myemail@gmail.com'});
 * } catch(err) {
 *  //handle error
 * }
 * @param Model - Mongoose model in with which document has to be created
 * @param query - query to filter  objects
 * @param filters - an array of strings represinting parameters allowed by filter
 * @returns document if executed or throws error
 */
export const getOneByQuery = async (
  Model: Model<any>,
  query: FilterObject,
  filters: string[]
): Promise<any> => {
  try {
    // 1. accept only valid filter from query
    let filteredQuery = filterObject(filters, query);
    const document = await Model.findOne(filteredQuery);
    return document;
  } catch (err) {
    throw err;
  }
};

/**
 * A async function used to get documents based on query
 * @example
 * import { getMany } from "./factory.ts";
 * try {
 *  const document = await getMany(User, { birthYear: 2020 });
 * } catch(err) {
 *  //handle error
 * }
 * @param Model - Mongoose model in with which document exist
 * @param query - query object
 * @param filters - an array of strings represinting parameters allowed by filter
 * @returns { data: [Object], page: number, count: number }
 */

export const getMany = async (
  Model: Model<any>,
  { page = 0, ...query }: FilterObject,
  filters: string[]
): Promise<any> => {
  let filteredQuery = filterObject(filters, query);
  let sort = "-createdAt"
  if(filteredQuery.sort) {
    sort = "" + filteredQuery.sort;
    delete filteredQuery.sort;
  }
  try {
    const LIMIT = process.env.DOCUMENT_LIMIT ? +process.env.DOCUMENT_LIMIT : 10;
    const documents = await Model.find(filteredQuery)
      .limit(LIMIT)
      .skip(LIMIT * +page)
      .sort("-createdAt")
      .exec();
    return { data: documents, page };
  } catch (err) {
    throw err;
  }
};

/**
 * A async function used to update document
 * @example
 * import { updateOne } from "./factory.ts";
 * try {
 *  const document = await updateOne(User, { birthYear: 2020 }, { birthyear: 2021 });
 * } catch(err) {
 *  //handle error
 * }
 * @param Model - Mongoose model in with which document exist
 * @param query - query object
 * @param newData - data to be updated
 * @param filters - an array of strings represinting parameters allowed by filter
 * @returns updated document if executed or throws error
 */
export const updateOne = async (
  Model: Model<any>,
  query: FilterObject,
  newData: Object,
  filters: string[]
): Promise<any> => {
  try {
    const filteredQuery = filterObject(filters, query);
    const document = await Model.updateOne(filteredQuery, newData, {
      runValidators: true,
      new: true,
    });
    return document;
  } catch (err) {
    throw err;
  }
};

/**
 *
 * @param Model - The model in which document exist
 * @param query - query object
 * @param filters - an array of strings represinting parameters allowed by filter
 * @returns ok: 1 if no errors occurred, deletedCount: the number of documents deleted, n: the number of documents deleted. Equal to deletedCount.
 */
export const deleteOne = async (
  Model: Model<any>,
  query: FilterObject,
  filters: string[]
): Promise<any> => {
  try {
    const filteredQuery = filterObject(filters, query);
    const result = await Model.deleteOne(filteredQuery);
    return result;
  } catch (err) {
    throw err;
  }
};
