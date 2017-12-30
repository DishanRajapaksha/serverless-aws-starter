import {ToDo} from "./todo";

export async function createToDo(event, context, callback) {
  try {
    const body = JSON.parse(event.body);

    const text = body.text;
    const duedate = body.duedate;

    const todo = new ToDo();

    const res = await todo.create(text, duedate);

    const response = {
      statusCode: 200,
      body: JSON.stringify({message: "The item was created successfully"}),
    };

    callback(null, response);
  } catch (err) {

    const response = {
      statusCode: 400,
      body: JSON.stringify({message: "An error occured while creating the item.", error: err}),
    };
    callback(null, response);
  }
}

export async function readToDo(event, context, callback) {

  try {
    const id = event.pathParameters.id;

    const todo = new ToDo();

    const res = await todo.read(id);

    const response = {
      statusCode: 200,
      body: JSON.stringify(res),
    };

    callback(null, response);
  } catch (err) {

    const response = {
      statusCode: 400,
      body: JSON.stringify({message: "An error occured while trying to retrive the item.", error: err}),
    };
    callback(null, response);
  }
}

export async function readAllToDos(event, context, callback) {

  try {
    const todo = new ToDo();

    const res = await todo.readAll();

    const response = {
      statusCode: 200,
      body: JSON.stringify(res),
    };

    callback(null, response);
  } catch (err) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({message: "An error occured while trying to retrive the items.", error: err}),
    };
    callback(null, response);
  }
}

export async function updateToDo(event, context, callback) {
  try {

    const body = JSON.parse(event.body);

    const id = body.id;
    const text = body.text;
    const duedate = body.duedate;

    const todo = new ToDo();

    const res = await todo.update(id, text, duedate);

    const response = {
      statusCode: 200,
      body: JSON.stringify({message: "The item was updated successfully"}),
    };

    callback(null, response);
  } catch (err) {
    const response = {
      statusCode: 400,
      body: JSON.stringify({message: "An error occured while trying to update the item.", error: err}),
    };
    callback(null, response);
  }
}

export async function deleteToDo(event, context, callback) {

  try {
    const id = event.pathParameters.id;

    const todo = new ToDo();

    const res = await todo.delete(id);

    const response = {
      statusCode: 200,
      body: JSON.stringify({message: "The item was deleted successfully"}),
    };

    callback(null, response);
  } catch (err) {

    const response = {
      statusCode: 400,
      body: JSON.stringify({message: "An error occured while trying to delete the item.", error: err}),
    };
    callback(null, response);
  }
}
