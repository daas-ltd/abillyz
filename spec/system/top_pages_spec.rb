# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'TopPages' do
  describe 'infinite scroll' do
    it 'is working' do
      create_list(:post, 26, published: true)

      visit root_path
      expect(page.all('#posts article').count).to eq 25

      page.execute_script 'window.scrollBy(0,10000)'
      expect(page).to have_css '[data-test-id="load-more-fullfil"]'
      expect(page.all('#posts article').count).to eq 26
    end
  end
end
