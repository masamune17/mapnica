# frozen_string_literal: true

class Api::Maps::SearcheWordController < Api::BaseController
  def index
    @search_rusults = History.where('label LIKE?', "%#{params[:keyword]}%").or(History.where('abstract LIKE?', "%#{params[:keyword]}%"))
    respond_to do |format|
      format.html { redirect_to :root }
      format.json { render json: @search_rusults }
    end
  end
end
