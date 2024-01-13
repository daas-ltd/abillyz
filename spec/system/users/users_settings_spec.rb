# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users::Settings' do
  let(:user) { create(:user) }

  describe 'modify keymap' do
    context 'when setting to vim' do
      it 'is sucess' do
        sign_in user
        open_settings
        select 'Vim', from: 'setting[keymap]'
        click_on 'submit'
        expect(page).to have_css '[data-test-id="flash-notice"]'
        expect(user.setting.reload.keymap).to eq 'vim'
      end
    end
  end

  def open_settings
    visit root_path
    click_on 'account'
    click_on 'settings'
  end
end
