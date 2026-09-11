# frozen_string_literal: true

require "test_helper"

class UsersSettingsTest < ApplicationSystemTestCase
  setup do
    @user = User.create!(
      username: 'settings_user',
      email: 'settings_user@example.com',
      password: 'password123',
      password_confirmation: 'password123'
    )
  end

  test "modify keybind to vim success" do
    sign_in_with_ui @user
    open_settings
    select 'Vim', from: 'setting[keybind]'
    click_on 'submit'
    assert_selector '[data-test-id="flash-notice"]'
    assert_equal 'vim', @user.setting.reload.keybind
  end

  test "modify keybind to vscode success" do
    sign_in_with_ui @user
    open_settings
    select 'Visual Studio Code', from: 'setting[keybind]'
    click_on 'submit'
    assert_selector '[data-test-id="flash-notice"]'
    assert_equal 'vscode', @user.setting.reload.keybind
  end

  test "modify keybind to emacs success" do
    sign_in_with_ui @user
    open_settings
    select 'Emacs', from: 'setting[keybind]'
    click_on 'submit'
    assert_selector '[data-test-id="flash-notice"]'
    assert_equal 'emacs', @user.setting.reload.keybind
  end

  private

  def open_settings
    visit root_path
    find('[data-test-id="account-ready"]').click
    click_on 'settings'
  end
end
