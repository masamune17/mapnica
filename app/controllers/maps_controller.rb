# frozen_string_literal: true

class MapsController < ApplicationController
  def index
    # json変換の関係で半角スペースを全角スペースに置換
    histories_position = History.all.map do |history|
      { latitude: history.latitude, longitude: history.longitude, accrual_date: history.accrual_date, label: history.label.gsub(/\s/, '　'),
        abstract: history.abstract.gsub(/\s/, '　') }
    end
    @all_history_position = histories_position.to_json
  end
end
