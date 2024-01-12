# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users' do
  let(:user) { create(:user) }

  describe 'edit profile' do
    context 'when current_user profile' do
      it 'is success' do
        sign_in user
        navigate_profile
        edit_profile('a' * 255)
        expect(user.reload.icon.attached?).to be true
        expect(user.banner.attached?).to be true
        expect(user.bio).to eq('a' * 255)
      end
    end

    context 'when other user profile' do
      let(:other_user) { create(:user) }

      it 'is fail' do
        sign_in user
        visit edit_user_path(other_user)
        expect(page).to have_current_path '/'
      end
    end
  end

  def navigate_profile
    visit root_path
    click_on 'account'
    click_on 'profile'
  end

  def edit_profile(bio)
    click_on 'edit'
    attach_file 'user[banner]', Rails.root.join('spec/fixtures/images/dummy.png').to_s, make_visible: true
    attach_file 'user[icon]', Rails.root.join('spec/fixtures/images/dummy.png').to_s, make_visible: true
    fill_in 'user[bio]', with: bio
    click_on 'submit'
    expect(page).to have_css '[data-test-id="flash-notice"]'
  end
end
