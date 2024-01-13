# frozen_string_literal: true

module Users
  class SettingsController < ApplicationController
    before_action :authenticate_user!

    def edit; end

    def update
      setting = Users::Setting.find_or_initialize_by(user: current_user)
      if setting.update(users_setting_params)
        flash.now[:notice] = t('.notice')
        turbo_stream
      else
        render :edit, status: :unprocessable_entity
      end
    end

    private

    def users_setting_params
      params.require(:setting).permit(:keymap, :line_wrapping)
    end
  end
end
