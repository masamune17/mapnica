# coding: utf-8

class MapsController < ApplicationController
  def index
    all_history_abstract = History.all.pluck(:abstract)
    @all_history_abstract = all_history_abstract.map{|a| a.gsub(/[\s　]/, '')}.to_json
    # all_history_position = History.all.pluck(:latitude, :longitude, :label, :id).to_s
    # @all_history_position = all_history_position.gsub(/[　]/, '').to_json
    @all_history_position = History.all.pluck(:latitude, :longitude, :accrual_date, :label).to_json
    logger.debug("コントローラーでデバッグだよ")
    logger.debug(@all_history_abstract)
    logger.debug(@all_history_position.class)
  end
end
