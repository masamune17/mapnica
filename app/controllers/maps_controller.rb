# frozen_string_literal: true

class MapsController < ApplicationController
  def index
    # json変換の関係で半角スペースを全角スペースに置換
  #   histories_data = History.all.map do |history|
  #     { latitude: history.latitude, longitude: history.longitude, accrual_date: history.accrual_date, label: history.label.gsub(/\s/, '　'),
  #       abstract: history.abstract.gsub(/\s/, '　') }
  #   end
  #   @all_history_position = histories_data.to_json
  #   @history = History.first
  #   logger.debug("コントローラーでデバッグだよ")
  #   logger.debug(@history.id)
  end
end

# History.all.each do |history|
#   history.accrual_date
# end
