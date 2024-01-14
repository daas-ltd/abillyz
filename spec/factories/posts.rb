# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    user
    title { 'Sample Title' }
    body { 'Sample Body' }
    published { true }
    published_at { nil }
    tags { 'abillyz myblog' }

    after(:build) do
      FactoryBot.create(:post_default_thumbnail) if PostDefaultThumbnail.all.empty?
    end
  end
end
