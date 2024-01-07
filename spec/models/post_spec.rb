# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post do
  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end

  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :body }
  it { is_expected.to validate_length_of(:title).is_at_most(255) }
end
