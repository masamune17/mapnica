# coding: utf-8

class MapsController < ApplicationController
  def index
    # all_history_label = History.all.pluck(:label)
    # @all_history_label = all_history_label.map{|a| a.gsub(/\s/, "　")}.to_json

    all_history_data = History.all.pluck(:label, :abstract)
    @all_history_data = all_history_data.map{|a| a.map{|a| a.gsub(/\s/, "　")}}.to_json

    @all_history_position = History.all.pluck(:latitude, :longitude, :accrual_date).to_json
    logger.debug("コントローラーでデバッグだよ")
    logger.debug(@all_history_data)
    logger.debug(@all_history_position.class)
  end
end
