# frozen_string_literal: true

class TopPagesController < ApplicationController
  def index
    @posts = Post.accessible_by(current_ability)
  end
end
