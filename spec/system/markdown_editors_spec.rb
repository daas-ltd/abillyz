# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'MarkdownEditors' do
  let(:post) { create(:post, published: false) }

  describe 'Toolbar' do
    it 'undo / redo button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys '1st line', :enter
      sleep 0.5
      first('.cm-content').send_keys '2nd line'
      click_on 'undo-button'
      expect(page).to have_content '1st line'
      expect(page).to have_no_content '2nd line'
    end

    it 'bold button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys 'sample', [:control, 'a']
      click_on 'bold-button'
      expect(page).to have_content '**sample**'
    end

    it 'italic button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys 'sample', [:control, 'a']
      click_on 'italic-button'
      expect(page).to have_content '_sample_'
    end

    it 'strikethrough button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys 'sample', [:control, 'a']
      click_on 'strikethrough-button'
      expect(page).to have_content '~~sample~~'
    end

    it 'quote button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys 'sample', [:control, 'a']
      click_on 'quote-button'
      expect(page).to have_content '> sample'
    end

    it 'link button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys 'sample', [:control, 'a']
      click_on 'link-button'
      expect(page).to have_content '[sample]()'
    end

    it 'code button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      first('.cm-content').send_keys 'sample', [:control, 'a']
      click_on 'code-button'
      expect(page).to have_content "```\nsample\n```"
    end

    it 'image button is work' do
      sign_in post.user
      visit edit_user_post_path(post.user, post)
      attach_file 'markdown-image', Rails.root.join('spec/fixtures/images/dummy.png').to_s, make_visible: true
      image_path = Rails.application.routes.url_helpers.rails_blob_path(post.images.last, only_path: true)
      expect(page).to have_content "![](#{image_path})"
    end
  end
end
