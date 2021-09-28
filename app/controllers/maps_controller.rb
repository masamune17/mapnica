class MapsController < ApplicationController
  def index
    @all_history_position = History.all.pluck(:latitude, :longitude).to_json
  end
end
