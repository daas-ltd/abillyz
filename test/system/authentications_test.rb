# frozen_string_literal: true

require "test_helper"

class AuthenticationsTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(
      username: 'testuser',
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
  end

  test "signup is valid username, email, password" do
    signup('example_user', 'unique_signup@example.com', 'password')
    assert_selector '[data-test-id="account-ready"]'
  end

  test "signup is missing username" do
    signup('', 'test@example.com', 'password')
    assert_no_selector '[data-test-id="account-ready"]'
  end

  test "signup is missing email" do
    signup('example_user', '', 'password')
    assert_no_selector '[data-test-id="account-ready"]'
  end

  test "signup is missing password" do
    signup('example_user', 'test@example.com', '')
    assert_no_selector '[data-test-id="account-ready"]'
  end

  test "signin is valid username, password" do
    signin(@user.username, 'password123')
    assert_text 'ログインしました。'
    assert_selector '[data-test-id="new-post"]'
    assert_selector '[data-test-id="account-ready"]'
  end

  test "signin is valid email, password" do
    signin(@user.email, 'password123')
    assert_selector '[data-test-id="account-ready"]'
  end

  test "signin is missing login" do
    user = users(:one)
    signin('', user.password)
    assert_no_selector '[data-test-id="account-ready"]'
  end

  test "signin is missing password" do
    user = users(:one)
    signin(user.email, '')
    assert_no_selector '[data-test-id="account-ready"]'
  end

  private

  def signup(username, email, password)
    visit root_path
    find('[data-test-id="signin"]').click
    click_on 'signup-link'
    fill_in 'user[username]', with: username
    fill_in 'user[email]', with: email
    fill_in 'user[password]', with: password
    fill_in 'user[password_confirmation]', with: password
    find('[data-test-id="submit"]').click
  end

  def signin(login, password)
    visit root_path
    find('[data-test-id="signin"]').click
    fill_in 'user[login]', with: login
    fill_in 'user[password]', with: password
    find('[data-test-id="submit"]').click
    # Debugging: print all buttons on the page
    unless page.has_selector?('[data-test-id="account-ready"]', wait: 2)
      puts "Sign-in failed for #{login}. Current path: #{current_path}"
      puts "Buttons found: #{all('button').map(&:text).join(', ')}"
    end
  end
end
