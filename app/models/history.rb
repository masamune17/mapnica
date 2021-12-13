# frozen_string_literal: true

class History < ApplicationRecord
  validates :label, presence: true
  validates :abstract, presence: true
  validates :latitude, presence: true, numericality: true
  validates :longitude, presence: true, numericality: true
  validates :accrual_date, presence: true
end
