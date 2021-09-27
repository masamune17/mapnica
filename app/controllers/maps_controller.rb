class MapsController < ApplicationController
  def index
    @all_history_position = History.all.pluck(:latitude, :longitude).to_json
    logger.debug("コントローラーでデバッグだよ")
    logger.debug(@all_history_position)
  end
end
