# frozen_string_literal: true

require "test_helper"

class TopPagesTest < ApplicationSystemTestCase
  test "infinite scroll is working" do
    visit root_path

    # Trigger first load by scrolling to the lazy-load frame
    page.execute_script "document.getElementById('load-more')?.scrollIntoView()"
    assert_selector '#posts article', count: 25, wait: 10

    # Repeatedly scroll and wait for more posts until marker appears
    max_attempts = 5
    attempts = 0
    until page.has_selector?('[data-test-id="load-more-fullfil"]', wait: 2) && attempts < max_attempts
      page.execute_script 'window.scrollTo(0, document.body.scrollHeight)'
      # Wait for the count to increase or marker to appear
      begin
        assert_selector '#posts article', minimum: 26, wait: 5
      rescue Capybara::ExpectationNotMet
      end
      attempts += 1
    end

    assert_selector '[data-test-id="load-more-fullfil"]', wait: 10
    assert_selector '#posts article', minimum: 26, wait: 10
  end
end
