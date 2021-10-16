# frozen_string_literal: true

ActiveRecord::Schema.define(version: 20_210_927_190_535) do
  create_table 'histories', force: :cascade do |t|
    t.string 'label'
    t.text 'abstract'
    t.float 'latitude'
    t.float 'longitude'
    t.date 'accrual_date'
    t.datetime 'created_at', precision: 6, null: false
    t.datetime 'updated_at', precision: 6, null: false
  end
end
