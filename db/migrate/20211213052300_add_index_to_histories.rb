class AddIndexToHistories < ActiveRecord::Migration[6.1]
  def change
    add_index :histories, :label
    add_index :histories, :accrual_date
  end
end
