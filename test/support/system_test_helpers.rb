# frozen_string_literal: true

module SystemTestHelpers
  def sign_in_with_ui(user)
    visit root_path
    find('[data-test-id="signin"]').click
    fill_in 'user[login]', with: user.username
    fill_in 'user[password]', with: 'password123'
    find('[data-test-id="submit"]').click
    unless page.has_selector?('[data-test-id="account-ready"]', wait: 5)
      puts "Sign-in failed for #{user.username}. Current path: #{current_path}"
      puts "Flash messages: #{page.all('.flash').map(&:text).join(', ')}"
      puts "Page content: #{page.body[0..1000]}"
    end
  end

  def fill_post(title, body, tags, published, thumbnail)
    begin
      fill_in 'post[title]', with: title
    rescue Capybara::ElementNotFound => e
      puts "DEBUG: Could not find post[title]. Page HTML: #{page.body}"
      raise e
    end

    # Tags field
    begin
      fill_in 'post[tags]', with: tags
    rescue Capybara::ElementNotFound
      find('input.form-input-text', match: :first, text: /tags/i).set(tags) rescue nil
    end

    # Body is handled by CodeMirror, so we need to interact with the editor
    # Since we are in a test, we can try to set it via JS or find the element
    find('.cm-content').send_keys body rescue nil

    # Use JS click to avoid ElementClickInterceptedError if the element is covered
    page.execute_script("document.getElementById('post_published_#{published}').click()")
    if thumbnail
      attach_file 'post[thumbnail]', Rails.root.join('test/fixtures/images/dummy.png').to_s,
                  make_visible: true
    end

    # Wait for CodeMirror sync if applicable
    find('[data-test-id="code"][data-editor-status="sync"]')
    click_on 'submit'
  end

  def create_post(user, title: 'title', body: 'body', tags: 'abillyz myblog', published: true, thumbnail: false)
    visit new_user_post_path(user)
    fill_post(title, body, tags, published, thumbnail)
    assert_selector '[data-test-id="flash-message"]'
  end

  def update_post(user, post, title: 'updated title', body: 'body', tags: 'abillyz myblog', published: true)
    visit edit_user_post_path(user, post)
    fill_post(title, body, tags, published, false)
    assert_selector '[data-test-id="flash-message"]'
  end

  def delete_post(user, post)
    visit root_path
    click_on post.title
    accept_confirm do
      click_on 'delete-post'
    end
    assert_selector '[data-test-id="flash-message"]'
  end
end
