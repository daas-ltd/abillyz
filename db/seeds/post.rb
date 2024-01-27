# frozen_string_literal: true

200.times do |n|
  tag = "sample-#{(Array('A'..'Z') + Array('a'..'z')).sample}"
  Post.create(
    user: User.first,
    title: Faker::Coffee.blend_name,
    body: Faker::Markdown.emphasis,
    published: n.even?,
    tags: "abillyz #{tag}"
  )
end
