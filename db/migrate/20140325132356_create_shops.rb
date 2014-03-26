class CreateShops < ActiveRecord::Migration
  def change
    create_table :shops do |t|
      t.decimal :latitude
      t.decimal :longitude
      t.string :name
      t.integer :yesterday
      t.integer :tomorrow
      t.integer :issue
      t.integer :addition
      t.decimal :price

      t.timestamps
    end
  end
end
