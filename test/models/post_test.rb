# frozen_string_literal: true

require "test_helper"

class PostTest < ActiveSupport::TestCase
  test "should be valid with default attributes" do
    post = Post.new(
      user: users(:one),
      title: 'Sample Title',
      body: 'Sample Body',
      tags: 'abillyz'
    )
    assert post.valid?
  end

  test "should validate presence of title" do
    post = posts(:one)
    post.title = nil
    assert_not post.valid?
    assert post.errors[:title].present?
  end

  test "should validate presence of body" do
    post = posts(:one)
    post.body = nil
    assert_not post.valid?
    assert post.errors[:body].present?
  end

  test "should validate length of title is at most 255" do
    post = posts(:one)
    post.title = 'a' * 256
    assert_not post.valid?
    assert post.errors[:title].present?
  end

  test "should be valid with single tag" do
    post = Post.new(user: users(:one), title: 'T', body: 'B', tags: 'abillyz')
    assert post.valid?
  end

  test "should be invalid with missing tags" do
    post = Post.new(user: users(:one), title: 'T', body: 'B', tags: '')
    assert_not post.valid?
  end

  test "should be valid with 5 tags" do
    post = Post.new(user: users(:one), title: 'T', body: 'B', tags: 'a b c d e')
    assert post.valid?
  end

  test "should be invalid with 6 tags" do
    post = Post.new(user: users(:one), title: 'T', body: 'B', tags: 'a b c d e f')
    assert_not post.valid?
  end

  test "should have 1 relation when 1 tag is provided" do
    post = Post.create!(user: users(:one), title: 'T', body: 'B', tags: 'aa')
    assert_equal 1, post.tags.count
  end

  test "should have 5 relations when 5 tags are provided" do
    post = Post.create!(user: users(:one), title: 'T', body: 'B', tags: 'aa bb cc dd ee')
    assert_equal 5, post.tags.count
  end
end
