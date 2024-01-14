# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Post do
  it 'has a valid factory' do
    expect(build(:post)).to be_valid
  end

  it { is_expected.to validate_presence_of :title }
  it { is_expected.to validate_presence_of :body }
  it { is_expected.to validate_length_of(:title).is_at_most(255) }

  describe 'validation' do
    context 'when with single tags' do
      it 'is valid' do
        expect(build(:post, tags: 'abillyz')).to be_valid
      end
    end

    context 'when with missing tags' do
      it 'is invalid' do
        expect(build(:post, tags: '')).not_to be_valid
      end
    end

    context 'when with 5 tags' do
      it 'is valid' do
        expect(build(:post, tags: 'a b c d e')).to be_valid
      end
    end

    context 'when with 6 tags' do
      it 'is invalid' do
        expect(build(:post, tags: 'a b c d e f')).not_to be_valid
      end
    end
  end

  describe 'tag relations' do
    context 'when 1 tag' do
      it 'is 1 relation' do
        expect(create(:post, tags: 'aa').tags.count).to eq 1
      end
    end

    context 'when 5 tags' do
      it 'is 5 relations' do
        expect(create(:post, tags: 'aa bb cc dd ee').tags.count).to eq 5
      end
    end
  end
end
