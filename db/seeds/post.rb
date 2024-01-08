# frozen_string_literal: true

50.times do |n|
  post = Post.create(
    user: User.first,
    title: Faker::Coffee.blend_name,
    body: Faker::Markdown.emphasis,
    published: n.even?
  )

  next if n < 40

  post.thumbnail.attach(
    io: File.open('spec/fixtures/images/dummy.png'),
    filename: 'dummy'
  )
end
