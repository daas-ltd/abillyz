# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PostDefaultThumbnail do
  it 'has a valid factory' do
    expect(build(:post_default_thumbnail)).to be_valid
  end
end
