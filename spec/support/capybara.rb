# frozen_string_literal: true

Capybara.configure do |config|
  config.default_max_wait_time = 5
  config.server = :puma, { Silent: true }
  config.test_id = 'data-test-id'
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :playwright
  end

  config.before(:each, :head, type: :system) do
    driven_by(:playwright, options: { headless: false })
  end
end
