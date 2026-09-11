# frozen_string_literal: true

require "test_helper"

class PostDefaultThumbnailTest < ActiveSupport::TestCase
  test "should be valid with attached image" do
    thumbnail = PostDefaultThumbnail.new
    path = Rails.root.join('db/seeds/images/autumn.jpeg')
    thumbnail.image.attach(io: File.open(path), filename: 'sample')
    assert thumbnail.valid?
  end
end
