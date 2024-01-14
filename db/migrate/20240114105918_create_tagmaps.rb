# frozen_string_literal: true

class CreateTagmaps < ActiveRecord::Migration[7.1]
  def change
    create_table :tagmaps do |t|
      t.belongs_to :post, null: false, foreign_key: true
      t.belongs_to :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
