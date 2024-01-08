# frozen_string_literal: true

User.find_or_create_by(email: 'user@exapmle.com') do |user|
  user.username = 'user'
  user.email = 'user@example.com'
  user.password = 'Pass1234'
end

2.times do |n|
  User.find_or_create_by(email: "user#{n}@exapmle.com") do |user|
    user.username = "user#{n}"
    user.email = "user#{n}@example.com"
    user.password = 'Pass1234'
  end
end
