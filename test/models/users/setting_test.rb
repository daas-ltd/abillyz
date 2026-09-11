# frozen_string_literal: true

require "test_helper"

class UsersSettingTest < ActiveSupport::TestCase
  test "should be valid with default attributes" do
    setting = Users::Setting.new(
      user: users(:one),
      keybind: 0,
      line_wrapping: true
    )
    assert setting.valid?
  end
end
