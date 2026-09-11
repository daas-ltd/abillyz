# frozen_string_literal: true

require_relative "../config/environment"
require "rails/test_help"
require "capybara/rails"
require "webmock"
require 'socket'

class ActiveSupport::TestCase
  fixtures :all

  include Devise::Test::IntegrationHelpers

  container_ip = Socket.ip_address_list.find { |ai| ai.ipv4? && !ai.ipv4_loopback? }&.ip_address || '127.0.0.1'

  # WebMockの設定: Pumaへの疎通（localhost, 127.0.0.1, 0.0.0.0）と Selenium Gridコンテナを許可
  # WebMock.disable_net_connect!(allow: [
  #   'localhost',
  #   '127.0.0.1',
  #   '0.0.0.0',
  #   container_ip,
  #   'selenium', # seleniumコンテナ名を許可
  #   'chromedriver.storage.googleapis.com'
  # ])
end

# Capybaraの設定
Capybara.configure do |config|
  config.default_max_wait_time = 20
  config.test_id = 'data-test-id'
end

Capybara.server = :puma, {
  threads: [4, 16],
  port: 3000 # Or let it be dynamic
}

# Dockerコンテナ（Selenium）からアクセスできるように0.0.0.0でバインド
Capybara.server_host = '0.0.0.0'

# Remote Selenium (別コンテナ) からこちらのRailsアプリへアクセスさせるためのホスト指定
container_ip = Socket.ip_address_list.find { |ai| ai.ipv4? && !ai.ipv4_loopback? }&.ip_address || '127.0.0.1'
Capybara.app_host = "http://#{container_ip}"

Capybara.register_driver :remote_chromium do |app|
  options = Selenium::WebDriver::Chrome::Options.new
  options.add_argument('--no-sandbox')
  options.add_argument('--disable-gpu')
  options.add_argument('--disable-dev-shm-usage')

  client = Selenium::WebDriver::Remote::Http::Default.new

  Capybara::Selenium::Driver.new(app,
    browser: :remote,
    url: 'http://selenium:4444/wd/hub',
    options: options,
    http_client: client
  )
end

require_relative "application_system_test_case"