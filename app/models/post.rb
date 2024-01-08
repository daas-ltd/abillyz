# frozen_string_literal: true

class Post < ApplicationRecord
  before_create :set_published_at
  belongs_to :user

  has_one_attached :thumbnail

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true

  scope :published, -> { where(published: true) }

  private

  def set_published_at
    self.published_at = DateTime.current if published_at.nil? && published == true
  end
end
