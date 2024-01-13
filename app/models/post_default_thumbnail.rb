# frozen_string_literal: true

class PostDefaultThumbnail < ApplicationRecord
  has_one_attached :image do |attachable|
    attachable.variant :webp, format: :webp
  end

  def self.images
    all.with_attached_image
  end
end
