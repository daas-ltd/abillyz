# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Users::Setting do
  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end
end
