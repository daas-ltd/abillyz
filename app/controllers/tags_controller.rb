# frozen_string_literal: true

class TagsController < ApplicationController
  load_and_authorize_resource

  def show
    @posts = @tag.posts.accessible_by(current_ability).order(published_at: :desc)
  end
end
