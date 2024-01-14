# frozen_string_literal: true

module Users
  class Setting < ApplicationRecord
    belongs_to :user

    enum :keybind, {
      default: 0,
      vscode: 1,
      vim: 2,
      emacs: 3
    }

    def self.keybinds_for_select
      keybinds.map { |key, _| [human_attribute_name(key), key] }
    end
  end
end
