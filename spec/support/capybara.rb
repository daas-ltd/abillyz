# frozen_string_literal: true

Capybara.configure do |config|
  config.default_max_wait_time = 5
  config.server = :puma, { Silent: true }
  config.test_id = 'data-test-id'
end

Capybara.register_driver :driver do |app|
  options = Selenium::WebDriver::Chrome::Options.new

  options.add_argument('--headless')
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-dev-shm-usage')
  options.add_argument('--window-size=1024,800')

  download_pref = {
    prompt_for_download: false,
    default_directory: DownloadHelper.path,
    directory_upgrade: true
  }
  options.add_preference(:download, download_pref)
  Capybara::Selenium::Driver.new(app, browser: :chrome, options:)
end

RSpec.configure do |config|
  config.before(:each, type: :system) do
    driven_by :driver

    width = 1280
    height = 1000
    page.driver.browser.manage.window.resize_to(width, height)
  end

  config.before(:each, :head, type: :system) do
    driven_by(:selenium_chrome)

    width = 1280
    height = 1000
    page.driver.browser.manage.window.resize_to(width, height)
  end
end
