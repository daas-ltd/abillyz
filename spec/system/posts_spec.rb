# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Posts' do
  let(:user) { create(:user) }
  let(:post) { create(:post) }

  describe 'authz' do
    context 'when published true post' do
      it 'is visible' do
        post = create(:post, published: true)

        sign_in user
        visit root_path
        expect(page).to have_css "#post_#{post.id}"
      end
    end

    context 'when published false post' do
      it 'is invisible' do
        create(:post, published: false)

        sign_in user
        visit root_path
        expect(page).to have_no_css "#post_#{post.id}"
      end
    end
  end

  describe 'create post' do
    context 'when valid title, body' do
      it 'is success' do
        sign_in user
        expect do
          create_post('sample title', 'sample body')
        end.to change(Post, :count).by(1)
      end
    end

    context 'when valid thumbnail' do
      it 'is success' do
        sign_in user
        expect do
          create_post('sample title', 'sample body', thumbnail: true)
        end.to change(Post, :count).by(1)
        expect(Post.last.thumbnail.attached?).to be true
      end
    end

    context 'when missing title' do
      it 'is fail' do
        sign_in user
        expect do
          create_post('', 'sample body')
        end.not_to change(Post, :count)
      end
    end

    context 'when not logged in' do
      it 'is fail' do
        visit new_user_post_path(user)
        expect(page).to have_current_path '/users/sign_in'
      end
    end
  end

  describe 'update post' do
    context 'when current_user post' do
      it 'is success' do
        sign_in post.user
        update_post('updated title', 'updated body')
        expect(post.reload.title).to eq 'updated title'
      end
    end

    context 'when not logged in' do
      it 'is fail' do
        visit edit_user_post_path(post.user, post)
        expect(page).to have_current_path '/users/sign_in'
      end
    end

    context 'when other user post' do
      it 'is fail' do
        sign_in user
        visit edit_user_post_path(post.user, post)
        expect(page).to have_current_path '/'
      end
    end
  end

  describe 'delete post' do
    context 'when current_user post' do
      it 'is success' do
        Capybara.current_driver = :rack_test

        sign_in post.user
        expect do
          page.driver.submit :delete, user_post_path(post.user, post), {}
        end.to change(Post, :count).by(-1)
      end
    end

    context 'when other user post' do
      it 'is fail' do
        Capybara.current_driver = :rack_test

        sign_in user
        post
        expect do
          page.driver.submit :delete, user_post_path(post.user, post), {}
        end.not_to change(Post, :count)
      end
    end
  end

  describe 'preview markdown' do
    it 'markdown to html is valid' do
      sign_in user
      visit new_user_post_path(user)
      first('.cm-content').send_keys '# sample heading'
      shadow = find_by_id('preview')
      expect(page).to have_css '[data-test-id="code"][data-editor-status="sync"]'
      expect(shadow.shadow_root.text).to have_content 'sample heading'
    end
  end

  def fill_post(title, body, published, thumbnail)
    fill_in 'post[title]', with: title
    first('.cm-content').send_keys body
    choose "post_published_#{published}"
    if thumbnail
      attach_file 'post[thumbnail]', Rails.root.join('spec/fixtures/images/dummy.png').to_s,
                  make_visible: true
    end

    expect(page).to have_css '[data-test-id="code"][data-editor-status="sync"]'
    click_on 'submit'
  end

  def create_post(title, body, published: true, thumbnail: false)
    visit new_user_post_path(user)
    fill_post(title, body, published, thumbnail)
    expect(page).to have_css '[data-test-id="flash-message"]'
  end

  def update_post(title, body, published: true)
    visit edit_user_post_path(user, post)
    fill_post(title, body, published, false)
    expect(page).to have_css '[data-test-id="flash-message"]'
  end

  def delete_post(post)
    visit root_path
    click_on post.title
    page.accept_confirm do
      click_on 'delete-post'
    end
    expect(page).to have_css '[data-test-id="flash-message"]'
  end
end
