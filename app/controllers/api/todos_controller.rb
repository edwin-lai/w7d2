class Api::TodosController < ApplicationController
  def to_bool(string)
    return false if string == "false"
    return true if string == "true"
  end

  def index
    render json: Todo.all
  end

  def create
    todo = Todo.create!(
      title: params['title'],
      body: params['body'],
      done: to_bool(params['done'])
    )
    render json: todo
  end

  def update
    todo = Todo.find_by_id(params['id'])
    todo.update!(
      title: params['title'],
      body: params['body'],
      done: to_bool(params['done'])
    )
    render json: todo
  end

  def destroy
    todo = Todo.find_by_id(params['id'])
    todo.destroy!
    render json: Todo.all
  end
end
