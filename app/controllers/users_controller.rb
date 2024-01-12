# frozen_string_literal: true

class UsersController < ApplicationController
  before_action :authenticate_user!
  load_and_authorize_resource :user

  def show; end

  def edit; end

  def update
    if @user.update(user_params)
      redirect_to @user, notice: t('.notice'), status: :see_other
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:bio, :banner, :icon)
  end
end
