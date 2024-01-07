# frozen_string_literal: true

class PostsController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource

  def index
    @posts = Post.accessible_by(current_ability)
  end

  def show; end

  def new
    @post = current_user.posts.build
  end

  def edit; end

  def create
    @post = current_user.posts.build(post_params)

    if @post.save
      redirect_to @post, notice: t('.notice')
    else
      render :new, status: :unprocessable_entity
    end
  end

  def update
    if @post.update(post_params)
      redirect_to @post, notice: t('.notice'), status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @post.destroy!
    redirect_to root_url, notice: t('.notice'), status: :see_other
  end

  private

  def post_params
    params.require(:post).permit(:title, :body, :published)
  end
end
