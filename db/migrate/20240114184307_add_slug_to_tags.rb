# frozen_string_literal: true

class AddSlugToTags < ActiveRecord::Migration[7.1]
  def change
    change_table :tags, bulk: true do |t|
      t.string :slug
      t.index :slug, unique: true
    end
  end
end
