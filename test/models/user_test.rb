# frozen_string_literal: true

require "test_helper"

class UserTest < ActiveSupport::TestCase
  test "should be valid with default attributes" do
    user = User.new(
      username: 'validuser',
      email: 'valid@example.com',
      password: 'password'
    )
    assert user.valid?
  end

  test "should validate presence of username" do
    user = users(:one)
    user.username = nil
    assert_not user.valid?
    assert user.errors[:username].present?
  end

  test "should validate uniqueness of username case-insensitively" do
    user = users(:one)
    duplicate = User.new(username: user.username.upcase, email: 'other@example.com', password: 'password')
    assert_not duplicate.valid?
    assert duplicate.errors[:username].present?
  end

  test "should validate presence of email" do
    user = users(:one)
    user.email = nil
    assert_not user.valid?
    assert user.errors[:email].present?
  end

  test "should validate uniqueness of email case-insensitively" do
    user = users(:one)
    duplicate = User.new(username: 'other', email: user.email.upcase, password: 'password')
    assert_not duplicate.valid?
    assert duplicate.errors[:email].present?
  end

  test "should allow valid email alias" do
    user = users(:one)
    user.email = 'test+1@abillyz.com'
    assert user.valid?
  end

  test "should not allow invalid email IDN" do
    user = users(:one)
    user.email = 'test@あびー.com'
    assert_not user.valid?
  end

  test "should not allow reserved username: test" do
    user = users(:one)
    user.username = 'test'
    assert_not user.valid?
  end

  test "should not allow reserved username: admin" do
    user = users(:one)
    user.username = 'admin'
    assert_not user.valid?
  end

  test "should not allow reserved username: sign_in" do
    user = users(:one)
    user.username = 'sign_in'
    assert_not user.valid?
  end
end
