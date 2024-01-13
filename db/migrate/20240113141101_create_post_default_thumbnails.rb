# frozen_string_literal: true

class CreatePostDefaultThumbnails < ActiveRecord::Migration[7.1]
  def change
    create_table :post_default_thumbnails, &:timestamps
  end
end
