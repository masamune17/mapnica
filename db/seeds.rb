# frozen_string_literal: true

require 'active_record/fixtures'
require 'csv'

csv_file = Dir.glob('db/seeds/*.csv')[0]

if File.exist?(csv_file.to_s)
  CSV.foreach(csv_file.to_s, headers: true) do |row|
    History.create(
      label: row['label'],
      abstract: row['abstract'],
      latitude: row['latitude'],
      longitude: row['longitude'],
      accrual_date: row['accrual_date']
    )
  end
else
  ActiveRecord::FixtureSet.create_fixtures 'test/fixtures', 'histories'
end
