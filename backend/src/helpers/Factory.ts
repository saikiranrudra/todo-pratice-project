import { Model } from "mongoose";

export const create = async (Model: Model<any>, data: Object): Promise<any> => {
  try {
    const document = await Model.create(data);
    return document;
  } catch(err) {
    return err;
  }
};
