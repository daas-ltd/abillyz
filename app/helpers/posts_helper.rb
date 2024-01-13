# frozen_string_literal: true

module PostsHelper
  def thumbnails
    Rails.cache.fetch('post_default_thumbnail/images', expires_in: 12.hours) do
      PostDefaultThumbnail.images
    end
  end
end
