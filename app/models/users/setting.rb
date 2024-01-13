# frozen_string_literal: true

module Users
  class Setting < ApplicationRecord
    belongs_to :user

    enum :keymap, {
      default: 0,
      vim: 1
    }

    def self.keymaps_for_select
      keymaps.map { |key, _| [human_attribute_name(key), key] }
    end
  end
end
