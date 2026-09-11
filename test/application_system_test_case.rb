require "test_helper"

Dir[Rails.root.join("test/support/**/*.rb")].each { |f| require f }

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  self.use_transactional_tests = false

  include Devise::Test::IntegrationHelpers
  include SystemTestHelpers




  driven_by :remote_chromium, screen_size: [ 1280, 720 ]

  def take_screenshot(*args)
    # Disable screenshots to avoid timeouts in the test environment
  end

  def setup
    super
    # Capybara.app_host = "http://#{IPSocket.getaddress(Socket.gethostname)}:#{Capybara.server_port}"
    # page.driver.browser.manage.window.resize_to(1280, 720)
  end
end
