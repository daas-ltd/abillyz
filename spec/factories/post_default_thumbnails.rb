# frozen_string_literal: true

FactoryBot.define do
  factory :post_default_thumbnail do
    after(:build) do |thumbnail|
      path = Rails.root.join('db/seeds/images/autumn.jpeg')
      thumbnail.image.attach(io: File.open(path), filename: 'sample')
    end
  end
end
