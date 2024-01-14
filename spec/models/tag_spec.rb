# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Tag do
  it 'has a valid factory' do
    expect(build(:tag)).to be_valid
  end

  it { is_expected.to validate_presence_of :name }
  it { is_expected.to validate_length_of(:name).is_at_most(16) }
end
