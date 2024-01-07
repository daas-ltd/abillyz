# frozen_string_literal: true

FactoryBot.define do
  factory :post do
    user
    title { 'Sample Title' }
    body { 'Sample Body' }
    published { false }
    published_at { nil }
  end
end
