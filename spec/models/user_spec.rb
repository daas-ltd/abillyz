# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User do
  it 'has a valid factory' do
    expect(build(:user)).to be_valid
  end

  describe 'validation' do
    it { is_expected.to validate_presence_of :username }
    it { is_expected.to validate_uniqueness_of(:username).case_insensitive }
    it { is_expected.to validate_presence_of :email }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }

    it 'valid email alias' do
      expect(build(:user, email: 'test+1@abillyz.com')).to be_valid
    end

    it 'invalid email IDN' do
      expect(build(:user, email: 'test@あびー.com')).not_to be_valid
    end
  end
end
