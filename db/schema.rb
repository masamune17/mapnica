# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_12_13_052300) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "histories", force: :cascade do |t|
    t.string "label", null: false
    t.text "abstract", null: false
    t.float "latitude", null: false
    t.float "longitude", null: false
    t.date "accrual_date", null: false
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["accrual_date"], name: "index_histories_on_accrual_date"
    t.index ["label"], name: "index_histories_on_label"
  end

end
