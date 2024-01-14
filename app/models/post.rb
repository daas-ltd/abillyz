# frozen_string_literal: true

class Post < ApplicationRecord
  MAX_TAGS = 5
  before_create :set_published_at
  belongs_to :user

  has_one_attached :thumbnail
  has_many :tagmaps, dependent: :destroy
  has_many :tags, through: :tagmaps

  validates :title, presence: true, length: { maximum: 255 }
  validates :body, presence: true
  validates :tags, presence: true
  validate :tag_count_check

  scope :published, -> { where(published: true) }

  # Convert string to Tag array, and Post to Tag relation
  def tags=(tags)
    tags = tags.split.map(&:strip) if tags.instance_of?(String)
    self.tags.clear
    tags.each do |tag|
      errors.add(:base, I18n.t('.tag_length'))
      self.tags << if tag.instance_of?(Tag)
                     tag
                   else
                     Tag.find_or_create_by(name: tag)
                   end
    end
  end

  private

  def tag_count_check
    errors.add(:base, I18n.t('activerecord.errors.post.tag_count_limit')) if tags.length > MAX_TAGS
  end

  def set_published_at
    self.published_at = DateTime.current if published_at.nil? && published == true
  end
end
