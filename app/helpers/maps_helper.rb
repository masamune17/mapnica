# frozen_string_literal: true

module MapsHelper
  def map_page?
    params[:action] == 'index' && params[:controller] == 'maps'
  end
end
