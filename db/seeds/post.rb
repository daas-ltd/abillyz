# frozen_string_literal: true

50.times do |n|
  Post.create(
    user: User.first,
    title: Faker::Coffee.blend_name,
    body: Faker::Markdown.emphasis,
    published: n.even?
  )
end
