# frozen_string_literal: true

class CreatePosts < ActiveRecord::Migration[7.1]
  def change
    create_table :posts do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :body, null: false
      t.boolean :published, null: false, default: false
      t.datetime :published_at

      t.timestamps
    end
  end
end
