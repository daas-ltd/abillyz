# frozen_string_literal: true

class CreateUsersSettings < ActiveRecord::Migration[7.1]
  def change
    create_table :users_settings do |t|
      t.belongs_to :user
      t.integer :keybind, null: false, default: 0
      t.boolean :line_wrapping, null: false, default: true

      t.timestamps
    end
  end
end
