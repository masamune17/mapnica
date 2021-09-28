# frozen_string_literal: true

require 'active_record/fixtures'
ActiveRecord::FixtureSet.create_fixtures("#{Rails.root}/test/fixtures", "histories")
