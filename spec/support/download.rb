# frozen_string_literal: true

# 参考:https://stackoverflow.com/questions/15739423/downloading-file-to-specific-folder-using-capybara-and-poltergeist-driver

module DownloadHelper
  TIMEOUT = 10
  PATH = Rails.root.join('tmp/downloads').to_s.freeze

  class << self
    def path
      File.join(PATH, Thread.current.object_id.to_s)
    end

    def downloads
      Dir[File.join(path, '*')]
    end

    def downloaded?
      downloads.grep(/\.crdownload$/).none? && downloads.any?
    end

    def wait_for_download
      Timeout.timeout(TIMEOUT) do
        sleep 0.1 until downloaded?
      end
    end

    def clear_downloads
      FileUtils.rm_f(downloads)
    end
  end
end
