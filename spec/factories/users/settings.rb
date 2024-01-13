# frozen_string_literal: true

FactoryBot.define do
  factory :users_setting, class: 'Users::Setting' do
    user
    keymap { 0 }
    line_wrapping { true }
  end
end
