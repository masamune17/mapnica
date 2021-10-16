# coding: utf-8

class MapsController < ApplicationController
  def index
    histories_position = History.all.map { |history| {latitude:history.latitude, longitude:history.longitude, accrual_date:history.accrual_date, label:history.label.gsub(/\s/, "　"), abstract:history.abstract.gsub(/\s/, "　")} }
    @all_history_position = histories_position.to_json
  end
end
