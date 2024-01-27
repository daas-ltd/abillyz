# frozen_string_literal: true

module TopPages
  class PostsController < ApplicationController
    def index
      @posts = Post.accessible_by(current_ability)
                   .published
                   .order(published_at: :desc)
                   .page(page)
                   .includes(:tags)
                   .with_attached_thumbnail

      turbo_stream
    end
  end
end
