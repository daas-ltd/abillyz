# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Authentications' do
  describe 'Signup' do
    it 'is valid username, email, password' do
      signup('user', 'test@example.com', 'password')
      expect(page).to have_css '[data-test-id="account"]'
    end

    it 'is missing username' do
      signup('', 'test@example.com', 'password')
      expect(page).to have_no_css '[data-test-id="account"]'
    end

    it 'is missing email' do
      signup('user', '', 'password')
      expect(page).to have_no_css '[data-test-id="account"]'
    end

    it 'is missing password' do
      signup('user', 'test@example.com', '')
      expect(page).to have_no_css '[data-test-id="account"]'
    end
  end

  describe 'Signin' do
    let(:user) { create(:user) }

    it 'is valid username, password' do
      signin(user.username, user.password)
      expect(page).to have_css '[data-test-id="account"]'
    end

    it 'is valid email, password' do
      signin(user.email, user.password)
      expect(page).to have_css '[data-test-id="account"]'
    end

    it 'is missing login' do
      signin('', user.password)
      expect(page).to have_no_css '[data-test-id="account"]'
    end

    it 'is missing password' do
      signin(user.email, '')
      expect(page).to have_no_css '[data-test-id="account"]'
    end
  end

  def signup(username, email, password)
    visit root_path
    click_on 'signin'
    click_on 'signup-link'
    fill_in 'user[username]', with: username
    fill_in 'user[email]', with: email
    fill_in 'user[password]', with: password
    fill_in 'user[password_confirmation]', with: password
    click_on 'submit'
  end

  def signin(login, password)
    visit root_path
    click_on 'signin'
    fill_in 'user[login]', with: login
    fill_in 'user[password]', with: password
    click_on 'submit'
  end
end
