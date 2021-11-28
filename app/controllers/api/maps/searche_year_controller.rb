# frozen_string_literal: true

class API::Maps::SearcheYearController < API::BaseController
  def index
    searche_year = params[:year].to_i
    @all_history_position = History.where(accrual_date: "#{searche_year}-01-01"..."#{searche_year + 100}-12-31")
    respond_to do |format|
      format.json { render json: @all_history_position }
    end
  end
end
