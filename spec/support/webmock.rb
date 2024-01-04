# frozen_string_literal: true

require 'webmock/rspec'

# Capybaraがローカルホストの通信を行うので、当該通信を許可する
WebMock.disable_net_connect!(allow_localhost: true,
                             allow: 'chromedriver.storage.googleapis.com')
