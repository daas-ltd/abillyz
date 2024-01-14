# frozen_string_literal: true

class Tag < ApplicationRecord
  validates :name, presence: true,
                   length: { maximum: 16 }

  has_many :tagmaps, dependent: :destroy
  has_many :posts, through: :tagmaps
end
