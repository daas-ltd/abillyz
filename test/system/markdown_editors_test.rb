# frozen_string_literal: true

require "test_helper"

class MarkdownEditorsTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(
      username: 'editor_user',
      email: 'editor_user@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
  end

  test "toolbar undo / redo button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys '1st line', :enter
    sleep 0.5
    first('.cm-content').send_keys '2nd line'
    click_on 'undo-button'
    assert_text '1st line'
    assert_no_text '2nd line'
  end

  test "toolbar bold button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys 'sample', [:control, 'a']
    click_on 'bold-button'
    assert_text '**sample**'
  end

  test "toolbar italic button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys 'sample', [:control, 'a']
    click_on 'italic-button'
    assert_text '_sample_'
  end

  test "toolbar strikethrough button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys 'sample', [:control, 'a']
    click_on 'strikethrough-button'
    assert_text '~~sample~~'
  end

  test "toolbar quote button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys 'sample', [:control, 'a']
    click_on 'quote-button'
    assert_text '> sample'
  end

  test "toolbar link button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys 'sample', [:control, 'a']
    click_on 'link-button'
    assert_text '[sample]()'
  end

  test "toolbar code button is work" do
    sign_in_with_ui @user
    visit new_user_post_path(@user)
    first('.cm-content').send_keys 'sample', [:control, 'a']
    click_on 'code-button'
    assert_text "```\nsample\n```"
  end
end
