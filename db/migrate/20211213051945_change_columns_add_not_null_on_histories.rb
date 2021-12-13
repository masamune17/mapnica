class ChangeColumnsAddNotNullOnHistories < ActiveRecord::Migration[6.1]
  def change
    change_column_null :histories, :label, false
    change_column_null :histories, :abstract, false
    change_column_null :histories, :latitude, false
    change_column_null :histories, :longitude, false
    change_column_null :histories, :accrual_date, false
  end
end
