# frozen_string_literal: true

module Posts
  class ImagesController < ApplicationController
    before_action :authenticate_user!
    load_and_authorize_resource :post

    def create
      @post.images.attach(image_params[:image])
      render json: {
        path: rails_blob_path(@post.images.last)
      }
    end

    private

    def image_params
      params.require(:post).permit(:image)
    end
  end
end
