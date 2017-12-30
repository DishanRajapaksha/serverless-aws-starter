import {DataMapper} from "@aws/dynamodb-data-mapper";
import {ConditionExpression, ConditionExpressionPredicate} from "@aws/dynamodb-expressions";
import * as DynamoDB from "aws-sdk/clients/dynamodb";

import {ToDoModel} from "./models/todo";

const client = new DynamoDB({region: "ap-southeast-1"});
const mapper = new DataMapper({client});

/**
 * Class representing the methods for the todo model.
 *
 * @class
 */
export class ToDo {

  /**
   * Performs a Query operation using the question model schema
   * to create a new todo entry.
   *
   * @async
   * @function create
   * @param text    The text of the todo.
   * @param duedate    The due date of the todo.
   * @returns  {Promise}
   */
  public async create(text, duedate) {
    try {
      const toCreate = new ToDoModel();

      toCreate.createdAt = new Date().toISOString();
      toCreate.updatedAt = new Date().toISOString();
      toCreate.text = text;
      toCreate.duedate = duedate;

      return await mapper.put(toCreate);

    } catch (err) {
      return err;
    }

  }

  /**
   * Performs a Query operation using the question model schema
   * to update an existing todo entry.
   *
   * @async
   * @function update
   * @param text    The text of the question.
   * @param duedate    The due date of the todo.
   * @returns  {Promise}
   */
  public async update(id, text, duedate) {

    const toUpdate = new ToDoModel();
    toUpdate.id = id;
    toUpdate.text = text;
    toUpdate.duedate = duedate;
    toUpdate.updatedAt = new Date().toISOString();

    const equalsExpressionPredicate: ConditionExpressionPredicate = {
      type: "Equals",
      object: id,
    };

    const equalsExpression: ConditionExpression = {
      ...equalsExpressionPredicate,
      subject: "id",
    };

    return await mapper.update(toUpdate, {onMissing: "skip", condition: equalsExpression});
  }

  /**
   * Performs a Scan operation using the question model schema
   * to get a specific todo entry.
   *
   * @async
   * @function read
   * @param id The id of the todo.
   * @returns {Promise}
   */
  public async read(id) {

    const toGet = new ToDoModel();
    toGet.id = id;

    return await mapper.get(toGet);
  }

  /**
   * Performs a Scan operation using the question model schema
   * to retrive all the todo entries on the table.
   *
   * @async
   * @function readAll
   * @returns {Promise}
   */
  public async readAll() {

    const allToDos: ToDoModel[] = [];

    for await (const todo of mapper.scan(ToDoModel)) {
      allToDos.push(todo);
    }

    return allToDos;
  }

  /**
   * Performs a Query operation using the question model schema
   * to delete a specific todo entry.
   *
   * @async
   * @function delete
   * @param id The id of the todo.
   * @returns {Promise}
   */
  public async delete(id) {

    const toDlete = new ToDoModel();
    toDlete.id = id;

    const equalsExpressionPredicate: ConditionExpressionPredicate = {
      type: "Equals",
      object: id,
    };

    const equalsExpression: ConditionExpression = {
      ...equalsExpressionPredicate,
      subject: "id",
    };

    return await mapper.delete(toDlete, {condition: equalsExpression});
  }

}
