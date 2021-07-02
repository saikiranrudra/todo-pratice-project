import {
  create,
  getMany,
  getOneByQuery,
  updateOne,
  deleteOne,
} from "./../helpers/factory";
import catchAsync from "../utils/catchAsync";
import Task from "./../models/Task";
import { TaskType } from "./../helpers/taskType";
import { filter } from "./../helpers/taskFilter";

/**
 * Create a Task
 */
export const createTask = catchAsync(async (req, res, next) => {
  const document = await create(Task, req.body);
  res.status(201).json(document);
});

/**
 * Get All task with optional query
 */
export const getAllTask = catchAsync(async (req, res, next) => {
  const query = req.body.query ? req.body.query : {};
  const result = await getMany(Task, query, filter);
  res.status(200).json(result);
});

/**
 * get one task based on query
 */
export const getOneTask = catchAsync(async (req, res, next) => {
  const task = await getOneByQuery(Task, req.body, filter);
  res.status(200).json(task);
});

/**
 * update task
 */

export const updateTask = catchAsync(async (req, res, next) => {
  const task = await updateOne(Task, req.body.query, req.body.data, filter);
  res.status(204).json();
});

export const deleteTask = catchAsync(async (req, res, next) => {
  await deleteOne(Task, req.body.query, filter);
  res.status(204).end();
});

export const completedTask = catchAsync(async (req, res, next) => {
  /**
   * 1. find task completed till now
   * 2. group by task type
   * 3. count task
   * 4. Select task count and type
   */
  const result = await Task.aggregate([
    { $match: { isCompleted: true } },
    { $group: { _id: "$type", count: { $sum: 1 } } },
  ]);

  let outData: { [key: string]: number } = {};
  result.forEach((res) => (outData[res._id] = res.count));
  Object.values(TaskType).forEach((type) => {
    if (!outData[type]) {
      outData[type] = 0;
    }
  });
  res.status(200).json(outData);
});

export const todaysTasks = catchAsync(async (req, res, next) => {
  const today = new Date().setHours(0, 0, 0, 0);
  const tomorrow = new Date().setHours(24, 0, 0, 0);

  const result = await Task.find({
    reminderDate: { $gte: today, $lt: tomorrow },
  });
  res.status(200).json(result);
});
