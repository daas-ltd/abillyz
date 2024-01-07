# frozen_string_literal: true

class ApplicationController < ActionController::Base
  before_action :configure_permitted_parameters, if: :devise_controller?

  # Automatic addition of flash message in case of validation error.
  def render *args
    add_flash_message
    super
  end

  def add_flash_message
    return if flash.now.nil?

    instance_variables.each do |iv|
      var = instance_variable_get(iv)
      if var.class.ancestors.include?(ActiveRecord::Core) && flash.alert.blank?
        flash.now.alert = var.errors.full_messages
      end
    end
  end

  protected

  def configure_permitted_parameters
    added_attrs = %i[username email password password_confirmation remember_me]
    devise_parameter_sanitizer.permit :sign_up, keys: added_attrs
    devise_parameter_sanitizer.permit :sign_in, keys: %i[login password]
    devise_parameter_sanitizer.permit :account_update, keys: added_attrs
  end
end
