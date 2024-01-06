# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Authentications' do
  describe 'Sign up' do
    it 'is valid username, email, password' do
      visit root_path
      click_on 'signin'
      click_on 'signup-link'
      fill_in 'user[username]', with: 'abillyz'
      fill_in 'user[email]', with: 'abillyz@example.com'
      fill_in 'user[password]', with: 'password'
      fill_in 'user[password_confirmation]', with: 'password'
      click_on 'submit'
      expect(page).to have_css '[data-test-id="signout"]'
    end
  end
end
