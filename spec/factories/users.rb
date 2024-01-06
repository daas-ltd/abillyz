# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:username) { |n| "test#{n}" }
    sequence(:email) { |n| "test#{n}@example.com" }
    password { 'password' }
    confirmed_at { DateTime.now }
  end
end
