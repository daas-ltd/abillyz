# frozen_string_literal: true

class Post < ApplicationRecord
  belongs_to :user

  has_one_attached :thumbnail

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true
end
