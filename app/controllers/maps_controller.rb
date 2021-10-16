# coding: utf-8

class MapsController < ApplicationController
  def index  
    histories_data = History.all.map { |history| {'label':history.label.gsub(/\s/, "　"), 'abstract':history.abstract.gsub(/\s/, "　")} }    
    histories_position = History.all.map { |history| {'latitude':history.latitude, 'longitude':history.longitude, 'accrual_date':history.accrual_date} }
    @all_history_data = histories_data.to_json
    @all_history_position = histories_position.to_json
  end
end
