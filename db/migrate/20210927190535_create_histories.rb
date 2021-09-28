class CreateHistories < ActiveRecord::Migration[6.1]
  def change
    create_table :histories do |t|
      t.string :label
      t.text :abstract
      t.float :latitude
      t.float :longitude
      t.date :accrual_date

      t.timestamps
    end
  end
end
