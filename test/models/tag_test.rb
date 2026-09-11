# frozen_string_literal: true

require "test_helper"

class TagTest < ActiveSupport::TestCase
  test "should be valid with default attributes" do
    tag = Tag.new(name: 'validtag')
    assert tag.valid?
  end

  test "should validate presence of name" do
    tag = tags(:abillyz)
    tag.name = nil
    assert_not tag.valid?
    assert tag.errors[:name].present?
  end

  test "should validate length of name is at most 16" do
    tag = tags(:abillyz)
    tag.name = 'a' * 17
    assert_not tag.valid?
    assert tag.errors[:name].present?
  end
end
