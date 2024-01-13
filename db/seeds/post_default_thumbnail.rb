# frozen_string_literal: true

DIRECTORY = Rails.root.join('db/seeds/images/')

Dir.foreach(DIRECTORY) do |image|
  next if (image == '.') || (image == '..')

  thumbnail = PostDefaultThumbnail.create
  thumbnail.image.attach(io: File.open(DIRECTORY + image), filename: image)
end
