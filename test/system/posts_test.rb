# frozen_string_literal: true

require "test_helper"

class PostsTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(
      username: 'post_user',
      email: 'post_user@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
    @post = posts(:one)
    @post.update_columns(user_id: @user.id)
  end

  test "published post is visible" do
    sign_in @user
    visit root_path
    assert_selector "#post_#{@post.id}"
  end

  test "unpublished post is invisible" do
    # We need a specifically unpublished post for this
    # Since fixtures are static, we might need to create one or use a specific fixture
    # For now, let's assume posts(:two) is unpublished as per our fixtures.yml
    sign_in @user
    visit root_path
    assert_no_selector "#post_#{posts(:two).id}"
  end

  test "create post success" do
    sign_in @user
    assert_difference 'Post.count', 1 do
      create_post(@user)
    end
  end

  test "create post with valid thumbnail success" do
    sign_in @user
    assert_difference 'Post.count', 1 do
      create_post(@user, thumbnail: true)
    end
    assert Post.last.thumbnail.attached?
  end

  test "create post fail when missing title" do
    sign_in @user
    assert_no_difference 'Post.count' do
      create_post(@user, title: '')
    end
  end

  test "create post fail when not logged in" do
    visit new_user_post_path(@user)
    assert_current_path '/users/sign_in'
  end

  test "update post success by current user" do
    sign_in @post.user
    update_post(@post.user, @post)
    assert_equal 'updated title', @post.reload.title
  end

  test "update post fail when not logged in" do
    visit edit_user_post_path(@post.user, @post)
    assert_current_path '/users/sign_in'
  end

  test "update post fail by other user" do
    other_user = User.create!(username: 'other', email: 'other@example.com', password: 'password123', password_confirmation: 'password123')
    sign_in other_user
    visit edit_user_post_path(@post.user, @post)
    assert_current_path '/'
  end

  test "delete post success by current user" do
    # Use rack_test for this specific test if needed, but Selenium should work too
    sign_in @post.user
    assert_difference 'Post.count', -1 do
      # We can't easily use page.driver.submit in SystemTestCase without switching drivers
      # Instead we use the helper method that uses Capybara interactions
      delete_post(@post.user, @post)
    end
  end

  test "delete post fail by other user" do
    other_user = User.create!(username: 'other_del', email: 'other_del@example.com', password: 'password123', password_confirmation: 'password123')
    sign_in other_user
    assert_no_difference 'Post.count' do
      delete_post(other_user, @post)
    end
  end

  test "markdown to html is valid" do
    sign_in @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys '# sample heading'

    # Selenium Shadow DOM access
    preview_text = nil
    begin
      Timeout.timeout(5) do
        loop do
          preview_text = page.evaluate_script("document.querySelector('#preview').shadowRoot ? document.querySelector('#preview').shadowRoot.textContent : null")
          break if preview_text && preview_text.include?('sample heading')
          sleep 0.1
        end
      end
    rescue Timeout::Error
      # keep the last value of preview_text for assertion
    end
    assert_includes preview_text || '', 'sample heading'

    assert_selector '[data-test-id="code"][data-editor-status="sync"]'
  end
end
