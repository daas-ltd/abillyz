# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'Users::Settings' do
  let(:user) { create(:user) }

  describe 'modify keybind' do
    context 'when setting to vim' do
      it 'is sucess' do
        sign_in user
        open_settings
        select 'Vim', from: 'setting[keybind]'
        click_on 'submit'
        expect(page).to have_css '[data-test-id="flash-notice"]'
        expect(user.setting.reload.keybind).to eq 'vim'
      end
    end

    context 'when setting to vscode' do
      it 'is sucess' do
        sign_in user
        open_settings
        select 'Visual Studio Code', from: 'setting[keybind]'
        click_on 'submit'
        expect(page).to have_css '[data-test-id="flash-notice"]'
        expect(user.setting.reload.keybind).to eq 'vscode'
      end
    end

    context 'when setting to emacs' do
      it 'is sucess' do
        sign_in user
        open_settings
        select 'Emacs', from: 'setting[keybind]'
        click_on 'submit'
        expect(page).to have_css '[data-test-id="flash-notice"]'
        expect(user.setting.reload.keybind).to eq 'emacs'
      end
    end
  end

  def open_settings
    visit root_path
    click_on 'account'
    click_on 'settings'
  end
end
