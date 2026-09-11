# frozen_string_literal: true

require "test_helper"

class UsersTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(
      username: 'system_user',
      email: 'system_user@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
  end

  test "show profile via friendly_id access" do
    user = User.create!(username: 'friendly_user', email: 'friendly@example.com', password: 'password123', password_confirmation: 'password123')
    visit user_path(user.username)
    assert_text "@#{user.username}"
  end

  test "infinite scroll on user profile is working" do
    # Create 26 posts for this user (enough for 2 pages)
    26.times do |i|
      Post.create!(
        user: @user,
        title: "User Post #{i}",
        body: "Body #{i}",
        published: true,
        published_at: Time.current,
        tags: 'abillyz'
      )
    end


    visit user_path(@user.username)

    # Trigger first load by scrolling to the lazy-load frame
    page.execute_script "document.getElementById('load-more')?.scrollIntoView()"
    assert_selector '#posts article', count: 25, wait: 10

    # Repeatedly scroll and wait for more posts until marker appears
    max_attempts = 5
    attempts = 0
    until page.has_selector?('[data-test-id="load-more-fullfil"]', wait: 2) && attempts < max_attempts
      page.execute_script 'window.scrollTo(0, document.body.scrollHeight)'
      begin
        assert_selector '#posts article', count: 26, wait: 5
      rescue Capybara::ExpectationNotMet
        # It's okay if it doesn't reach 30 yet
      end
      attempts += 1
    end

    assert_selector '[data-test-id="load-more-fullfil"]', wait: 10
    assert_selector '#posts article', minimum: 26, wait: 10
  end

  test "edit profile success by current user" do
    sign_in_with_ui @user
    navigate_profile
    edit_profile('a' * 255)
    assert @user.reload.icon.attached?
    assert @user.reload.banner.attached?
    assert_equal 'a' * 255, @user.bio
  end

  test "edit profile fail by other user" do
    other_user = users(:admin)
    sign_in_with_ui @user
    visit edit_user_path(other_user)
    assert_current_path '/'
  end

  private

  def navigate_profile
    visit root_path
    find('[data-test-id="account-ready"]').click
    click_on 'profile'
  end

  def edit_profile(bio)
    click_on 'edit'
    attach_file 'user[banner]', Rails.root.join('test/fixtures/images/dummy.png').to_s, make_visible: true
    attach_file 'user[icon]', Rails.root.join('test/fixtures/images/dummy.png').to_s, make_visible: true
    fill_in 'user[bio]', with: bio
    click_on 'submit'
    assert_selector '[data-test-id="flash-notice"]'
  end
end
